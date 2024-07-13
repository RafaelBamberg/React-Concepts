// RickAndMortyCharactersContainer.tsx
import React from "react";

import CharactersCard from "./components/CharactersCard";
import useRickAndMortyCharacters from "./Hooks/useCharacters/useCharacters";

const App: React.FC = () => {
  const {
    data: characters,
    isLoading,
    isError,
    error,
  } = useRickAndMortyCharacters();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return <CharactersCard characters={characters ?? []} />;
};

export default App;
