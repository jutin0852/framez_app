import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ThemedButton";
import { useAuth } from "@/context/AuthContext";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email.trim(), password.trim());
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView className="bg-[#F2F2F2] flex-1 flex ">
      <View className="flex gap-7 mt-40">
        <Text className="m-auto font-bold">FLAMEZ</Text>
        <View>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2 w-[90%] m-auto rounded-md "
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2 w-[90%] m-auto rounded-md"
          />
        </View>
        <View className="bg-[#3797EF] font-bold  rounded w-[90%] m-auto">
          <Button onPress={handleLogin} disabled={loading}>
            <Text className="text-white font-bold text-center">
              {loading ? "Logging in" : "Log in"}
            </Text>
          </Button>
        </View>

        {/* <View className="gap-2 flex-row m-auto">
          <Ionicons name="logo-google" size={24} color="#3797EF" />
          <Text className="text-[#3797EF] self-center font-bold ">
            Login with Google
          </Text>
        </View> */}

        <View className="flex-row m-auto gap-6 px-10">
          <View className="border-t h-0 self-center inline-block flex-1 border-black/20"></View>
          <Text className="text-black/40 font-semibold">OR</Text>
          <View className="border-t inline-block self-center flex-1 border-black/20"></View>
        </View>

        <View className="m-auto flex-row gap-1">
          <Text className="text-[#000000]/40">
            Don&apos;t have an account ?
          </Text>
          <Link className="text-[#3797EF]" href={"/SignUp"}>
            Sign Up
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}
