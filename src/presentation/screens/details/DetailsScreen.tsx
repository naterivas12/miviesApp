import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView, Text, View } from "react-native"
import { RootStackParams } from "../../navigation/navigation";
import { useMovie } from "../../hooks/useMovie";
import { MovieHeader } from "../../components/movie/MovieHeader";
import { MovieDetails } from "../../components/movie/MovieDetails";
import { FullScreenLoaders } from "../../components/loaders/FullScreenLoaders";

interface Props extends StackScreenProps<RootStackParams,'Details'>{};

export const DetailsScreen = ({route}:Props) => {
  
  const { movieId } = route.params
  // const { movieId} = useRoute().params;
  const {isLoading, movie,cast=[]} = useMovie(movieId);
  if(isLoading){
    return <FullScreenLoaders/>
  }
  return (
    <ScrollView>
      {/* header */}
      <MovieHeader 
        originalTitle={movie!.originalTitle}
        title={movie!.title}
        poster={movie!.poster}
      />
      {/* details */}
      <MovieDetails movie={movie!} cast={cast}/>

    </ScrollView>
  )
}
