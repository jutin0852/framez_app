import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Pressable, Text } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <ThemedView>
      <Text>Profile</Text>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </ThemedView>
  );
}
