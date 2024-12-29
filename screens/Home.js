import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";

const DATA = [
  { id: "1", title: "World News" },
  { id: "2", title: "Tech" },
  { id: "3", title: "Sports" },
  { id: "4", title: "Weather" },
  { id: "5", title: "World News" },
  { id: "6", title: "Tech" },
  { id: "7", title: "Sports" },
  { id: "8", title: "Weather" },
];

const Articles = {
  status: "ok",
  totalResults: 2,
  articles: [
    {
      source: { id: "1", name: "CounterPunch" },
      author: "Jeffrey St. Clair",
      title: "Hell and High Water: the Year in Climate Chaos",
      description: "2024 will be the warmest year on record...",
      url: "https://www.counterpunch.org/2024/12/20/hell-and-high-water-the-year-in-climate-chaos/",
      urlToImage: "https://www.counterpunch.org/wp-content/uploads/2024/12/flaglongview-scaled.jpeg",
      publishedAt: "2024-12-20T06:59:11Z",
      content: "Industrial plants, Port of Longview...",
    },
    {
      source: { id:"2", name: "Neuwritesd.org" },
      author: "Vani Taluja",
      title: "A 3D Camera for the Brain: The Simplified Science of MRI",
      description: "Have you ever dreamed of having Superman’s power of “X-Ray Vision”...",
      url: "https://neuwritesd.org/2024/12/19/a-3d-camera-for-the-brain-the-simplified-science-of-mri/",
      urlToImage: "https://neuwritesd.org/wp-content/uploads/2024/12/mris.jpeg?w=1200",
      publishedAt: "2024-12-20T04:52:29Z",
      content: "Posted by Vani Taluja on December 19, 2024...",
    },
    {
      source: { id: "1", name: "CounterPunch" },
      author: "Jeffrey St. Clair",
      title: "Hell and High Water: the Year in Climate Chaos",
      description: "2024 will be the warmest year on record...",
      url: "https://www.counterpunch.org/2024/12/20/hell-and-high-water-the-year-in-climate-chaos/",
      urlToImage: "https://www.counterpunch.org/wp-content/uploads/2024/12/flaglongview-scaled.jpeg",
      publishedAt: "2024-12-20T06:59:11Z",
      content: "Industrial plants, Port of Longview...",
    },
    {
      source: { id:"2", name: "Neuwritesd.org" },
      author: "Vani Taluja",
      title: "A 3D Camera for the Brain: The Simplified Science of MRI",
      description: "Have you ever dreamed of having Superman’s power of “X-Ray Vision”...",
      url: "https://neuwritesd.org/2024/12/19/a-3d-camera-for-the-brain-the-simplified-science-of-mri/",
      urlToImage: "https://neuwritesd.org/wp-content/uploads/2024/12/mris.jpeg?w=1200",
      publishedAt: "2024-12-20T04:52:29Z",
      content: "Posted by Vani Taluja on December 19, 2024...",
    },
  ],
}


export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.safe_view}>
      <View style={styles.container}>
        <View style={styles.categories}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  console.log(`${item.title}  category is pressed`)
                }
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
            data={Articles.articles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.eachArticles} onPress={ ()=> navigation.navigate("DetailScreen",{article:item})}>
                <Image
                  source={{ uri: item.urlToImage }}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe_view: {
    flex: 1,
  },
  container: {
    padding: 10,
    marginTop: 20,
    width: 400,
    height: 600,
  },
  item: {
    padding: 10,
    backgroundColor: "#1C6E8C",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  article_container: {
    marginTop: 30,
  },
  eachArticles: {
    marginBottom: 30,
    width: 380,
    height: 320,
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
    width: 380,
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
