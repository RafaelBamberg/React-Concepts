import axios from "axios";
import * as T from "./types";

export const getCharacters = async (
  page: number,
  characterName: string = ""
): Promise<T.Character> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await axios.get<T.Character>(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${characterName}`
  );
  return response.data;
};
