// react
import { useState, useEffect, type FormEvent, useMemo } from "react";

// next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Next-Auth
import { useSession, signIn } from "next-auth/react";

// Moment JS
import moment from "moment";

// TRPC
import { api } from "~/utils/api";

// Components
import MultiSelect from "~/components/MultiSelect";
import QuestionModal from "~/components/QuestionModal";
import LoadingModal from "~/components/LoadingModal";

// Types
import type { SelectOption } from "~/types/customTypes";

// Utils
import { categoryOptions, gameOptions } from "~/utils/selects";

type QueryValue = undefined | string | string[];

const setMultiSelectInitialValue = (
  queryValue: undefined | string | string[],
  selectOptions: SelectOption[]
) => {
  if (queryValue === undefined) {
    return [];
  }
  if (typeof queryValue === "string") {
    return selectOptions.filter((option) => option.value === queryValue);
  }

  return selectOptions.filter((option) => queryValue.includes(option.value));
};

const Questions = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<SelectOption[]>([]);
  const [gameFilter, setGameFilter] = useState<SelectOption[]>([]);
  const [search, setSearch] = useState("");

  const currentQuery = router.query as {
    categories?: QueryValue;
    game: QueryValue;
    q: QueryValue;
  };

  const filterQuestionQueryCount = api.questions.getAllFilterCount.useQuery(
    currentQuery,
    {
      refetchOnWindowFocus: false,
      enabled: router.isReady,
    }
  );

  // const questionQuery = api.questions.getAll.useQuery(undefined, {
  //   refetchOnWindowFocus: false,
  // });

  const infiniteFilterQuestionQuery =
    api.questions.infiniteGetAllFilter.useInfiniteQuery(
      {
        limit: 5,
        ...currentQuery,
        cacheTime: 0,
        staleTime: 0,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        enabled: router.isReady,
        // initialCursor: 1, // <-- optional you can pass an initialCursor
      }
    );

  const nextPage = useMemo(() => {
    if (infiniteFilterQuestionQuery?.data?.pages) {
      const lastPage = infiniteFilterQuestionQuery.data.pages.length;
      const result =
        infiniteFilterQuestionQuery?.data?.pages[lastPage - 1]?.nextCursor;
      return result;
    }
  }, [infiniteFilterQuestionQuery]);

  const filterSubmit = (e: FormEvent) => {
    e.preventDefault();

    const categoryValues = categoriesFilter.map((category) => category.value);
    const gameValues = gameFilter.map((game) => game.value);
    const queryObj: {
      categories?: string | number | string[];
      game?: string | number | string[];
      q?: string;
    } = {};

    if (categoryValues.length > 0) queryObj.categories = categoryValues;
    if (gameValues.length > 0) queryObj.game = gameValues;
    if (search) queryObj.q = search;

    void router.push({ pathname: "/questions", query: queryObj }, undefined, {
      shallow: true,
    });
  };

  const handleClear = () => {
    setCategoriesFilter([]);
    setGameFilter([]);
    setSearch("");

    void router.push({ pathname: "/questions", query: {} }, undefined, {
      shallow: true,
    });
  };

  const onQuestionAdd = async () => {
    setShowAddQuestionModal(false);
    await filterQuestionQueryCount.refetch();
    await infiniteFilterQuestionQuery.refetch();
    // await questionQuery.refetch();
  };

  useEffect(() => {
    if (router) {
      const selectedCategories = setMultiSelectInitialValue(
        router.query.categories,
        categoryOptions
      );
      const selectedGames = setMultiSelectInitialValue(
        router.query.game,
        gameOptions
      );
      setCategoriesFilter(selectedCategories);
      setGameFilter(selectedGames);

      if (typeof router.query.q === "string") {
        setSearch(router.query.q);
      }
    }
  }, [router]);

  return (
    <main className="container mx-auto pb-16 pt-24">
      <h1 className="relative mx-auto mb-4 max-w-4xl text-center text-5xl font-bold">
        Questions
        <button
          className="btn-primary btn absolute right-0"
          onClick={() => {
            if (session?.user) {
              setShowAddQuestionModal(true);
            } else {
              void signIn();
            }
          }}
        >
          Ask Question
        </button>
      </h1>

      <QuestionModal
        isOpen={showAddQuestionModal}
        handleClose={() => setShowAddQuestionModal(false)}
        onQuestionAdd={() => onQuestionAdd()}
      />

      <div className="card mx-auto mb-8 max-w-4xl bg-base-300">
        <form className="card-body" onSubmit={(e) => void filterSubmit(e)}>
          <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search..."
              className="input-bordered input w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <MultiSelect
              options={categoryOptions}
              placeholder="Filter By Category"
              selectedOptions={categoriesFilter}
              setSelectedOptions={setCategoriesFilter}
              name="categoryFilters"
            />
            <MultiSelect
              options={gameOptions}
              placeholder="Filter By Game"
              selectedOptions={gameFilter}
              setSelectedOptions={setGameFilter}
              name="gameFilters"
            />
          </div>
          <div className="text-center">
            <button className="btn-primary btn mr-4" type="submit">
              Filter
            </button>
            <button className="btn-outline btn" onClick={handleClear}>
              Clear
            </button>
          </div>

          {filterQuestionQueryCount.data !== undefined && (
            <p className="text-center">
              {filterQuestionQueryCount.data} Results
            </p>
          )}
        </form>
      </div>

      <ul className="mx-auto max-w-4xl">
        {infiniteFilterQuestionQuery?.data?.pages &&
          infiniteFilterQuestionQuery.data.pages.map(({ result }) => {
            return result.map((question) => {
              return (
                <Link key={question.id} href={`/questions/${question.id}`}>
                  <li className="mb-4 flex cursor-pointer overflow-hidden rounded-2xl bg-base-100 shadow-xl">
                    <figure className="inline-block w-36">
                      <Image
                        src={
                          question.game === "botw" ? "/botw.jpeg" : "/totk.jpeg"
                        }
                        alt={
                          question.game === "botw"
                            ? "Breath of the wild cover photo"
                            : "Tears of the kingdom cover photo"
                        }
                        className="h-full w-36"
                        width={100}
                        height={100}
                      />
                    </figure>
                    <div className="flex-1 flex-wrap p-5">
                      <div className="flex w-full flex-row items-center justify-between">
                        <h2 className="card-title">{question.title}</h2>
                        <p className="flex-none font-light">
                          {moment(question.createdAt).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                      </div>

                      <p>{question.user.name}</p>
                      <p>{question.content}</p>
                      <ul>
                        {question.categories.split(",").map((category) => {
                          return (
                            <li
                              className="badge-outline badge mr-2"
                              key={category}
                            >
                              {category}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </Link>
              );
            });
          })}
      </ul>

      {nextPage && (
        <div className="text-center">
          <button
            onClick={() => void infiniteFilterQuestionQuery.fetchNextPage()}
            className="btn-primary btn"
          >
            Load More
          </button>
        </div>
      )}
      {infiniteFilterQuestionQuery.isLoading && (
        <LoadingModal loadingText="Loading Questions..." />
      )}
    </main>
  );
};

export default Questions;
