import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={31}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MakePost"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square-o" size={31} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Image
              source={{ uri: "https://avatar.iran.liara.run/public/boy" }}
              className="w-8 h-8 rounded-full"
              alt="avatar"
            />
          ),
        }}
      />
    </Tabs>
  );
}
