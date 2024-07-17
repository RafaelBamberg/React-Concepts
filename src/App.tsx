import { CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResultsEntity } from "./api/universe/types";
import {
  LoadingContainer,
  LoadingPaginationContainer,
  Wrapper,
} from "./App.styles";
import CharactersCard from "./components/CharactersCard/CharactersCard";
import useCharacters from "./Hooks/useCharacters/useCharacters";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useCharacters(searchTerm);

  const characters: ResultsEntity[] =
    data?.pages.flatMap((page) =>
      (page.results ?? []).filter((result) => result !== null)
    ) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchTerm(query);
    refetch();
  };

  const handleRefetch = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    refetch();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 2
      ) {
        fetchNextPage();
      }
    };
    setSearchTerm(query);
    refetch();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, query, refetch]);

  if (isLoading && characters.length === 0)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );

  if (isError)
    return (
      <div>
        <p>Error: {error?.message}</p>
        <button onClick={handleRefetch}>Retry</button>
      </div>
    );

  return (
    <Wrapper>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search Characters"
          value={query}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
        />
      </form>
      <CharactersCard characters={characters} />
      {isFetchingNextPage && (
        <LoadingPaginationContainer>
          <CircularProgress />
        </LoadingPaginationContainer>
      )}
    </Wrapper>
  );
};

export default App;
