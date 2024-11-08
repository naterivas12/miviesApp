import { useEffect, useState } from "react"
import * as UseCase from "../../core/use-cases"
import { moviesDBFetcher } from "../../config/adapters/movieDB.adapter"
import { FullMovie } from "../../core/entities/movie.entity"
import { Cast } from "../../core/entities/cast.entity"

export const useMovie = (movieId:number) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(()=>{
    loadMovie()
  },[movieId])
  
  const loadMovie = async()=>{
    setIsLoading(true);
    const fullMoviePromise = UseCase.getMovieByIdUseCase(moviesDBFetcher,movieId);
    const castPromise = UseCase.getMovieCastUseCase(moviesDBFetcher,movieId);

    const [fullMovie,cast] = await Promise.all([fullMoviePromise,castPromise]);
    setMovie(fullMovie);
    setCast(cast);
    setIsLoading(false);
    
  }
  
  return {
    isLoading,
    movie,
    cast
  }
}
