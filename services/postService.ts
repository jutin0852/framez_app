import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "./imageService";

export const updateOrCreatePost = async (data: {
  body: string;
  file: ImagePicker.ImagePickerAsset | string | null;
  userId: string | undefined;
}) => {
  //
  try {
    if (data.file && typeof data.file === "object") {
      const isImage = data.file.type === "image";
      const folderName = isImage ? "postImages" : "postVideos";
      let imageRes = await uploadFile(data.file.uri, folderName, isImage);
      if (imageRes.success && imageRes.filePath) {
        data.file = imageRes.filePath;
      } else {
        return imageRes;
      }
    }

    const { data: postData, error } = await supabase
      .from("posts")
      .upsert(data)
      .select()
      .single();
    if (error) {
      console.log("Error in upsert post:", error);
      return { success: false, error: error.message };
    }
    return { success: true, data: postData };
  } catch (error) {
    console.log("Error in updateOrCreatePost:", error);
    return { success: false, error: "Failed to create or update post" };
  }
};

export const fetchPost = async (limit = 10, userId?: string) => {
  try {
    if (userId) {
      const { data: posts, error } = await supabase
        .from("posts")
        .select("* , user:users(id,name,image)")
        .order("created_at", { ascending: false })
        .eq("userId", userId)
        .limit(limit);
      if (error) {
        console.log("Error in fetching post:", error);
        return { success: false, error: error.message };
      } else {
        return { success: true, data: posts };
      }
    } else {
      const { data: posts, error } = await supabase
        .from("posts")
        .select("* , user:users(id,name,image)")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) {
        console.log("Error in fetching post:", error);
        return { success: false, error: error.message };
      } else {
        return { success: true, data: posts };
      }
    }
  } catch (error) {
    console.log("Error in fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
};

export const deletePost = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .select();
    if (error) {
      console.log("Error deleting post:", error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
};
