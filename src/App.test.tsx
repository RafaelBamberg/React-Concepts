/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import useCharacters from "./Hooks/useCharacters/useCharacters";

jest.mock("./Hooks/useCharacters/useCharacters");

const queryClient = new QueryClient();

const mockedUseCharacters = useCharacters as jest.Mock;

const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search input and button correctly", () => {
    mockedUseCharacters.mockReturnValue({
      data: { pages: [] },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: jest.fn(),
    });

    const { getByLabelText } = renderApp();
    const input = getByLabelText(/Search Characters/i);
    expect(input).toBeInTheDocument();
  });

  it("displays loading spinner when loading", () => {
    mockedUseCharacters.mockReturnValue({
      data: { pages: [] },
      isLoading: true,
      isError: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: jest.fn(),
    });

    const { getByRole } = renderApp();
    const progressBar = getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("displays error message and retry button on error", async () => {
    const refetchMock = jest.fn();
    mockedUseCharacters.mockReturnValue({
      data: { pages: [] },
      isLoading: false,
      isError: true,
      error: { message: "Error fetching characters" },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: refetchMock,
    });

    const { getByText } = renderApp();
    const errorMessage = getByText(/Error: Error fetching characters/i);
    const retryButton = getByText(/Retry/i);

    expect(errorMessage).toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();

    act(() => fireEvent.click(retryButton));

    expect(refetchMock).toHaveBeenCalled();
  });

  it("fetches next page on scroll", async () => {
    const fetchNextPageMock = jest.fn();
    mockedUseCharacters.mockReturnValue({
      data: { pages: [{ results: [{ id: 1, name: "Character 1" }] }] },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetchingNextPage: false,
      refetch: jest.fn(),
    });

    renderApp();

    await act(async () => {
      fireEvent.scroll(window, { target: { scrollY: 1000 } });
      await waitFor(() => expect(fetchNextPageMock).toHaveBeenCalled());
    });
  });
});
