import axios from "axios";
import { mockResponse } from "./mocks"; // Adjust the path if necessary
import { getCharacters } from "./universe"; // Adjust the path if necessary

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getCharacters", () => {
  const setupMock = (
    page: number,
    characterName: string,
    response: any,
    status: number = 200
  ) => {
    mockedAxios.get.mockResolvedValueOnce({
      status,
      data: response,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return character data for a specific page and name", async () => {
    const page = 1;
    const characterName = "Rick";

    setupMock(page, characterName, mockResponse);

    const result = await getCharacters(page, characterName);
    expect(result).toEqual(mockResponse);
  });

  it("should return character data for a specific page without name", async () => {
    const page = 1;

    setupMock(page, "", mockResponse);

    const result = await getCharacters(page);
    expect(result).toEqual(mockResponse);
  });

  it("should handle errors gracefully", async () => {
    const page = 1;
    const characterName = "InvalidName";

    mockedAxios.get.mockRejectedValueOnce(new Error("Not Found"));

    await expect(getCharacters(page, characterName)).rejects.toThrow(
      "Not Found"
    );
  });
});
