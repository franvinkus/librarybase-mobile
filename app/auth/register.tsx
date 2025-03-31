import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const Router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = false; // Menandakan bahwa halaman ini adalah Register

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.card}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={[styles.toggleButton, !isLogin ? styles.inactiveButton : styles.activeButton]} onPress={() => Router.push("/auth/login")}>
            <Text style={!isLogin ? styles.inactiveText : styles.activeText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleButton, isLogin ? styles.inactiveButton : styles.activeButton]}>
            <Text style={isLogin ? styles.inactiveText : styles.activeText}>Register</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Username / Email" placeholderTextColor="#888" value={identifier} onChangeText={setIdentifier} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Have an account?{" "}
          <Text style={styles.registerNow} onPress={() => Router.push("/auth/login")}>
            Log In Now
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000E36",
  },
  card: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2, // Border agar tetap terlihat meskipun tidak aktif
    borderColor: "#ffffff",
    shadowColor: "#000", // Shadow agar tombol tidak aktif tetap terlihat
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: "#0057FF",
    borderWidth : 0
  },
  inactiveButton: {
    backgroundColor: "#fff",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#0057FF",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#000E36",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerText: {
    marginTop: 15,
    color: "#000",
    fontSize: 14,
  },
  registerNow: {
    color: "#0057FF",
    fontWeight: "bold",
  },
});
