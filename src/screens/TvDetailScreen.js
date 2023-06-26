import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
} from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import {
  getTvById,
  getPoster,
  getVideo,
  getLanguage,
  getEipsode,
} from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "../constants/Urls";
import Model from "../components/Model";
import ReviewCard from "../components/ReviewCard"
import Colors from "../constants/Colors";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const TvDetail = ({route,navigation})=>{

    const { TvId } = route.params;
    const [data, setdata] = useState({});
    // const [episode, setepisode] = useState([])
    // const [season, setseason] = useState([])
    // const [episodeData, setepisodeData] = useState({})
    const [isCastSelected, setIsCastSelected] = useState(true);
    const [visible, setvisible] = useState(false)

    useEffect(()=>{
      const fetchdata = async ()=>{
        await getTvById(TvId,
            `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR},${AR.REVIEWS},${AR.GROUPS}`)
            .then((response) => setdata(response?.data)
          );
          // url = `https://api.themoviedb.org/3/tv/${TvId}/season/1/episode/1?api_key=886f45aceef91357640893d9a9bc8395`;
          // await fetch(url).then((res)=>res.json()).then((json)=>console.warn(json.data)).catch((err)=>console.log(err));

      };

      fetchdata()
      console.warn(data)
      
      // setseason(data?.seasons[0]?.season_number)
      // setepisode(data?.seasons[0]?.episode_count)
      
    },[]);



    return(
      <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: getPoster(data?.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={COLORS.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({ message: `${data?.name}\n\n${data?.homepage}` })
          }
        >
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton} //Linking.openURL(getVideo(movie.videos.results[0].key))
         onPress={() =>  {console.log("Mov SC -> clicked");
          setvisible(!visible)}
        }
      >
        <Ionicons name="play-circle-outline" size={70} color={COLORS.WHITE} />

        {/* {visible ? <Model
        key={movie.videos.results[0].key}
        vis={visible}
        /> 
        :(<Ionicons name="play-circle-outline" size={70} color={COLORS.WHITE} />)} */}


      </TouchableOpacity>

      {visible ? (data?.videos?.results[0].key) ? (<Model
        vis = {visible}
        keys = {data?.videos?.results[0].key}
        movieName = {data?.original_name}
        />) : (null)
        :(null)}

      <ItemSeparator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {data?.original_name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="star" size={22} color={COLORS.YELLOW} />
          <Text style={styles.ratingText}>{data?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {data?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
        {Number(data?.episode_run_time)} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(data?.original_language)?.english_name}
      </Text>
      {/* watch provider */}
      <Text style={styles.extraListTitle}></Text>
      <View style={styles.castSubMenuContainer}>
      {/* <FlatList
          style={{ marginVertical: 5 }}
          data={episodeData}
          keyExtractor={(item) => item?.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          ListEmptyComponent={()=><Text style={{color:Colors.WHITE}}>No Records!!!</Text>}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.id}
              characterName={item?.name}
              image={item?.profile_path}
            />
          )}
        /> */}
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{data?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? COLORS.WHITE : COLORS.LIGHT_GRAY,
              }}
            >
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? COLORS.LIGHT_GRAY : COLORS.WHITE,
              }}
            >
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginVertical: 5 }}
          data={isCastSelected ? data?.credits?.cast : data?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListEmptyComponent={()=><Text style={{color:Colors.WHITE}}>No Records!!!</Text>}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={data?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListEmptyComponent={()=><Text style={{color:Colors.WHITE}}>No Records!!!</Text>}
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
            onPress={() => navigation.replace("Tvdetail", { TvId: item.id })}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={data?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListEmptyComponent={()=><Text style={{color:Colors.WHITE}}>No Records!!!</Text>}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.replace("Tvdetail", { TvId: item.id })}
          />
        )}
      /> 


      <View style={{padding:20}}></View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: COLORS.WHITE,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: COLORS.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    marginVertical: 8,
    marginTop:20,
    marginBottom:20,
  },
});


export default TvDetail;