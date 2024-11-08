import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";


export const moviesDBFetcher = new AxiosAdapter({
  baseUrl:'https://api.themoviedb.org/3/movie',
  params:{
    // api_key:'6b0229ae2297dadbea8371f35450cf7a',
    api_key:THE_MOVIE_DB_KEY ?? 'no-key',
    language:'es'
  }
})