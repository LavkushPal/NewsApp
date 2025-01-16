import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Image
} from "react-native";
import { useState, useEffect } from "react";

export default function Search({navigation}) {
  const [search,setSearch]=useState("technology");
  const [postList, setPostList] = useState([]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=6fa703fd45ab4eadb38ffe41788b223b`
      );
      const data = await response.json();
      setSearch("");
      setPostList(data.articles);
    } catch (error) {
      Alert.alert("error","query is not resolved,search another type");
      // console.log("Error occurred while fetching data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.inputForm}
          placeholder="enter your query"
        />
        <Pressable onPress={() => fetchData(search)}>
          <Text style={styles.button}>Search News</Text>
        </Pressable>
      </View>
      <View style={styles.article_container}>
          <FlatList
            data={postList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.eachArticles} onPress={ ()=> navigation.navigate("DetailScreen",{article:item})}>
                <Image
                  source={{ uri: item.urlToImage || 'https://www.counterpunch.org/wp-content/uploads/2024/12/flaglongview-scaled.jpeg'  }}
                  style={styles.articlesImage}
                />
                <View style={styles.newsDescription}>
                  <View style={styles.articlesHeading}>
                    <Text style={styles.articlesHeadingText}> {item.title}</Text>
                  </View>
                  <View style={styles.articlesAuthorDate}>
                    <Text> {item.author}</Text>
                    <Text> {item.publishedAt}</Text>
                  </View>
                </View>
              </Pressable>
            )}
            
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputForm: {
    width: "80%",
    height: "auto",
    paddingHorizontal:10,
    paddingVertical:15,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    shadowOpacity: 0.15,
    shadowOffset:{width:0,height:2},
    shadowColor: "white",
    elevation:3
  },
  button: {
    marginTop:10,
    backgroundColor: "#cca",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10, // Add padding for touch area
    paddingHorizontal: 15,
    marginVertical: 5, // Add spacing between buttons
    borderRadius: 5, // Rounded button
  },
  article_container: {
    marginTop:30,
    marginLeft:15,
  },
  eachArticles: {
    marginBottom: 30,
    width: "95%",
    height: "auto",
    borderWidth:1,
    backgroundColor:"white",
    // borderColor:"#1C6E8C",
    borderBottomColor:"red",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  articlesImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  newsDescription:{
    flex:1,
    margin:15,
  },
  articlesHeading:{
    flex:1,
    marginBottom:10,
  },
  articlesHeadingText:{
    fontSize:20,
  },
  articlesAuthorDate:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"baseline"
  }
});
