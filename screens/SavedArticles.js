import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Search({navigation}) {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getArtciles = async () => {
    try {
      const articles = [];
      const querySnapshot = await getDocs(collection(db, "articles"));
      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });
      setPostList(articles);
    } catch (error) {
      Alert.alert("error during fetching data", error);
    }
  };

  useEffect(() => { //this invokes function on aap loaded 
    getArtciles();
  }, []);

  useFocusEffect( // this invokes function when screen is on focus means clicked 
    useCallback(()=>{
      getArtciles();
    }),)

  const handleRefresh = () => {
    setRefreshing(true);
    try{
      setIsLoading(true);
      getArtciles();
    }
    catch(error){
      Alert.alert("Error during fetching",` ${error}`);
    }
    finally{
          setRefreshing(false);
          setIsLoading(false);
    }
    
  };



  if(isLoading){
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>wait, we're fetching the data...</Text>
        </View>
      );
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.article_container}>
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.eachArticles}
              onPress={() =>
                navigation.navigate("DetailScreen", { article: item })
              }
            >
              <Image
                source={{
                  uri:
                    item.urlToImage ||
                    "https://www.counterpunch.org/wp-content/uploads/2024/12/flaglongview-scaled.jpeg",
                }}
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer:{
    paddingTop:30,
    margin:30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f9f9f9",
    borderRadius:10,
    shadowOffset:{width:0,height:5},
    shadowColor:"black",
    shadowOpacity:1
  },
  container: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  article_container: {
    marginTop: 30,
    marginLeft: 15,
  },
  eachArticles: {
    marginBottom: 30,
    width: "95%",
    height: "auto",
    borderWidth: 1,
    backgroundColor: "white",
    // borderColor:"#1C6E8C",
    borderBottomColor: "red",
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
  newsDescription: {
    flex: 1,
    margin: 15,
  },
  articlesHeading: {
    flex: 1,
    marginBottom: 10,
  },
  articlesHeadingText: {
    fontSize: 20,
  },
  articlesAuthorDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
