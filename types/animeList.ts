export interface Title {
  __typename: string;
  romaji: string;
  english: string;
  native: string;
}

interface CoverImage {
  __typename: string;
  large: string;
}

export interface Anime {
  __typename: string;
  id: number;
  idMal: number;
  title: Title;
  coverImage: CoverImage;
  type: string;
  popularity: number;
  averageScore: number;
}
export interface PageInfo {
  total?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
  perPage?: number;
  __typename?: string;
}

export interface AnimePage {
  getData?: (params: AnimeParams) => void;
  Page?: {
    pageInfo?: PageInfo;
    media?: Anime[];
  };
  loading?: boolean;
}

export interface AnimeParams {
  perPage?: number;
  page?: number;
  search?: string | null;
  sort?: "POPULARITY_DESC" | "POPULARITY_ASC";
}

export interface StudioEdge {
  id: number;
  __typename: string;
}

export interface AnimeDetails {
  __typename?: string;
  id?: number;
  title?: Title;
  description?: string;
  episodes?: number;
  duration?: number;
  genres?: string[];
  averageScore?: number;
  popularity?: number;
  trending?: number;
  coverImage?: CoverImage;
  studios?: {
    edges?: StudioEdge[];
  };
  bannerImage?: string;
  seasonYear?: number;
}
