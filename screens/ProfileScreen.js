import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePicture from "../assets/lavprofile.png";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen({ navigation }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isNumber, setIsNumber] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("please allow to select image");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.CameraType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const storeData = async () => {
    try {
      const bio = {
        name: isName,
        email: isEmail,
        number: isNumber,
        picture: selectedImage,
      };
      await AsyncStorage.setItem("bio", JSON.stringify(bio));
      Alert.alert("Success", "your bio is updated");
      setIsEdit(false);
    } catch (error) {
      Alert.alert("error", "failed to update bio");
    }
  };

  const getData = async () => {
    try {
      const load = await AsyncStorage.getItem("bio");
      if (load) {
        const parsedLoad = JSON.parse(load);
        setIsName(parsedLoad.name);
        setIsEmail(parsedLoad.email);
        setIsNumber(parsedLoad.number);
        setSelectedImage(parsedLoad.picture);
      } else {
        Alert.alert("info", "DATA NOT FOUND");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load data");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            isEdit == true ? setIsEdit(false) : setIsEdit(true);
          }}
        >
          <Ionicons name="create-outline" size={30} color={"#cca"} />
        </Pressable>
      ),
    });
  }, [navigation, isEdit]);

  useEffect(() => {
    getData();
  }, []);

  

  if (isEdit) {
    return (
      <View style={styles.form_container}>
        <TouchableOpacity onPress={() => pickImage()}>
          <Text style={styles.button}>Upload Profile Picture</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}

        <TextInput
          value={isName}
          onChangeText={setIsName}
          style={styles.inputForm}
          placeholder="you good name"
        />
        <TextInput
          value={isEmail}
          onChangeText={setIsEmail}
          style={styles.inputForm}
          placeholder="enter email"
        />
        <TextInput
          value={isNumber}
          onChangeText={setIsNumber}
          style={styles.inputForm}
          placeholder="enter mobile number"
        />

        <TouchableOpacity onPress={() => storeData()}>
          <Text style={styles.button_update}>Update Bio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <Pressable>
        <Image
          source={{ uri: selectedImage } || ProfilePicture}
          style={styles.profileImage}
        />
      </Pressable>
      <View style={styles.profileDescription}>
        <Text style={styles.text}> {isName || "your name here"} </Text>
        <Text style={styles.text}> {isEmail || "your email here"}</Text>
        <Text style={styles.text}> {isNumber || "your number here"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 50,
    marginLeft: 15,
    marginTop: 20,
    height: "auto",
    width: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowColor: "#000",
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#cca",
  },
  profileDescription: {
    marginTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
  form_container: {
    paddingTop: 50,
    marginLeft: 20,
    paddingHorizontal: 20, // Add horizontal padding for better alignment
    height: "auto", // Allow height to adjust dynamically
    width: "90%", // Make it responsive
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15, // Add rounded corners for a modern design
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20, // Add space below the image
  },
  buttonContainer: {
    width: "100%", // Buttons take full width of the form
    marginTop: 10, // Space between the image and buttons
  },
  button: {
    backgroundColor: "#cca",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10, // Add padding for touch area
    paddingHorizontal: 15,
    marginVertical: 5, // Add spacing between buttons
    borderRadius: 5, // Rounded button
  },
  button_update: {
    backgroundColor: "blue",
    color: "#f9f9f9",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10, // Add padding for touch area
    paddingHorizontal: 15,
    marginVertical: 5, // Add spacing between buttons
    borderRadius: 5, // Rounded button
  },
  inputForm: {
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.15,
    elevation: 3,
    width: "100%", // Ensure the input takes the full width of the form
  },
});
