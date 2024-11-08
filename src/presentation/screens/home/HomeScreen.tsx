import { Text, View } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PosterCarousel } from "../../components/movies/PosterCarousel"
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel"
import { FullScreenLoaders } from "../../components/loaders/FullScreenLoaders"

export const HomeScreen = () => {
  const{ top }= useSafeAreaInsets();
  const { isLoading,nowPlaying,popular,topRated,upcoming,popularNextPage } =  useMovies();

  if(isLoading){
    return(<FullScreenLoaders/>)
  }
  return (
    <ScrollView>
      <View style={{marginTop:top + 20,paddingBottom:30}}>
        {/* principal */}
        <PosterCarousel movies={nowPlaying}/>
        {/* popular */}
        <HorizontalCarousel 
          movies={ popular } 
          title="Populares"
          loadNextPage={popularNextPage}
        />
        {/* toPRated */}
        <HorizontalCarousel movies={ topRated } title="Mejor calificadas"/>
        {/* Proximamente */}
        <HorizontalCarousel movies={ upcoming } title="Proximamente"/>
      </View>
    </ScrollView>
  )
}
