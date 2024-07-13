// RickAndMortyCharactersContainer.tsx
import React from "react";

import CharactersCard from "./components/CharactersCard";
import useCharacters from "./Hooks/useCharacters/useCharacters";

const App: React.FC = () => {
  const { data: characters, isLoading, isError, error } = useCharacters();

  console.log(characters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      {characters && <CharactersCard characters={characters.results} />}
    </div>
  );
};

export default App;
