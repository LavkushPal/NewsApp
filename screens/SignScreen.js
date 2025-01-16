import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function ProfileScreen({ navigation }) {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");

  const signup = async function signUp(email, password) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success SignUp 😁", user.user.email);
      setIsSignedUp(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "email already in use 😥");
      } else {
        Alert.alert("Error", "failed to sign up 😒");
      }
    }
  };

  const signin = async function signIn(email, password) {
    try {
      const userVerification = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      Alert.alert("Success 😍", `Logged in as ${userVerification.user}`);
      setIsSignedIn(true);
      navigation.navigate("HomeTabs");
    } catch (error) {
      Alert.alert("Error", "failed to sign in 😒");
    }
  };

  const signout_user = async function () {
    try {
      const userout = await signOut(auth);
      Alert.alert("Success", "user signed out 🤦‍♂️");
      setIsSignedIn(false);
    } catch (error) {
      Alert.alert("Error", "failed to sign out 😒");
    }
  };

  if (isSignedUp) {
    if (isSignedIn) {
      return (
        <View style={styles.form_container}>
          <Text>signed as {isEmail}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => signout_user()}>
              <Text style={styles.button_update}>log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.form_container}>
          <TextInput
            value={isEmail}
            onChangeText={setIsEmail}
            style={styles.inputForm}
            placeholder="enter email"
          />
          <TextInput
            value={isPassword}
            onChangeText={setIsPassword}
            style={styles.inputForm}
            placeholder="enter password"
            secureTextEntry={true}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => signin(isEmail, isPassword)}>
              <Text style={styles.button_update}>sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.form_container}>
      <TextInput
        value={isEmail}
        onChangeText={setIsEmail}
        style={styles.inputForm}
        placeholder="enter email"
      />
      <TextInput
        value={isPassword}
        onChangeText={setIsPassword}
        style={styles.inputForm}
        placeholder="enter password"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => signup(isEmail, isPassword)}>
        <Text style={styles.button_update}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form_container: {
    marginTop: 50,
    paddingTop: 50,
    paddingBottom: 30,
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
