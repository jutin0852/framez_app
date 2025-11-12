import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { deletePost, fetchPost } from "@/services/postService";
import { getUserData } from "@/services/userServices";
import { Posts } from "@/types/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { Post } from ".";

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

  const [posts, setPosts] = useState<Posts[] | null>(null);

  const getPost = async () => {
    console.log(user?.id);
    const res = await fetchPost(10, user?.id);
    if (res.success && res.data) {
      setPosts(res.data);
    }
  };
  const newPostPayload = async (payload: any) => {
    console.log("payload", payload.eventType);
    if (payload.eventType === "INSERT" && payload?.new?.id) {
      let newPost = { ...payload.new };
      const res = await getUserData(newPost.userId);
      newPost.user = res.data;
      setPosts((prevPosts) => [newPost, ...(prevPosts || [])]);
    }

    if (payload.eventType === "DELETE") {
      console.log(payload.old.id);
      setPosts((prevPosts) => {
        if (!prevPosts) return null;
        return prevPosts.filter((post) => post.id !== payload.old.id);
      });
    }
  };

  useEffect(() => {
    const res = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        newPostPayload
      )
      .subscribe();

    getPost();
    return () => {
      supabase.removeChannel(res);
    };
  }, []);

  const ondelete = (id: string) => {
    Alert.alert("Delete post", "Are you sure?", [
      { text: "Delete", onPress: () => deletePost(id) },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("cancelled"),
      },
    ]);
  };

  return (
    <ThemedView className="gap-6">
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
            uri={user?.image ?? null}
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
      <View>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post item={item} ondelete={ondelete} />}
          ListFooterComponent={
            <View style={{ marginVertical: posts?.length === 0 ? 300 : 20 }}>
              <Text className="text-center">{posts?.length ===0  ?"You Dont have any posts":"Loading..."}</Text>
            </View>
          }
        />
      </View>
    </ThemedView>
  );
}
