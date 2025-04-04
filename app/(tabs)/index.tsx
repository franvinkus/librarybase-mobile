import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const categories: string[] = ["All", "Fantasy", "Education", "Drama"];

  const [selectedBook, setSelectedBook] = useState<{
    bookId: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  const [books, setBooks] = useState<
    {
      bookId: number;
      title: string;
      author: string;
      categoryIds: number[];
      categoryNames: string[];
      description: string;
      createdAt: string;
      updatedAt: string;
      imageUrl: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
        const token = await AsyncStorage.getItem("authToken");

        const response = await axios.get(`${API_BASE_URL}/api/Books/Get-Books`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

        // Filter hanya buku yang `availabilityDate` kosong atau sama dengan tanggal hari ini
        const filteredBooks = response.data.filter((book: any) => !book.availabilityDate || book.availabilityDate.split("T")[0] === today);

        // Acak daftar buku dan ambil hanya 5 buku
        const shuffledBooks = [...filteredBooks]
          .sort(() => Math.random() - 0.5) // Acak urutan
          .slice(0, 5); // Ambil 5 data pertama

        setBooks(shuffledBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book: typeof selectedBook) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const openPopup = (book: any) => {
    setSelectedBook({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      description: book.description,
      imageUrl: book.imageUrl || "",
    });
    setIsPopupOpen(true);
  };

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory === "All" || book.categoryNames.includes(selectedCategory)) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()) || book.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#09173E" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search books..." value={searchQuery} onChangeText={setSearchQuery} clearButtonMode="while-editing" />
      </View>

      <Text style={styles.header}>Categories</Text>

      {/* Categories Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView} contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category} style={[styles.categoryItem, selectedCategory === category && styles.selectedCategory]} onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.divider} />

      {/* Books List */}
      {loading ? (
        <ActivityIndicator size="large" color="#09173E" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.booksContainer}>
          {filteredBooks.map((book, index) => (
            <View key={index} style={styles.bookCard}>
              <Image source={{ uri: book.imageUrl }} style={styles.bookImage} defaultSource={{ uri: "https://via.placeholder.com/150" }} />
              <View style={styles.bookTextContainer}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#09173E",
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
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  booksContainer: {
    flex: 1,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 90,
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
});
