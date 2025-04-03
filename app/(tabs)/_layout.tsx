import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BookText, UsersRound } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Pilih warna berdasarkan tema (dark/light mode)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: {
          backgroundColor: "white", // Ubah background tab bar menjadi putih
          borderTopWidth: 0, // Opsional: hilangkan garis atas
          position: Platform.OS === "ios" ? "absolute" : "relative",
          elevation: 5, // Efek bayangan untuk Android
          shadowOpacity: 0.1, // Efek bayangan untuk iOS
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <BookText size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <UsersRound size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
