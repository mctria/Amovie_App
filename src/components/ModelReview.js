import React, {useState,useEffect} from "react";
import FONTS from "../constants/Fonts";
import { StyleSheet, View, Text, Modal, Pressable, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";



const ModelReview = ({movieName,comnt,vis})=>{

    const [comment, setcomment] = useState("")
    const [visible, setvisble] = useState(false)
    const [id, setid] = useState(movieName)

    useEffect(()=>{
        if (id === ''){
            setid(movieName)
        };
        if (id === movieName){
            setcomment(comnt)
            if (vis === true){
                setvisble(true)
            };
        };
    },[])

    return(
        <View style={styles.centeredView}>
            
            <Modal
            animationType = {"fade"} transparent = {true}
            visible = {visible}
            onRequestClose = {() => { console.log("Modal has been closed.mr");
            setvisble(false);
            } }
            >
                
            <View style={styles.centeredView}>
                
                <View style={styles.modalView}>
                    
                        <View style={styles.btn}>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>{ setvisble(false);}}
                            >
                            <Ionicons name="close" size={40} color={Colors.WHITE}/>
                            </Pressable>
                        </View>
                        <Text style={styles.modalText}>Review By {movieName}</Text>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={styles.Player}>
                            <Text style={{color:Colors.WHITE}}>{comment}</Text>
                        </View>
                    </ScrollView>
                </View>
                   
            </View>
            </Modal>
           
        </View>
    )
};


const styles = StyleSheet.create({
    centeredView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        marginBottom:80,
    },
    modalView: {
        margin: 5,
        backgroundColor: "#334",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btn:{
        backgroundColor:"red",
        zIndex:100,
    },
    button: {
        position:"absolute",
        left:120,
        top:-10,
        // padding: 15,
        // paddingLeft:55,
        // paddingRight:55,
        elevation: 2,
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 30,
        color:Colors.WHITE,
        textAlign: "center",
        fontFamily: FONTS.EXTRA_BOLD,
        fontSize: 18,
    },
});

export default ModelReview;