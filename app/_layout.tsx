import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
  Home: undefined;
  BookDetail: { book: Book }; // Make sure the book type is defined properly
};

type Book = {
  title: string;
  author: string;
  description: string;
  image: string | null;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  const currentTheme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  return (
    <ThemeProvider value={currentTheme}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        {/* Using component properly */}
        <Stack.Screen name="bookdetail" />
      </Stack>
    </ThemeProvider>
  );
}
