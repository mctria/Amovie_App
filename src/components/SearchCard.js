import React from "react";
import { StyleSheet, TouchableOpacity, View , Text, Image } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { getPoster } from "../services/MovieService";


const SearchCard = ({
  title,
  poster,
  vote_average,
  type,
  onPress,
})=>{


   return(
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>

      <View style={styles.SubMainView}>
         <Image source={{uri:getPoster(poster)}} resizeMode="contain" style={{height:80,width:80}}/>

         <View style={styles.TextView}>
            <Text style={styles.TitleText}>{title}</Text>
            <View style={{flexDirection:"row",marginTop:10,marginStart:5}}>
               <Ionicons name="star" color={Colors.YELLOW} size={20} />
               <Text style={styles.voteavgText}>{vote_average}</Text>
               <Ionicons name={type === 'movie' ? "logo-youtube" : "tv"} size={18} color={Colors.GRAY} />
            </View>
         </View>

         <View style={styles.IconView}>
            {/* <Ionicons name={type === 'movie' ? "logo-youtube" : "tv"} size={25} color={Colors.WHITE} /> */}
            <Ionicons name={"send"} size={20} color={"#AAA"} style={{marginTop:25}} />
         </View>
      </View>

    </TouchableOpacity>
   )
};

const styles = StyleSheet.create({
   SubMainView:{
      flexDirection:"row",
      borderBottomWidth:0.4,
      borderBottomColor:Colors.WHITE,
      marginStart:0,
      padding:10,
   },

   TitleText:{
      fontFamily: Fonts.EXTRA_BOLD,
      color: Colors.GRAY,
      paddingVertical: 2,
      marginTop: 5,
      width: 230,
   },
   voteavgText:{
      color:Colors.WHITE,
      marginStart:5,
      marginEnd:30,
   }
});

export default SearchCard;