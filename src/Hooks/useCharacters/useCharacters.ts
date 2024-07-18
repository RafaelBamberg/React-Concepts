import { useInfiniteQuery } from "react-query";
import * as T from "../../api/universe/types";
import { getCharacters } from "../../api/universe/universe";

const useCharacters = (characterName: string) => {
  return useInfiniteQuery<T.Character, Error>(
    ["characters", characterName],
    ({ pageParam = 1 }) => getCharacters(pageParam, characterName),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.info.next
          ? new URL(lastPage.info.next).searchParams.get("page")
          : null;
      },
    }
  );
};

export default useCharacters;

// comentario 1
// comentario 1
// comentario 1
// comentario 1
// comentario 1
