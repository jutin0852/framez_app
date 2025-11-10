import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert(
        "Success",
        "Account created! Please check your email to verify your account."
      );
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView>
      <View className="flex gap-7 mt-40 w-[90%] mx-auto">
        <Text className="m-auto font-bold">FLAMEZ</Text>
        <View>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2  rounded-md "
            editable={!loading}
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2  rounded-md"
            editable={!loading}
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
            autoCapitalize={"none"}
            className="bg-[#FAFAFA] border-black/10 border py-4 px-2  rounded-md"
            editable={!loading}
          />
        </View>

        <View className="bg-[#3797EF] font-bold  rounded ">
          <Button onPress={handleSignUp} disabled={loading}>
            <Text className="text-white font-bold text-center">
              {loading ? "Creating account..." : "Sign Up"}
            </Text>
          </Button>
        </View>

        <View className="m-auto flex-row gap-1">
          <Text className="text-[#000000]/40">Already have an account ?</Text>
          <Link className="text-[#3797EF]" href={"/Login"}>
            Sign Up
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}
