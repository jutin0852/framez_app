import { supaBaseUrl } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

export const getImageSrc = (imgscr: string | null) => {
  if (imgscr) {
    return { uri: getSupabaseImageUrl(imgscr) };
  } else {
    return require("../assets/images/user.png");
  }
};

const getSupabaseImageUrl = (path: string) => {
  if (!path) return null;
  return `${supaBaseUrl}/storage/v1/object/public/uploads/${path}`;
};
export const uploadFile = async (
  FileUri: string,
  folderName: string,
  isImage = true
) => {
  try {
    const fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(FileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let imageData = decode(fileBase64);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: isImage ? "image/*" : "video/*",
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("File upload error: ", error);
      return { success: false, msg: "File upload failed" };
    }
    console.log("File uploaded successfully: ", data);
    return { success: true, filePath: data.path };
  } catch (error) {
    console.log("File upload error: ", error);
    return { success: false, msg: "File upload failed" };
  }
};

const getFilePath = (folderName: string, isImage: boolean) => {
  return `${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};
