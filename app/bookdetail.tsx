import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function BookScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const bookData = {
    title: params.title || "Book Lovers",
    author: params.author || "Emily Henry",
    category: params.category || "Category",
    description:
      params.description ||
      "Nora Stephens’ life is books—she’s read them all—and she is not that type of heroine. Not the plucky one, not the laidback dream girl, and especially not the sweetheart. In fact, the only people Nora is a heroine for are her clients, for whom she lands enormous deals as a cutthroat literary agent, and her beloved little sister Libby.",
    image: params.image || require("../assets/images/img.png"),
  };

  // Array kategori contoh, menampilkan kategori dari bookData
  const categories = [bookData.category];

  return (
    <View style={styles.container}>
      {/* Header dengan Tombol Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking</Text>
      </View>

      {/* Konten Scroll */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Menambahkan wrapper agar card buku berada di tengah */}
        <View style={styles.bookCardWrapper}>
          <View style={styles.bookCard}>
            <Image source={bookData.image} style={styles.bookImage} />
            <View style={styles.bookTextContainer}>
              <Text style={styles.bookTitle}>{bookData.title}</Text>
              <Text style={styles.bookAuthor}>Author: {bookData.author}</Text>
              <Text style={styles.bookDescription}>{bookData.description}</Text>
            </View>
          </View>

          {/* Book Now Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Menampilkan kategori buku di bawah header dan di paling kanan */}
        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoryText}>{categories.join(", ")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 100, // Mencegah konten tertutup header
    justifyContent: "center", // Agar card buku berada di tengah
    alignItems: "center", // Memastikan konten berada di tengah horizontal
  },
  header: {
    position: "absolute",
    top: 40, // Menyesuaikan dengan status bar
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10, // Memastikan header selalu di atas
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Agar lebih terlihat
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  bookCardWrapper: {
    width: "90%",
    alignItems: "center", // Menjaga card berada di tengah
    marginBottom: 40,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 4,
    marginRight: 12,
  },
  bookTextContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#09173E",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  // Styling untuk kategori yang berada di bawah header dan di kanan
  categoriesWrapper: {
    position: "absolute",
    top: 120, // Posisi kategori tepat di bawah header
    right: 16, // Posisi kanan
    borderRadius: 20,
    backgroundColor: "#09173E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#fff",
  },
});
