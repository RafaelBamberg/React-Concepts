import axios from "axios";
import * as T from "./types";

const API_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (
  page: number,
  query: string = ""
): Promise<T.Character> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await axios.get<T.Character>(
    `${API_URL}/?page=${page}&name=${query}`
  );
  return response.data;
};
