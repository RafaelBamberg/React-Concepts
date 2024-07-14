import { useInfiniteQuery } from "react-query";
import * as T from "../../api/universe/types";
import { getCharacters } from "../../api/universe/universe";

const useCharacters = (query: string) => {
  return useInfiniteQuery<T.Character, Error>(
    ["characters", query],
    ({ pageParam = 1 }) => getCharacters(pageParam, query),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.info.next
          ? new URL(lastPage.info.next).searchParams.get("page")
          : null;
        return nextPage ? parseInt(nextPage) : undefined;
      },
    }
  );
};

export default useCharacters;
