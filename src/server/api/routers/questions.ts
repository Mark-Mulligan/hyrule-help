/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const RouterQueryKey = z
  .union([z.undefined(), z.string(), z.array(z.string())])
  .optional();

export const questionsRouter = createTRPCRouter({
  getAllFilterCount: publicProcedure
    .input(
      z.object({
        categories: RouterQueryKey,
        game: RouterQueryKey,
        q: RouterQueryKey,
      })
    )
    .query(async ({ input, ctx }) => {
      console.log({ input });

      const WhereStatement: any = {};

      if (input.q) {
        WhereStatement.OR = [
          {
            content: {
              contains: input.q,
            },
          },
          {
            title: {
              contains: input.q,
            },
          },
        ];
      }

      if (input.q || (input.categories && input.game)) {
        WhereStatement.AND = [];
      }

      if (input.categories) {
        const categories =
          typeof input.categories === "string"
            ? [input.categories]
            : input.categories;
        const categoriesSelect = categories.map((category) => {
          return {
            categories: {
              equals: category,
            },
          };
        });

        if (WhereStatement.AND) {
          WhereStatement.AND.push({ OR: categoriesSelect });
        } else {
          WhereStatement.OR = categoriesSelect;
        }
      }

      if (input.game) {
        const games =
          typeof input.game === "string" ? [input.game] : input.game;
        const gameSelect = games.map((game) => {
          return {
            game: {
              equals: game,
            },
          };
        });

        if (WhereStatement.AND) {
          WhereStatement.AND.push({ OR: gameSelect });
        } else {
          WhereStatement.OR = gameSelect;
        }
      }

      console.log("where statement", WhereStatement);

      const result = await ctx.prisma.question.count({
        where: WhereStatement,
      });

      /**
       * Example complex query call that is valid
       */
      // const result = await ctx.prisma.question.findMany({
      //   where: {
      //     OR: [
      //       {
      //         content: {
      //           contains: "a",
      //         },
      //       },
      //       { title: { contains: "a" } },
      //     ],
      //     AND: [
      //       {
      //         OR: [
      //           {
      //             categories: {
      //               equals: "gameplay-mechanics",
      //             },
      //           },
      //           {
      //             categories: {
      //               equals: "weapons",
      //             },
      //           },
      //         ],
      //       },
      //       {
      //         OR: [
      //           {
      //             game: {
      //               equals: "totk",
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // });

      return result;
    }),

  infiniteGetAllFilter: publicProcedure
    .input(
      z.object({
        categories: RouterQueryKey,
        game: RouterQueryKey,
        q: RouterQueryKey,
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log({ input });

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const WhereStatement: any = {};

      if (input.q) {
        WhereStatement.OR = [
          {
            content: {
              contains: input.q,
            },
          },
          {
            title: {
              contains: input.q,
            },
          },
        ];
      }

      if (input.q || (input.categories && input.game)) {
        WhereStatement.AND = [];
      }

      if (input.categories) {
        const categories =
          typeof input.categories === "string"
            ? [input.categories]
            : input.categories;
        const categoriesSelect = categories.map((category) => {
          return {
            categories: {
              equals: category,
            },
          };
        });

        if (WhereStatement.AND) {
          WhereStatement.AND.push({ OR: categoriesSelect });
        } else {
          WhereStatement.OR = categoriesSelect;
        }
      }

      if (input.game) {
        const games =
          typeof input.game === "string" ? [input.game] : input.game;
        const gameSelect = games.map((game) => {
          return {
            game: {
              equals: game,
            },
          };
        });

        if (WhereStatement.AND) {
          WhereStatement.AND.push({ OR: gameSelect });
        } else {
          WhereStatement.OR = gameSelect;
        }
      }

      console.log("where statement", WhereStatement);

      const result = await ctx.prisma.question.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
        where: WhereStatement,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (result.length > limit) {
        const nextItem = result.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        result,
        nextCursor,
      };

      /**
       * Example complex query call that is valid
       */
      // const result = await ctx.prisma.question.findMany({
      //   where: {
      //     OR: [
      //       {
      //         content: {
      //           contains: "a",
      //         },
      //       },
      //       { title: { contains: "a" } },
      //     ],
      //     AND: [
      //       {
      //         OR: [
      //           {
      //             categories: {
      //               equals: "gameplay-mechanics",
      //             },
      //           },
      //           {
      //             categories: {
      //               equals: "weapons",
      //             },
      //           },
      //         ],
      //       },
      //       {
      //         OR: [
      //           {
      //             game: {
      //               equals: "totk",
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // });
    }),

  getQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });
      return result;
    }),
  addQuestion: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categories: z.string(),
        game: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, categories, game } = input;
      const userId = ctx.session.user.id;
      const result = await ctx.prisma.question.create({
        data: { title, content, categories, game, userId },
      });

      return result;
    }),
});
