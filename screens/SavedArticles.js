import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Saved() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text> Hey ,this is the SAVED ARTICLE SCREEN </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:"yellow"
  },
});
