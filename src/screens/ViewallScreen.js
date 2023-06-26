import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, VirtualizedList} from "react-native";
import Colors from "../constants/Colors";
import MovieCard from "../components/MovieCard";
import { getNowPlayingMovies, getPopularMovies, getUpcomingMovies } from "../services/MovieService";

// for (x in route.params.data.popularMovies.total_pages){
//     console.log(route.params.data.popularMovies.total_pages)
//     if (title === 'Now Showing'){
//         {datas?setdatas((datas)=>datas.concat(getNowPlayingMovies(x))):setdatas(getNowPlayingMovies(x))}
//         // console.log(datas)
//     }else if (title === "Now Popular"){
//         {datas?setdatas((datas)=>datas.concat(getPopularMovies(x))):setdatas(getPopularMovies(x))}
//     }else if (title === 'Coming Soon'){
//         {datas?setdatas((datas)=>datas.concat(getUpcomingMovies(x))):setdatas(getUpcomingMovies(x))}
//     };
// };

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => [start + i]);


const ViewAll = ({route,navigation})=>{

    const [datas, setdatas] = useState({})
    const [pgno, setpgno] = useState(0)

    useEffect(()=>{
        const fetchdata = async ()=>{
            console.log("enter to use")
                if (route.params.title === 'Now Showing'){
                    console.log("enter to if")
                    await getNowPlayingMovies().then((res)=>setpgno(res.data.total_pages))
                    // console.log("pageno = "+pgno)
                    // console.log(range(1,pgno))
                    let x = range(1,3);
                    x.forEach((a)=>(//console.log("x = "+a)));
                     getNowPlayingMovies(Number(a)).then((res)=>setdatas(datas !== {} ? ([datas,...res.data.results]) : (datas) ))));
                };
            };
    
            fetchdata()
    
        },[])

    return(

        <View style={styles.MainView}>
            
            <View style={styles.TextContainer}>
                {/* {console.log(datas)} */}
            <Text style={styles.TextView}>{route.params.title}</Text>
            </View>
            <FlatList
            data={datas}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
                <Text style={{color:Colors.WHITE}} key={item.id}>{item.title}</Text>
            )}
            />
            
        </View>
    )
};


const styles = StyleSheet.create({
    MainView:{
        backgroundColor:Colors.BLACK,
        flex:1,
        padding:15,
    },
    TextView:{
        color:Colors.WHITE,
        fontSize:20,
    },
    TextContainer:{
        height:50,
        borderBottomWidth:0.3,
        borderBottomColor:Colors.WHITE,
        elevation:4,
    }
});

export default ViewAll;