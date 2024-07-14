// RickAndMortyCharactersContainer.tsx
import React from "react";

import { CircularProgress } from "@mui/material";
import { LoadingContainer, Wrapper } from "./App.styles";
import CharactersCard from "./components/CharactersCard/CharactersCard";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import useCharacters from "./Hooks/useCharacters/useCharacters";

const App: React.FC = () => {
  const { data: characters, isLoading, isError, error } = useCharacters();

  console.log(characters);

  if (isLoading)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <Wrapper>
      <SearchAppBar />
      {characters ? (
        <CharactersCard characters={characters.results} />
      ) : (
        <CircularProgress />
      )}
    </Wrapper>
  );
};

export default App;
