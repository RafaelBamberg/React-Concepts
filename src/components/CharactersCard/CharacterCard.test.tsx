import { render } from "@testing-library/react";
import { ResultsEntity } from "../../api/universe/types";
import CharactersCard from "./CharactersCard";
import { mockCharacters } from "./mocks";

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
