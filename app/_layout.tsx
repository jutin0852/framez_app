import "@/global.css";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter } from "expo-router";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { getUserData } from "@/services/userServices";
import { User } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavLayout() {
  // const colorScheme = useColorScheme();
  const { user, session, loading, setUser } = useAuth();
  const router = useRouter();
  const [loaded, error] = useFonts({
    "josefin-sans": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.replace("/(auth)/Login");
    } else {
      updateUserData(session.user);
      router.replace("/(tabs)");
    }
  }, []);

  const updateUserData = async (user: User) => {
    if (user) {
      const res = await getUserData(user?.id);
      if (res.success) {
        setUser(res.data);
      }
    }
  };
  // console.log("user", user);

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
