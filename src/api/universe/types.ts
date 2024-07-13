export type Info = {
  count: number;
  pages: number;
  next: string;
  prev?: null;
};
export type ResultsEntity = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginOrLocation;
  location: OriginOrLocation;
  image: string;
  episode?: string[] | null;
  url: string;
  created: string;
};
export type OriginOrLocation = {
  name: string;
  url: string;
};

export type Character = {
  info: Info;
  results: ResultsEntity[] | null;
};
