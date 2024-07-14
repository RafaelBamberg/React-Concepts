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

  useEffect(() => {
    const handleLoadMore = () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    };
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      handleLoadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const characters =
    (data?.pages.flatMap((page) =>
      page.results?.filter((result) => result !== null)
    ) as ResultsEntity[]) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(query);
    refetch();
  };

  console.log(characters);

  if (isLoading && characters.length === 0)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );

  if (isError) return <div>Error: {error?.message}</div>;

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
