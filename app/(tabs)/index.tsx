import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: string[] = ["All", "Fantasy", "Education", "Drama"];
  const books = [
    {
      title: "Title Book 1",
      author: "Author 1",
      description: "Descriptions for book 1",
      image: null,
    },
    {
      title: "Title Book 2",
      author: "Author 2",
      description: "Descriptions for book 2",
      image: null,
    },
    {
      title: "Title Book 3",
      author: "Author 3",
      description: "Descriptions for book 3",
      image: null,
    },
  ];

  const filteredBooks = books.filter(
    (book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()) || book.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <ScrollView style={styles.booksContainer}>
        {filteredBooks.map((book, index) => (
          <View key={index} style={styles.bookCard}>
            <Image source={book.image || { uri: "https://via.placeholder.com/150" }} style={styles.bookImage} defaultSource={{ uri: "https://via.placeholder.com/150" }} />
            <View style={styles.bookTextContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <Text style={styles.bookDescription}>{book.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
