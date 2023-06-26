import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, TextInput, SafeAreaView, VirtualizedList, FlatList, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import {Ionicons} from "@expo/vector-icons";
import { getSearch,getPopularMovies } from "../services/MovieService";
import SearchCard from "../components/SearchCard";
import { ItemSeparator } from "../components/ItemSeparator";



const Search = ({navigation})=>{

    
    const [querry, setquerry] = useState('')
    const [data, setdata] = useState({})

    // useEffect(()=>{
    //     setdata(getPopularMovies)
    //     console.log(data)
    // },[])
    
    const Searchlist = ({data})=>{
        return(
            <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            // ListHeaderComponent={() => <ItemSeparator width={20} />}
            // ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            // ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({item})=>(//console.log(item.title? item.title : item.name)
                item.media_type !== 'person' ? (
                <SearchCard
                title={item.title ? item.title : item.name}
                poster={item.poster_path}
                vote_average={item.vote_average}
                type = {item.media_type}
                onPress={() => item.media_type === "movie" ? navigation.navigate("movie", { movieId: item.id } ) 
                : navigation.navigate("Tvdetail", { TvId: item.id } )}
                
                /> ):null
                // <View style={{marginBottom:40}}><Text style={{margin:20,color:"white"}} key={item.id} >{item.title}</Text></View>
            )}
            /> 
        )
    };

    return(
        <SafeAreaView style={styles.mainView}>

            {/* <View style={styles.HeaderView}>
               
                <View style={styles.headerView}>
                    <Text style={styles.textView}>Search</Text>
                </View>
                
            </View> */}
            <View style={styles.inputView}>
                {/* input */}
                <Ionicons name="search" size={30} color={Colors.WHITE} style={styles.icon}/>
                <TextInput
                    placeholder="Search movies & Tv shows"
                    style={styles.textInput}
                    inlineImageLeft="search"
                    value={querry}
                    onChangeText={(e)=>{setquerry(e)
                        getSearch(e).then((response)=>setdata(response?.data?.results))
                        // console.log(data)
                    }}
                    onSubmitEditing={(event)=>{
                        getSearch(querry).then((response)=>setdata(response?.data?.results))
                        // console.log(data)
                        setquerry('')
                    }}
                    placeholderTextColor={"grey"}
                    
                />
            </View>
            <View style={styles.dataView}>
                {/* <ScrollView> */}
                {data ? 
                <Searchlist data={data} />
                : null}
                {/* </ScrollView> */}
            </View>


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:Colors.BASIC_BACKGROUND,
        paddingTop:20,
    },
    textView:{
      color:Colors.WHITE,  
    },
    inputView:{
        flexDirection:"row",
    },
    icon:{
        margin:10,
        zIndex:10,
        position:"absolute",
        top:12,
        end:15,
    },
    textInput:{
        // borderWidth:3,
        // borderColor:Colors.WHITE,
        padding:15,
        flex:1,
        margin:12,
        backgroundColor:"#444",
        borderRadius:8,
        // flexGrow:5,
        color:Colors.WHITE,
    },
    dataView:{
        marginEnd:10,
        marginStart:10,
        paddingBottom:100,
        // backgroundColor:"#444",
        // flex:1,
    },
    HeaderView:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#333",
    },
    headerView:{
        padding:20,
    }
});


export default Search;