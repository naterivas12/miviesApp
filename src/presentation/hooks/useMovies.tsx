import { useEffect, useState } from "react"
import type{ Movie } from "../../core/entities/movie.entity"
import * as UseCases from '../../core/use-cases'
import { moviesDBFetcher } from "../../config/adapters/movieDB.adapter"

let popularPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [upcoming, setUpcoming] = useState<Movie[]>([])
  
  useEffect(()=>{
  
    initialLoad()
  
  },[])
  
const initialLoad=async()=>{
  const nowPLayingPromise = UseCases.moviesNowPlayingUseCase(moviesDBFetcher)
  const popularPromise = UseCases.popularUseCase(moviesDBFetcher)
  const topRatedPromise = UseCases.MoviesTopRatedUseCase(moviesDBFetcher)
  const upcomingPromise = UseCases.upcomingUseCase(moviesDBFetcher)

  const [
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  ] = await Promise.all([
    nowPLayingPromise,
    popularPromise,
    topRatedPromise,
    upcomingPromise
  ]);

  setNowPlaying(nowPlayingMovies);
  setPopular(popularMovies);
  setTopRated(topRatedMovies);
  setUpcoming(upcomingMovies);

  setIsLoading(false);
}
  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    // methods
    popularNextPage:async()=>{
      popularPage++;
      const popularMovies = await UseCases.popularUseCase(moviesDBFetcher,{
        page:popularPage
      })
      setPopular(prev=>([...prev,...popularMovies]))
    }
  }
}
