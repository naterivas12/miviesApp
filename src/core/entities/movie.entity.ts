

export interface Movie{
  id: number;
  title: string;
  description:string;
  realeseDate: Date;
  rating: number;
  poster: string;
  backdrop:string;
}

export interface FullMovie extends Movie{
  genres:string[];
  duartion: number;
  budget: number;
  originalTitle:string;
  productionCompanies: string[];
}

