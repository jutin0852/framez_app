import { supabase } from "@/lib/supabase";

export const getUserData = async (userId: string | undefined) => {
  try {
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }
    const { data, error } = await supabase
      .from("users")
      .select('*')
      .eq("id", userId)
      .maybeSingle();
    if (error) return { success: false, error: error.message };
    if (!data) return { success: false, error: "User not found" };

    return { success: true, data };
  } catch (error: any) {
    console.log("got an error", error);
    return { success: false, error: error.message };
  }
};
