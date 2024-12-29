import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function DetailScreen({ route }) {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.safe_view}>
      <View style={styles.container}>
        <Image source={{ uri:article.urlToImage }} style={styles.articlesImage} />
        <View style={styles.newsDescription}>
          <View style={styles.articlesHeading}>
            <Text style={styles.articlesHeadingText}>
              {article.title}
            </Text>
          </View>
          <View style={styles.articleDescription}>
            <Text style={styles.articleDescriptionText}>
              {article.description}
            </Text>
          </View>
          <View style={styles.articlesAuthorDate}>
            <Text> {article.author}</Text>
            <Text> {article.publishedAt}</Text>
          </View>
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
  articlesImage: {
    width: 400,
    height: 200,
    borderRadius: 10,
  },
  newsDescription: {
    flex: 1,
    margin: 15,
  },
  articlesHeading: {
    flex: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  articlesHeadingText: {
    fontSize: 20,
  },
  articleDescription:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20,
  },
  articleDescriptionText:{
    fontSize:10,
  },
  articlesAuthorDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
