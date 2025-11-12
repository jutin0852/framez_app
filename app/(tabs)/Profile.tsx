import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";


export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Confirm", "Are you sure You want to logout", [
      {
        text: "cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
      { text: "Logout", onPress: () => signOut(), style: "destructive" },
    ]);
  };

  

  return (
    <ThemedView className="items-center">
      <View className="w-[90%] mx-auto">
        <View className="flex-row   relative mx-auto ">
          <View className=" flex-1">
            <Text className="font-bold text-lg text-center">{user?.name}</Text>
          </View>

          <Pressable
            onPress={handleLogout}
            className=" absolute right-0 "
            // style={{ position: "absolute", right: 0 }}
          >
            <Text className="text-red-600 font-bold">Sign out</Text>
          </Pressable>
        </View>
        <View className=" my-4">
          <Avatar
            uri={user?.image!}
            className="w-24 h-24 p-2 border border-black/10 mx-auto "
          />
        </View>
        <View>
          <Text className="font-bold">{user?.name}</Text>
          <Text className="my-1 mb-3">{user?.bio}</Text>
          <Pressable onPress={() => router.push("/EditProfile")}>
            <Text className="border font-bold border-[#3C3C43]/20 p-1.5 text-center rounded-sm">
              Edit Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}
