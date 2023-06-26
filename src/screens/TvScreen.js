// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity , Image, StatusBar } from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import TvCard from "../components/TvCard";
import MovieCards from "../components/MovieCards";
import ItemSeparator from "../components/ItemSeparator";
import {
    getAiringToday,
    getOnTheAir,
    getPopularTv,
    getTvById,
    getTopRated,
} from "../services/MovieService";
import { SliderBox } from "react-native-image-slider-box";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";


const Tv = ({ navigation }) => {

  const [slideimg, setslideimg] = useState([]); // image slide

  const [AiringToday, setAiringToday] = useState({}); // data
  const [OnTheAir, setOnTheAir] = useState({});
  const [TopRated, setTopRated] = useState({});
  const [PopularTv, setPopularTv] = useState({});

  const [AiringToday2, setAiringToday2] = useState({}); // data 2
  const [PopularTv2, setPopularTv2] = useState({});
  const [OnTheAir2, setOnTheAir2] = useState({});
  const [TopRated2, setTopRated2] = useState({});

  const [Viewall, setViewall] = useState({
    Airing:false,
    popular:false,
    ontheair:false,
    rated:false,
  });
  

  useEffect(() => {
    const fetchdata = async () =>{

    await getAiringToday().then((tvResponse) =>
      setAiringToday(tvResponse.data)
    );
    await getAiringToday(2).then((tvResponse) =>
      setAiringToday2(tvResponse.data)
    );

    await getPopularTv().then((TvResponse) =>
      setPopularTv(TvResponse.data)
    );
    await getPopularTv(2).then((TvResponse) =>
      setPopularTv2(TvResponse.data)
    );

    // console.log(AiringToday.results)
    // await getLatest().then((data)=>
    //   setslideimg(data.data.results.slice(1,11))
    // );

    await getOnTheAir(2).then((TvResponse) =>
      setOnTheAir(TvResponse.data)
    );
    await getOnTheAir(3).then((TvResponse) =>
      setOnTheAir2(TvResponse.data)
    );

    // await getLatest().then((TvResponse) =>
    //   setLatest(TvResponse.data)
    // );
    // console.log(Latest)
    
    await getTopRated().then((res)=>
      setTopRated(res.data)
    );
    await getTopRated(2).then((res)=>
      setTopRated2(res.data)
    );
    // setimage((slideimg.map(({poster_path})=>"https://image.tmdb.org/t/p/original"+poster_path)));
    };

    fetchdata().catch((err)=>console.error(err))
  },[]);

  const TrueList = ({data})=>{

    return(
      <FlatList
          data={data.results}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          key={(item)=>item.id}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCards
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.7}
              heartLess={false}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
    )
  };

  
  return (

    
    <ScrollView style={styles.container}>
      <StatusBar
        style="light"
        translucent={false}
        backgroundColor={COLORS.STATUS}
      />

          {/* Airing Today */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Airing Today</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setViewall({Airing:!Viewall.Airing})}>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
        {Viewall.Airing ?
        <TrueList data={AiringToday2} />
        //   <FlatList
        //   data={AiringToday.results}
        //   horizontal={false}
        //   showsHorizontalScrollIndicator={false}
        //   numColumns={2}
        //   key={(item)=>item.id}
        //   keyExtractor={(item) => item.id.toString()}
        //   ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        //   ListHeaderComponent={() => <ItemSeparator width={20} />}
        //   ListFooterComponent={() => <ItemSeparator width={20} />}
        //   renderItem={({ item }) => (
        //     <MovieCards
        //       name={item.name}
        //       language={item.original_language}
        //       voteAverage={item.vote_average}
        //       voteCount={item.vote_count}
        //       poster={item.poster_path}
        //       first_air_date={item.first_air_date}
        //       size={0.7}
        //       heartLess={false}
        //       onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
        //     />
        //     // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
        //   )}
        // />
        :
        (
          <View>
            <FlatList
          data={AiringToday.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.8}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
        <View style={{padding:10,}}></View>
        <FlatList
          data={AiringToday2.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.5}
              onPress={() => navigation.navigate("movie", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
      </View>
        )}

            {/* PopularTv */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Popular Tv Shows</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('ViewAll',{
          title : "Now Showing",
          data :{PopularTv}
        })}>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={PopularTv.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.6}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
        <View style={{padding:10,}}></View>
        <FlatList
          data={PopularTv2.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.5}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
      </View>

            {/* OnTheAir */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>On The Air</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('ViewAll',{
          title : "Now Showing",
          data :{OnTheAir}
        })}>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={OnTheAir.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.6}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
        <View style={{padding:10,}}></View>
        <FlatList
          data={OnTheAir2.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.5}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
      </View>

            {/* TopRated */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Rated</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('ViewAll',{
          title : "Now Showing",
          data :{TopRated}
        })}>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={TopRated.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.6}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
        <View style={{padding:10,}}></View>
        <FlatList
          data={TopRated2.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <TvCard
              name={item.name}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              first_air_date={item.first_air_date}
              size={0.5}
              onPress={() => navigation.navigate("Tvdetail", { TvId: item.id })}
            />
            // <Text style={{color:Colors.WHITE}}>{item.name}</Text>
          )}
        />
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

export default Tv;
