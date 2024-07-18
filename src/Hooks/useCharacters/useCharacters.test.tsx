import { act, renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import * as universeApi from "../../api/universe/universe";
import { mockedPage1, mockedPage2 } from "./mocks";
import useCharacters from "./useCharacters";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

jest.mock("../../api/universe/universe", () => ({
  getCharacters: jest.fn(),
}));

describe("useCharacters", () => {
  const getCharactersMock = universeApi.getCharacters as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch characters and return data", async () => {
    getCharactersMock.mockResolvedValueOnce(mockedPage1);

    const { result, waitFor } = renderHook(() => useCharacters("John Doe"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.pages[0]).toEqual(mockedPage1);
    expect(getCharactersMock).toHaveBeenCalledWith(1, "John Doe");
  });

  it("should fetch next page of characters when getNextPageParam is called", async () => {
    getCharactersMock
      .mockResolvedValueOnce(mockedPage1)
      .mockResolvedValueOnce(mockedPage2);

    const { result, waitForNextUpdate } = renderHook(
      () => useCharacters("John Doe"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitForNextUpdate();

    expect(result.current.data?.pages[0]).toEqual(mockedPage1);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitForNextUpdate();

    expect(result.current.data?.pages[1]).toEqual(mockedPage2);
    expect(getCharactersMock).toHaveBeenCalledTimes(2);
  });
});
