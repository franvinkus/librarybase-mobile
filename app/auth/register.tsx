import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = (): void => {
    console.log("Daftar dengan:", name, email, password);
    // Implementasi register (misalnya, panggil API Laravel)
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Register</ThemedText>

      <TextInput style={styles.input} placeholder="Nama" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Register" onPress={handleRegister} />

      <ThemedText onPress={() => router.push("/auth/login")} style={styles.link}>
        Sudah punya akun? Login di sini
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 20, paddingHorizontal: 8 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});
