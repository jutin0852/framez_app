import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { getImageSrc, uploadFile } from "@/services/imageService";
import { UpdateUserData } from "@/services/userServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export interface EditUser {
  name: string;
  bio: string;
  image: string | null;
  phoneNumber: string;
}

export default function EditProfile() {
  const [userData, setUserData] = useState<EditUser>({
    name: "",
    bio: "",
    image: null,
    phoneNumber: "",
  });
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const { user: currentUser, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateUser = async () => {
    setLoading(true);
    if (!userData.name.trim()) {
      setLoading(false);
      Alert.alert("Error", "Name is required");
      return;
    }
    let imageUrl = userData.image;

    if (selectedImage) {
      let imageRes = await uploadFile(selectedImage.uri, "profiles", true);
      if (imageRes.success && imageRes.filePath) {
        imageUrl = imageRes.filePath;
      } else {
        userData.image = null;
      }
    }
    console.log("Uploaded image URL:", imageUrl);

    const updatedData = {
      ...userData,
      image: imageUrl,
    };

    const res = await UpdateUserData(currentUser?.id, updatedData);
    setLoading(false);
    if (res.success) {
      setUser({ ...currentUser!, ...updatedData });
      router.back();
    }
  };
  console.log("userData:", userData?.image);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to your photos");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log(result);

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
        setUserData({ ...userData, image: result.assets[0].uri });
        console.log("Selected image:", result.assets[0]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userDetails: EditUser = {
        name: currentUser?.name ?? "",
        bio: currentUser?.bio ?? "",
        image: currentUser?.image ?? null,
        phoneNumber: currentUser?.phoneNumber ?? "",
      };
      setUserData(userDetails);
      setSelectedImage(null);
    }
  }, [currentUser]);
  console.log('selectedImage:', selectedImage);

  return (
    <ThemedView className="items-center">
      <View className="w-[90%] mx-auto">
        <View className="flex-row   relative mx-auto ">
          <Text className="font-bold text-lg text-center">
            {userData?.name}
          </Text>
        </View>
        <View className="flex-row justify-center mb-3 ">
          <Pressable onPress={pickImage}>
            <Image
              source={
                selectedImage ? {uri:selectedImage.uri} : getImageSrc(userData?.image)
              }
              className=" w-24 h-24 p-2 border border-black/10 rounded-full "
            />
            <Ionicons
              name="camera-outline"
              size={24}
              color="black"
              className="absolute"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            />
          </Pressable>
        </View>
        <View className="gap-4">
          <TextInput
            onChangeText={(value) => setUserData({ ...userData, name: value })}
            value={userData?.name ?? ""}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2 w-[90%] m-auto rounded-md "
          />
          <TextInput
            onChangeText={(value) =>
              setUserData({ ...userData, phoneNumber: value })
            }
            value={userData?.phoneNumber ?? ""}
            placeholder="Phone number"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2 w-[90%] m-auto rounded-md "
          />
          <TextInput
            onChangeText={(value) => setUserData({ ...userData, bio: value })}
            value={userData?.bio ?? ""}
            placeholder="bio"
            autoCapitalize={"none"}
            placeholderClassName="m-0"
            className="bg-[#FAFAFA] h-32 border-black/10 border py-4   px-2 w-[90%] m-auto rounded-md "
            multiline
            style={{ textAlignVertical: "top" }}
          />
          <View className="bg-[#3797EF] font-bold  rounded w-[90%] m-auto">
            <Button onPress={updateUser} disabled={loading}>
              <Text className="text-white font-bold text-center">
                {loading ? "Updating" : "Update"}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
