import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

// Data dummy
const books = [
  {
    id: "1",
    title: "Book Lovers",
    author: "Emily Henry",
    image: require("../../assets/images/img.png"), // Gambar dari assets
    description: "Nora Stephens’ life is books—she’s read them all—and she is not that type of heroine...",
    status: "Returned",
  },
  {
    id: "2",
    title: "Book Lovers",
    author: "Emily Henry",
    image: require("../../assets/images/img.png"),
    description: "Nora Stephens’ life is books—she’s read them all—and she is not that type of heroine...",
    status: "Borrowed",
  },
  {
    id: "3",
    title: "Book Lovers",
    author: "Emily Henry",
    image: require("../../assets/images/img.png"),
    description: "Nora Stephens’ life is books—she’s read them all—and she is not that type of heroine...",
    status: "Pending",
  },
];

// Komponen utama
export default function HistoryScreen() {
  const navigation = useNavigation();

  // Warna status peminjaman
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Returned":
        return "green";
      case "Borrowed":
        return "orange";
      case "Pending":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>History</Text>
      </View>

      {/* List Buku */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.bookImage} />
            <View style={styles.bookInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>Author: {item.author}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
