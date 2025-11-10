import "@/global.css";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter } from "expo-router";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavLayout() {
  // const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loaded, error] = useFonts({
    "josefin-sans": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/(auth)/Login");
    } else {
      router.replace("/(tabs)");
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  return (
    <>
      <Slot />
      <StatusBar />
    </>
  );
}

// return (
//   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//     <Stack>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen
//         name="modal"
//         options={{ presentation: "modal", title: "Modal" }}
//       />
//     </Stack>
//     {/* <StatusBar style="auto" /> */}
//   </ThemeProvider>
// );

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavLayout />
    </AuthProvider>
  );
}
