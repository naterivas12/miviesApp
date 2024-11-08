import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-dbresponses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options{
  page?:number;
  limit?:number
}

export const popularUseCase = async (fetcher:HttpAdapter,options?:Options):Promise<Movie[]>=>{
  try {
    const popular = await fetcher.get<MovieDBMoviesResponse>('/popular',{
      patams:{
        page:options?.page ?? 1
      }
    });
    return popular.results.map(MovieMapper.fromMovieDBResultToEntity)
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies popularUseCase')
  }
}



