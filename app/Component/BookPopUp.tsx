import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  book: {
    bookId: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  } | null;
  handlerBorrow?: () => void;
};

export default function BookPopup({ isOpen, onClose, book }: BookPopupProps) {
  if (!isOpen || !book) return null;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const handleBorrow = async () => {
    try {
      setLoading(true);
      setError("");

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.18.36:7055";
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        setError("User session expired! Please login again.");
        setLoading(false);
        return;
      }

      const bookingId = book.bookId;
      console.log("Book ID:", bookingId);
      console.log("JWT Token:", token);

      // Panggil API dengan token di dalam headers
      const response = await axios.post(
        `${API_BASE_URL}/api/Borrow/${bookingId}/Request-Borrow`,
        {}, // Jika tidak ada body, pastikan ini dikirim sebagai object kosong
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan format benar
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Good job!", "Request Borrow Book Succeeded", [
          {
            text: "OK",
            onPress: () => {
              onClose();
              handleBorrow?.();
              router.push("/(tabs)/profile"); 
            },
          },
        ]);
      }
    } catch (err: any) {
      console.error("Error:", err.response);
      setError(err.response?.data?.message || "Failed to borrow book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.popupOverlay}>
      <View style={styles.popupContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: book.imageUrl || "https://via.placeholder.com/150" }} style={styles.popupImage} />
        </View>
        <Text style={styles.popupTitle}>{book.title}</Text>
        <Text style={styles.popupAuthor}>{book.author}</Text>
        <Text style={styles.popupDescription}>{book.description}</Text>
        <TouchableOpacity onPress={handleBorrow} style={styles.borrowButton}>
          <Text style={styles.borrowButtonText}>Request Borrow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  borrowButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
  },

  borrowButtonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
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
