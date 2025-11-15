import "@/global.css";
import { SplashScreen, Stack, useRouter } from "expo-router";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userServices";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavLayout() {
  // const colorScheme = useColorScheme();
  const { setSession, setUser } = useAuth();
  const router = useRouter();
  const [loaded, error] = useFonts({
    "josefin-sans": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session ?? null);
    //   setloading(false);
    // });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        updateUserData(session.user);
        console.log("session",session);

        router.replace("/(tabs)/Home");
      } else {
        setSession(null);
        router.replace("/(auth)/Login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateUserData = async (user: any) => {
    if (user) {
      const res = await getUserData(user?.id);
      if (res.success) {
        setUser(res.data);
      }
    }
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
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
