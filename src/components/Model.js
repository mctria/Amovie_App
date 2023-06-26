import React, {useState,useEffect} from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import FONTS from "../constants/Fonts";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import Colors from "../constants/Colors";



const Model = ({vis,keys,movieName}) =>{

    const [visible, setvisble] = useState(false)
    const [playing, setplaying] = useState(true)
    // var vist = vis

    // console.log(keys,vist)
    useEffect(()=>{
        if (vis === true){
            setvisble(true)
        }else if (visible !== true){
            setvisble(false)
            // vist = true
        };
        
    },[]);
    
    return(
        <View style={styles.centeredView}>
            <Modal
            animationType = {"fade"} transparent = {true}
            visible = {visible}
            onRequestClose = {() => { console.log("Modal has been closed.");
            setvisble(false);
            } }
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{movieName} #Trailer</Text>

                        <View style={styles.Player}>
                            <YoutubePlayer
                            videoId={keys?.toString()}
                            height={300}
                            width={300}
                            play={playing}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>{ setvisble(false);}}
                            >
                            <Text style={styles.textStyle}>CANCEL</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            
        </View>
    )
};



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
    Player:{

    },
    button: {
        position:"absolute",
        right:-75,
        bottom:30,
        padding: 15,
        paddingLeft:55,
        paddingRight:55,
        elevation: 2,
        backgroundColor:"yellow"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 30,
        color:"white",
        textAlign: "center",
        fontFamily: FONTS.EXTRA_BOLD,
        fontSize: 18,
    },
})

export default Model;