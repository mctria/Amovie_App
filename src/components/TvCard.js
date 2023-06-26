import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
 } from "react-native";
import IMAGES from "../constants/Images";
import { Ionicons } from "@expo/vector-icons";
import { getPoster, getLanguage } from "../services/MovieService";
import Colors from "../constants/Colors";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";


const TvCard = ({voteAverage,name,language,poster,voteCount,size,onPress,first_air_date}) =>{

    return(
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: getPoster(poster) }}
      >
        <Ionicons name={'tv'} size={20} color={Colors.HEART} style={styles.tv}/>
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={IMAGES.IMDB}
            resizeMode="cover"
            style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              color:Colors.WHITE,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        {/* {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1
              );
            }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={25 * size}
              color={liked ? COLORS.HEART : COLORS.WHITE}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null} */}
      </ImageBackground>
      <View>
        <Text
          style={{ ...styles.movieTitle, width: 230 * size }}
          numberOfLines={3}
        >
          {name}
        </Text>
        <View style={styles.movieSubTitleContainer}>
          <Text style={styles.movieSubTitle}>
            {getLanguage(language).english_name}
          </Text>
          <View style={styles.rowAndCenter}>

            {/* <Ionicons
              name="heart"
              size={17 * size}
              color={COLORS.HEART}
              style={{ marginRight: 5 }}
            /> */}
            <Text style={styles.movieSubTitle}>{first_air_date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2,
      },
      movieTitle: {
        fontFamily: FONTS.EXTRA_BOLD,
        color: COLORS.GRAY,
        paddingVertical: 2,
        marginTop: 5,
        width: 230,
      },
      movieSubTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      movieSubTitle: {
        color:COLORS.WHITE,
        fontSize: 9,
        fontFamily: FONTS.REGULAR,
      },
      tv:{
        position:"absolute",
        margin:5,
      },
      rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
      },
      imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: COLORS.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
      },
      imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,
      },
      imdbRating: {
        marginRight: 5,
        color: COLORS.HEART,
        fontFamily: FONTS.EXTRA_BOLD,
      },
});

export default TvCard;