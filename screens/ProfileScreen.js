import {StyleSheet, View, Text, Pressable, Image } from "react-native";
import ProfilePicture from "../assets/lavprofile.png";

export default function ProfileScreen() {
  return (
    <View style={styles.profileContainer}>
      <Pressable>
        <Image source={ProfilePicture}style={styles.profileImage}/>
      </Pressable>
      <View style={styles.profileDescription}>
        <Text style={styles.text}> Lavkush Pal </Text>
        <Text style={styles.text}> l.pal@iitg.ac.in</Text>
        <Text style={styles.text}> 63949128XX</Text>
      </View>
    </View>
  );
}


const styles= StyleSheet.create({
    profileContainer:{
        padding:30,
        marginTop:20,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    profileImage:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
    },
    profileDescription:{
        marginTop:30,
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        margin:5
    }
});
