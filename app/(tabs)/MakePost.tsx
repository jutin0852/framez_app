import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ThemedButton";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseImageUrl } from "@/services/imageService";
import { updateOrCreatePost } from "@/services/postService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddPost() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [text, setText] = useState<string>("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    if (!text.trim() && !file) {
      Alert.alert("Error", "Post cannot be empty");
      return;
    }
    try {
      const data = { body: text, file, userId: user?.id };
      console.log("Post data to submit:", data);
      const res = await updateOrCreatePost(data);
      setLoading(false);
      if (res.success) {
        Alert.alert("Success", "Post created successfully");
        router.push("/(tabs)");
        console.log(res);
        setText("");
        setFile(null);
      } else {
        Alert.alert("Error", "Failed to create post");
      }
    } catch (error) {
      console.log("Error creating post:", error);
      Alert.alert("Error", "Failed to create post");
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to your photos");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log(result);

      if (!result.canceled && result.assets[0]) {
        setFile(result.assets[0]);
        console.log("Selected image:", result.assets[0]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };
  //  pickImage();

  const IsFileLocal = (file: any) => {
    if (!file) return null;
    if (typeof file === "object") return true;
    return false;
  };

  // const getFileType = (file: any) => {
  //   if (!file) return null;
  //   if (IsFileLocal(file)) {
  //     return file.type;
  //   }

  //   if (file.includes("postImages")) {
  //     return "image";
  //   }
  //   return "video";
  // };

  const getFileUri = (file: any) => {
    if (!file) return null;
    if (IsFileLocal(file)) {
      return file.uri;
    }
    return getSupabaseImageUrl(file);
  };
  const isDisabled = loading || (!text.trim() && !file);

  useEffect(() => {});
  return (
    <ThemedView className="items-center">
      <View className="w-[90%] flex-1">
        <View>
          <Text className="font-bold text-xl mx-auto">Create post</Text>
          <View className="flex-row my-4 gap-4">
            <Avatar
              uri={user?.image!}
              className="w-24 h-24 p-2 border border-black/10  "
            />
            <View className="self-center">
              <Text className="font-bold">{user?.name}</Text>
              <Text className="my-1 mb-3">public</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <TextInput
            onChangeText={(value) => setText(value)}
            value={text}
            placeholder="post"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] h-32 border-black/20 border py-4 px-2  rounded-xl "
            multiline
          />
          <Pressable
            className="rounded-xl p-4 mt-4 border border-black/20 flex-row justify-between"
            onPress={pickImage}
          >
            <Text className="">Add to your Post</Text>
            <Ionicons name="image-outline" size={24} color="black" />
          </Pressable>
          {file && (
            <View className="relative" style={{ position: "relative" }}>
              <Image
                source={{ uri: getFileUri(file) }}
                resizeMode="cover"
                className="flex-1 w-full h-64 mt-4 rounded-xl"
              />
              <Pressable
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() => setFile(null)}
              >
                <FontAwesome
                  name="trash-o"
                  size={27}
                  color="white"
                  className="p-5"
                />
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
      <View className="bg-[#3797EF] font-bold  rounded-xl w-[90%] m-auto mb-6 ">
        <Button onPress={handleSubmit} disabled={isDisabled}>
          <Text className="text-white font-bold text-center ">
            {loading ? "Posting" : "Share Post"}
          </Text>
        </Button>
      </View>
    </ThemedView>
  );
}
