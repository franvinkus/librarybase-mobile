import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const Router = useRouter();

  const [userName, setUserName] = useState("");

  // Load userName from AsyncStorage saat komponen pertama kali dimount
  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }
    };
    fetchUserName();
  }, []);

  // await AsyncStorage.setItem("authToken", token);
  // await AsyncStorage.setItem("userId", userId.toString());
  // await AsyncStorage.setItem("userName", userName);
  // await AsyncStorage.setItem("userRole", msg.includes("Admin") ? "Admin" : "User");

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // this clears all key-value pairs
      console.log("Storage cleared!");
      Router.push("/auth/login");
    } catch (e) {
      console.error("Failed to clear AsyncStorage:", e);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header dengan Avatar dan Nama */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/profile.png")} style={styles.avatar} />
        <Text style={styles.name}>{userName}</Text>
      </View>

      {/* Informasi Username */}
      <View style={styles.infoContainer}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Email </Text>
          <Text style={styles.email}></Text>
        </View>
      </View>

      {/* Spacer untuk mendorong tombol logout ke bawah */}
      <View style={{ flex: 1 }} />

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0D1B2A",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D3D3D3",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "gray",
    fontStyle: "italic",
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#E63946",
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
