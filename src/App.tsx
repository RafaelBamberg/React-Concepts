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

  const handleSearchChange = (
    searchEvent: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setQuery(searchEvent.target.value);
  };

  const handleSearchSubmit = (
    formEvent: React.FormEvent<HTMLFormElement>
  ): void => {
    formEvent.preventDefault();
    setSearchTerm(query);
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
        <button onClick={() => refetch()}>Retry</button>
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
