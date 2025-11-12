import Avatar from "@/components/ui/Avatar";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

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
            <Avatar uri={user?.image!} className="h-8 w-8" />
          ),
        }}
      />
    </Tabs>
  );
}
