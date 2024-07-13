// rickAndMortyService.ts
import axios from "axios";
import * as T from "./types";

const API_URL = "https://rickandmortyapi.com/api/character";

const delay = (miliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, miliSeconds));

export const getCharacters = async (): Promise<T.Character[]> => {
  await delay(2000);
  const response = await axios.get<{ results: T.Character[] }>(API_URL);
  return response.data.results;
};
