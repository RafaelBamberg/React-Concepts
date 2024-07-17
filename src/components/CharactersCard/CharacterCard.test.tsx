import { render } from "@testing-library/react";
import { ResultsEntity } from "../../api/universe/types";
import CharactersCard from "./CharactersCard";

const mockCharacters: ResultsEntity[] = [
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

const setup = (characters: ResultsEntity[] | null) => {
  const view = render(<CharactersCard characters={characters} />);
  return {
    ...view,
  };
};

describe("CharactersCard", () => {
  test("renders character cards when characters are provided", () => {
    const { getByText, getAllByRole } = setup(mockCharacters);

    expect(getByText("Character One")).toBeInTheDocument();
    expect(getByText("Character Two")).toBeInTheDocument();
    expect(getByText("Human")).toBeInTheDocument();
    expect(getByText("Alien")).toBeInTheDocument();
    expect(getAllByRole("img")).toHaveLength(2);
  });

  test("renders nothing when no characters are provided", () => {
    const { queryByText, queryAllByRole } = setup(null);

    expect(queryByText("Character One")).not.toBeInTheDocument();
    expect(queryByText("Character Two")).not.toBeInTheDocument();
    expect(queryAllByRole("img")).toHaveLength(0);
  });
});
