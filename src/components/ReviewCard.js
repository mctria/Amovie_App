import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View , Text, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { getPoster } from "../services/MovieService";
import IMAGES from "../constants/Images";
import ModelReview from "../components/ModelReview";


const ReviewCard = ({data,navigation})=>{

    const [datas, setdata] = useState({})
    const [visible, setvisible] = useState(false)

    useEffect(()=>{
        // console.warn(data)
        if (data !== []) {
            if (data !== ""){
            setdata(data)
            // console.warn("data"+data)
            };
        }else {
            setdata(null)
            // console.warn("null"+data)
        };
        
    });

    // const visi =  ()=>{
    //     setTimeout(function(){
    //         setvisible(false)
    //     },10000)
    // }

    return(
        <View style={styles.MainView}>
            <Text style={styles.extraListTitle}>Movie Reviews</Text>
            {datas  ? 
           <FlatList
           data={datas}
           keyExtractor={(item)=>item.id}
           renderItem={({item})=>(
            <View style={styles.MainViews}>
                <View style={{flexDirection:"row"}}>
                    <View style={{backgroundColor:"#444",borderRadius:50,marginEnd:20,}}>
                        <Text style={{position:"absolute",...styles.NoImg}}>No </Text>
                        <Text style={{position:"absolute",...styles.NoImg2}}>IMG</Text>
                        {item.author_details.avatar_path ? 
                        <Image source={{uri:getPoster( item.author_details.avatar_path)}} 
                        style={{width:40,height:40,...styles.Img}} /> :(
                        <Image source={IMAGES.NOT_PROFILE}
                        style={{width:40,height:40,...styles.Img}} />)
                    }
                    </View>
                    <View style={styles.SubMainView}>
                        <Text style={styles.MainText}>{item.author}</Text>
                        <Text style={styles.SubMainText}>Written on {(item.updated_at).split("T")[0]}</Text>
                    </View>
                </View>
                <View style={{...styles.ContentCOntainer}}>
                    <Text style={{color:Colors.WHITE,fontSize:18,}} numberOfLines={5} >{item.content}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{console.warn("content clicked");setvisible(!visible)}}>
                        <Text style={{color:"lightblue"}}>Know More</Text>
                    </TouchableOpacity>
                    {visible ? (<ModelReview movieName={item.author} comnt={item.content} vis={visible} id={item.id} />) : null}
                    {/* {visi()} */}
                </View>
            </View>
           )}
           
           />:<Text style={styles.Notfound}>No Review Found...</Text> }
        </View>
    )
};

const styles = StyleSheet.create({
    MainView:{
        flex:1,
        margin:20,
        marginTop:0,
    },
    MainViews:{
        marginBottom:10,
    },  
    Img:{
        borderRadius:50,
        marginEnd:5,
        marginTop:5,
        marginStart:5,
        // padding:10,
    },
    MainText:{
        color:Colors.WHITE,
        fontFamily:Fonts.EXTRA_BOLD,
        fontSize:20,
    },
    SubMainText:{
        color:Colors.GRAY,

    },
    ContentCOntainer:{
        padding:10,
        margin:10,
        borderRadius:20,
        backgroundColor:"#444",
        marginStart:40,
    },
    extraListTitle: {
        // marginLeft: 20,
        marginBottom:35,
        color: Colors.WHITE,
        fontFamily: Fonts.BOLD,
        fontSize: 18,
        marginVertical: 8,
    },
    Notfound:{
        color:Colors.WHITE,
        fontSize:20,
        marginTop:20,
        marginStart:30,
    },
    NoImg:{
        color:Colors.WHITE,
        top:8,
        right:10,
    },
    NoImg2:{
        color:Colors.WHITE,
        top:22,
        right:10,
    },
});

export default ReviewCard;