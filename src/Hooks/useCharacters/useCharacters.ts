import { useInfiniteQuery } from "react-query";

import * as T from "../../api/universe/types";
import { getCharacters } from "../../api/universe/universe";

const useCharacters = () => {
  return useInfiniteQuery<T.Character, Error>(
    "characters",
    ({ pageParam = 1 }) => getCharacters(pageParam),
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
