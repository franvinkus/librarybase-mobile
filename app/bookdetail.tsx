import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function BookScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const bookData = {
    title: params.title,
    author: params.author,
    category: params.category || "Category",
    description:
      params.description ||
      "Nora Stephens' life is books—she's read them all—and she is not that type of heroine. Not the plucky one, not the laidback dream girl, and especially not the sweetheart. In fact, the only people Nora is a heroine for her clients, for whom she lands enormous deals as a cutthroat literary agent, and her beloved little sister Libby.",
    image: params.image,
  };

  const categories = bookData?.category || ["Unknown"];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Booking</Text>
      </View>

      {/* Category Section */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView} contentContainerStyle={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryItem}>
          <Text style={styles.categoryText}>{bookData.category}</Text>
        </TouchableOpacity>
      </ScrollView> */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView} contentContainerStyle={styles.categoriesContainer}></ScrollView>
        {/* Button Info di Pojok Kanan */}
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>{bookData.category}</Text>
        </TouchableOpacity>
      </View>

      <view style={styles.bookCard}>
        <Image source={bookData.image ? { uri: bookData.image } : require("../assets/images/img.png")} style={styles.bookImage} defaultSource={require("../assets/images/img.png")} />
        <View style={styles.bookTextContainer}>
          <Text style={styles.bookTitle}>{bookData.title}</Text>
          <Text style={styles.bookAuthor}>{bookData.author}</Text>
          <Text style={styles.bookDescription}>{bookData.description}</Text>
        </View>
      </view>

      {/* Book Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  bookCard: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 8, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  bookImage: { width: 60, height: 90, borderRadius: 4, marginRight: 12 },
  bookTextContainer: { flex: 1 },
  bookTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  bookAuthor: { fontSize: 14, color: "#666", marginBottom: 8 },
  bookDescription: { fontSize: 14, color: "#333", lineHeight: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  categoriesScrollView: {
    maxHeight: 50,
    marginBottom: 8,
  },

  categoriesContainer: {
    alignItems: "center",
  },

  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: "#f0f0f0",
  },

  selectedCategory: {
    backgroundColor: "#09173E",
  },

  categoryText: {
    fontSize: 14,
    color: "#000",
  },

  selectedCategoryText: {
    color: "#fff",
  },

  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 60,
    textAlign: "center",
  },
  authorName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
  },
  titleContainer: {
    marginVertical: 20,
    alignItems: "center",
  },

  authorText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 40,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  categoryWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  infoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#09173E",
    marginLeft: 10, // Beri jarak dari kategori
  },

  infoButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
