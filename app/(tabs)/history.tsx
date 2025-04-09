import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Komponen utama
export default function HistoryScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Router = useRouter();
  const navigation = useNavigation();

  type Book = {
    bookId: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    status: string;
  };

  type BorrowedBook = {
    bookId: string;
    borrowDate: string;
    status: string;
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  useEffect(() => {
    if (!AsyncStorage.getItem("authToken")) {
      Router.push("/auth/login");
    }

    const fetchBooks = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.18.36:7055";
        const token = AsyncStorage.getItem("authToken");

        if (!token) throw new Error("User session expired! Please login again.");

        // Fetch all books
        const booksResponse = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(booksResponse.data);

        // Fetch borrowed books
        const borrowedResponse = await axios.get(`${API_BASE_URL}/api/Borrow/See-All-Borrow`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(booksResponse.data);
        setBorrowedBooks(borrowedResponse.data);
        const books = booksResponse.data;
        const borrows = borrowedResponse.data;

        // Opsional: Gabungkan data buku + status pinjam
        const merged = books
          .filter((book: any) => borrows.some((borrow: any) => borrow.bookId === book.bookId)) // hanya buku yang dipinjam
          .map((book: any) => {
            const relatedBorrow = borrows.find((borrow: any) => borrow.bookId === book.bookId);

            let status;

            if (relatedBorrow) {
              if (relatedBorrow.status.toLowerCase() === "pending") {
                status = "pending";
              } else if (relatedBorrow.status.toLowerCase() === "borrowed") {
                status = "borrowed";
              } else if (relatedBorrow.status.toLowerCase() === "returned") {
                status = "returned";
              }
            }

            return {
              ...book,
              status,
            };
          });

        setBooks(merged);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getBookDetailsFromCache = (bookId: string): Book | null => {
    return books.find((book) => book.bookId === bookId) || null;
  };

  // Warna status peminjaman
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "returned":
        return "green";
      case "borrowed":
        return "orange";
      case "pending":
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
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
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
