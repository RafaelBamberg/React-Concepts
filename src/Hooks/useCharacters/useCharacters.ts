// useRickAndMortyCharacters.ts

import { useQuery } from "react-query";
import * as T from "../../api/universe/types";
import { getCharacters } from "../../api/universe/universe";

const useRickAndMortyCharacters = () => {
  return useQuery<T.Character[], Error>("characters", getCharacters);
};

export default useRickAndMortyCharacters;
