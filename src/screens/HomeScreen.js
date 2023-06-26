// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  Text,
  View, 
  ScrollView, 
  FlatList, 
  TouchableOpacity , 
  TouchableHighlight,
  Image, 
  StatusBar,
} from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import getPoster, { getTopRatedMovies } from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import { SliderBox } from "react-native-image-slider-box";
// import { AdMobBanner } from "expo-ads-admob"
import MovieCards from "../components/MovieCards";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getPopularMovies,
} from "../services/MovieService";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];


// ca-app-pub-5816363295343144/9699184368 --unitid --bannerads
//    --unitid --intersialist


const HomeScreen = ({ navigation }) => {
  const [slideimg, setslideimg] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [toprated, settoprated] = useState({});
  // const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);
  const [popularMovies, setpopularMovies] = useState({});
  const [viewall,setviewall] = useState({
    nowplaying:true,
    popular:false,
    toprated:false,
    upcomming:false
  });
  const [image, setimage] = useState([]);
  const [bannerad, setbannerad] = useState("ca-app-pub-5816363295343144/9699184368");

  
  // for(var x in genres){
  //   for(var y in nowPlayingMovies.results){
  //     if (x.id === y.genre_ids){
  //       return console.warn("hello")
  //     }
  //   }
  // }
  

  useEffect(() => {
    const fetchdata = async () =>{
    await getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    );
    await getNowPlayingMovies(2).then((data)=>
      setslideimg(data.data.results.slice(1,11))
    );
    await getPopularMovies(2).then((movieResponse) =>
      setpopularMovies(movieResponse.data)
    );
    await getTopRatedMovies().then((res)=>
      settoprated(res.data)
    );
    await getUpcomingMovies(3).then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    // await getAllGenres().then((genreResponse) =>
    //   setGenres([...genres, ...genreResponse.data.genres])
    // );
    
    // setimage((slideimg.map(({poster_path})=>"https://image.tmdb.org/t/p/original"+poster_path)));
    };

    fetchdata().catch((err)=>console.error(err))
  },[]);

  setTimeout(() => {
    setimage((slideimg.map(({poster_path,id})=>"https://image.tmdb.org/t/p/original"+poster_path)));
  }, 1000);


  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="light"
        translucent={false}
        backgroundColor={COLORS.STATUS}
      />
      
      {/* <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View> */}

      {/* ads */}
      {/* <AdMobBanner 
      bannerSize="banner"
      adUnitID={bannerad}
      servePersonalizedAds={false}
      /> */}

      <View style={styles.SlideBox}>
          {image ? <SliderBox
          images={image}
          sliderBoxHeight={300}
          dotColor="red"
          ImageComponentStyle={styles.SlideBoximg}
          inactiveDotColor="#888"  
          onCurrentImagePressed={image => console.warn(`image ${image.id} pressed`)}
          paginationBoxVerticalPadding={20}
         />:null}
      </View>

      {/* ads */}
      {/* <AdMobBanner 
      bannerSize="banner"
      adUnitID={bannerad}
      servePersonalizedAds={false}
      /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <TouchableHighlight activeOpacity={0.5} onPress={()=> setviewall({nowplaying:!viewall.nowplaying})} >
        {viewall.nowplaying ? <Text style={styles.headerSubTitle}>VIEW LESS</Text> 
        : <Text style={styles.headerSubTitle}>VIEW ALL</Text> }
        </TouchableHighlight>
      </View>
      <View>
        {viewall.nowplaying ? 
        <FlatList
          data={nowPlayingMovies.results}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          key={(item)=>item.id}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCards
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              size={0.7}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            /> 
          )}
        /> : (
          <FlatList
            data={nowPlayingMovies.results}
            horizontal
            // numColumns={2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                heartLess={true}
                size={0.6}
                onPress={() => navigation.navigate("movie", { movieId: item.id })}
              />
            )}
          />
        )}
      </View>

      {/* ads */}
      {/* <AdMobBanner 
      bannerSize="banner"
      adUnitID={bannerad}
      servePersonalizedAds={false}
      /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Popular</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setviewall({popular:!viewall.popular})}>
        {viewall.popular ? <Text style={styles.headerSubTitle}>VIEW LESS</Text> 
        : <Text style={styles.headerSubTitle}>VIEW ALL</Text> }
        </TouchableOpacity>
      </View>
      <View>
        {viewall.popular ?
        <FlatList
          data={popularMovies.results}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          key={(item)=>item.id}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCards
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.7}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        /> :
        <FlatList
          data={popularMovies.results}
          horizontal={true}
          // numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              heartLess={true}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />}
      </View>

      {/* ads */}
      {/* <AdMobBanner 
      bannerSize="banner"
      adUnitID={bannerad}
      servePersonalizedAds={false}
      /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Rated</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setviewall({toprated:!viewall.toprated})}>
        <Text style={styles.headerSubTitle}>{viewall.toprated ? 'VIEW LESS' : 'VIEW ALL' }</Text>
        </TouchableOpacity>
      </View>
      <View>
        {viewall.toprated ? 
        <FlatList
          data={toprated.results}
          horizontal={false}
          numColumns={2}
          key={(item)=>item.id}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCards
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              size={0.7}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        /> :
        <FlatList
          data={toprated.results}
          horizontal={true}
          // numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              heartLess={true}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />}
      </View>

      {/* ads */}
      {/* <AdMobBanner 
      bannerSize="banner"
      adUnitID={bannerad}
      servePersonalizedAds={false}
      /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setviewall({upcomming:!viewall.upcomming})}>
          <Text style={styles.headerSubTitle}>{ viewall.upcomming ? 'VIEW LESS' : 'VIEW ALL' }</Text>
        </TouchableOpacity>
      </View>
      <View>
        {viewall.upcomming ? 
        <FlatList
          data={upcomingMovies.results}
          horizontal={false}
          numColumns={2}
          key={(item)=>item.id}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCards
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.7}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        /> :
        <FlatList
          data={upcomingMovies.results}
          horizontal={true}
          // numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              heartLess={true}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />}
      </View>
      <View style={{padding:20,}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop:30,
    paddingBottom:30,
  },
  headerTitle: {
    color:Colors.WHITE,
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
  SlideBoximg:{
    borderRadius:20,
    width:'90%',
    marginTop:30,
  },
  HeaderView:{
    backgroundColor:"#111",
    height:65,
    borderBottomWidth:0.3,
    borderBottomColor:Colors.WHITE,
    elevation:5,
    top:0,
    zIndex:1000,
  }
});

export default HomeScreen;
