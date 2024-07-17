import * as T from "../../api/universe/types";

export const mockCharacters: T.ResultsEntity[] = [
  {
    id: 1,
    name: "Character One",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "https://via.placeholder.com/150",
    episode: ["https://rickandmortyapi.com/api/episode/1"],
    url: "",
    created: "2021-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Character Two",
    status: "Dead",
    species: "Alien",
    type: "",
    gender: "Male",
    origin: { name: "Mars", url: "" },
    location: { name: "Mars", url: "" },
    image: "https://via.placeholder.com/150",
    episode: ["https://rickandmortyapi.com/api/episode/2"],
    url: "",
    created: "2021-01-02T00:00:00.000Z",
  },
];
