import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {useState,useEffect} from "react";

const DATA = [
  { id: "1", title: "technology" },
  { id: "2", title: "general" },
  { id: "3", title: "sports" },
  { id: "4", title: "science" },
  { id: "5", title: "health" },
  { id: "6", title: "business" },
  { id: "7", title: "entertainment" },
];


export default function Home({navigation}) {
  const [ isPressed,setIsPressed] = useState(false);
  const [postList, setPostList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async (cat) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${cat}&apiKey=6fa703fd45ab4eadb38ffe41788b223b`
      );
      const data = await response.json();
      setPostList(data.articles);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const handleRefresh = () => {
    setRefreshing(true);
    try{
      fetchData(selectedCategory);
    }
    catch(error){
      console.log("error during refresh", error);
    }
    finally{
          setRefreshing(false);
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
    <SafeAreaView style={styles.safe_view}>
      <View style={styles.container}>
        <View style={styles.categories}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable 
                onPress={ ()=> setSelectedCategory(item.title)}
                style={({ pressed }) => [
 
                  { 
                    borderRadius: 10,
                    color: pressed ? '#f5f5f5' : '#1C6E8C', // Change color when pressed
                    backgroundColor: pressed? '#1C6E8C' :  '#f5f5f5',
                    opacity: pressed ? 0.7 : 1, // Change opacity to show it is active
                  }
                ]}
                
              
              >
                <View style={styles.item}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </Pressable>
            )}
            horizontal
            // showsHorizontalScrollIndicator={false}
          />
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
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
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
  safe_view: {
    flex: 1,
    
  },
  container: {
    padding: 10,
    marginTop: 20,
    width: 400,
    height: 600,
  },
  categories:{

  },
  item: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth:1,
    borderColor:"#1C6E8C"
  },
  title: {
    fontSize: 20,
    color: "#1C6E8C",
  },
  article_container: {
    marginTop: 30,
  },
  eachArticles: {
    marginBottom: 30,
    marginLeft:10,
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
    borderRadius: 7,
  },
  newsDescription:{
    flex:1,
    margin:15,
  },
  articlesHeading:{
    flex:1,
    marginBottom:10,
    // justifyContent:"center",
    // alignItems:"center"
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
