import { type NextRouter } from "next/router";

export const createQueryObject = (
  router: NextRouter,
  key: string,
  value: string | number | string[]
) => {
  if (router && router.query) {
    return { ...router.query, [key]: value };
  }

  return { key: value };
};

export const removeQueryKey = (router: NextRouter, targetKey: string) => {
  if (router && router.query) {
    const newQueryObj = { ...router.query };
    delete newQueryObj[targetKey];
    return newQueryObj;
  }

  return {};
};
