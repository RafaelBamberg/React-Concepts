import axios from "axios";
import * as T from "./types";

const API_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (page: number): Promise<T.Character> => {
  const response = await axios.get<T.Character>(`${API_URL}/?page=${page}`);
  return response.data;
};
