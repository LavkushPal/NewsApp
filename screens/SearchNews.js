import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";

export default function Search() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput style={styles.inputForm} placeholder="type here" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
  },
  inputForm:{
    borderRadius:5,
    borderWidth:1,
    shadowOpacity:0.5,
    shadowColor:"red"
  }
});
