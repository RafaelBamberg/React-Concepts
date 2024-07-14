import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { ResultsEntity } from "./api/universe/types";
import { LoadingContainer, Wrapper } from "./App.styles";
import CharactersCard from "./components/CharactersCard/CharactersCard";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";
import useCharacters from "./Hooks/useCharacters/useCharacters";

const App = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters();

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
      <SearchAppBar />
      <CharactersCard characters={characters} />
      {isFetchingNextPage && <CircularProgress />}
    </Wrapper>
  );
};

export default App;
