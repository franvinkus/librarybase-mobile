import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header dengan Avatar dan Nama */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/profile.png")} // Pastikan file ada di /assets
          style={styles.avatar}
        />
        <Text style={styles.name}>Budi Siregar</Text>
      </View>

      {/* Informasi Username */}
      <View style={styles.infoContainer}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.email}>Budi123@gmail.com</Text>
        </View>
      </View>
    </View>
  );
}

// Konfigurasi Bottom Tabs

// ** Styles **
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
});
