import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookPopup from "../Component/BookPopUp";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const fetchBooks = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.18.36:7055";
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
      const filteredBooks = response.data.filter((book: any) => book.availibility === "True" || !book.availabilityDate || book.availabilityDate.split("T")[0] === today);

      setBooks(filteredBooks);
      console.log("Final books to show after all filters:", filteredBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const uniqueCategories = ["ALL", ...new Set(books.flatMap((b: any) => b.categoryNames))];

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBooks();
    }, [])
  );

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

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "ALL" || book.categoryNames.some((name) => name.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()) || book.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
        {uniqueCategories.map((category) => (
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
            <View key={index}>
              <TouchableOpacity style={styles.bookCard} onPress={() => handleBookClick(book)}>
                <Image source={{ uri: book.imageUrl || "https://via.placeholder.com/150" }} style={styles.bookImage} />
                <View style={styles.bookTextContainer}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <Text style={styles.bookDescription}>{book.description}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {isPopupOpen && selectedBook && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: selectedBook.imageUrl || "https://via.placeholder.com/150" }} style={styles.popupImage} />
            </View>
            <Text style={styles.popupTitle}>{selectedBook.title}</Text>
            <Text style={styles.popupAuthor}>{selectedBook.author}</Text>
            <Text style={styles.popupDescription}>{selectedBook.description}</Text>
            {/* <TouchableOpacity onPress={handleBorrow} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Request Borrow</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setIsPopupOpen(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Book Popup Component */}
      <BookPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        book={selectedBook}
        onBorrowSuccess={fetchBooks}
        handlerBorrow={() => {
          Alert.alert("Borrow request sent!", `${selectedBook?.title}`);
        }}
      />
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
  bookTextContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },

  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  popupContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  popupAuthor: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },

  popupDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  closeButton: {
    backgroundColor: "#09173E",
    paddingVertical: 10,
    borderRadius: 8,
  },

  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  popupImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
