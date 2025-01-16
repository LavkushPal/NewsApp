import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../firebase";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { saveArticle, deleteArticle } from "../store";

export default function DetailScreen({ route }) {
  const { article } = route.params;
  const dispatch = useDispatch();

  // Access saved articles from the global state
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  // Check if the article is already saved
  const isSaved = savedArticles.some((saved) => saved.title === article.title);
  const savedArticle = savedArticles.find(
    (saved) => saved.title === article.title
  );

  const storeArticle = async (article) => {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
        author: article.author,
        publishedAt: article.publishedAt,
      });
      // Save the article in Redux with the doc ID
      dispatch(saveArticle({ article, docId: docRef.id }));
      Alert.alert("Success", "Article saved successfully");
    } catch (error) {
      Alert.alert("Error", `Error occurred while saving article: ${error}`);
    }
  };

  const deleteArticleFromDB = async (docId) => {
    try {
      const docRef = doc(db, "articles", docId);
      await deleteDoc(docRef);
      // Remove the article from Redux
      dispatch(deleteArticle(docId));
      Alert.alert("Success", "Article deleted successfully");
      
    } catch (error) {
      Alert.alert("Error", `Error occurred while deleting article: ${error}`);
    }
  };

  return (
    <ScrollView style={styles.safe_view}>
      <View style={styles.container}>
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.articlesImage}
        />
        <View style={styles.newsDescription}>
          <View style={styles.articlesHeading}>
            <Text style={styles.articlesHeadingText}>{article.title}</Text>
          </View>
          <View style={styles.articleDescription}>
            <Text style={styles.articleDescriptionText}>
              {article.description}
            </Text>
          </View>
          <View style={styles.articlesAuthorDate}>
            <Text> {article.author}</Text>
            <Text> {article.publishedAt}</Text>

            {/* Render Save or Delete Button Based on State */}
            {!isSaved ? (
              <Pressable onPress={() => storeArticle(article)}>
                <Ionicons name="bookmark-outline" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => deleteArticleFromDB(savedArticle.docId)}>
                <Ionicons name="bookmark" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe_view: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  articlesImage: {
    width: "95%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsDescription: {
    flex: 1,
    paddingHorizontal: 10,
  },
  articlesHeading: {
    marginBottom: 10,
    alignItems: "center",
  },
  articlesHeadingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  articleDescription: {
    marginBottom: 10,
    height: "auto",
  },
  articleDescriptionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  articlesAuthorDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
