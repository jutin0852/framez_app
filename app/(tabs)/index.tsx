import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Feed() {
  const { user } = useAuth();
  console.log(user);

  return (
    <ThemedView>
      <View>
        <Text
          style={{ fontFamily: "josefin-sans" }}
          className="m-auto w-[90%] py-4"
        >
          FRAMEZ
        </Text>

        <View>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable></Pressable>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
        ]}
        renderItem={({ item }) => <Post />}
      />
      <Post />
      <Post />
    </ThemedView>
  );
}

const Post = () => {
  const { user } = useAuth();

  return (
    <View>
      <View className="flex-row p-4 gap-3 border-t border-black/20 ">
        <Avatar uri={user?.image!} />
        <Text className="font-bold self-center">Jutin</Text>
      </View>
      <View>
        <Image
          source={require("../../assets/images/post.png")}
          className="w-full h-[375px] "
        />
        <View className="flex-row p-4">
          <SimpleExpandableText text="Many of the images you will display in your app will not be available at compile time, or you will want to load some dynamically to keep the binary size down." />
        </View>
      </View>
    </View>
  );
};
interface SimpleExpandableTextProps {
  text: string;
  maxLength?: number;
  style?: any;
  expandTextStyle?: any;
}

function SimpleExpandableText({
  text,
  maxLength = 150,
  style,
  expandTextStyle,
}: SimpleExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const shouldTruncate = text.length > maxLength;
  const displayText =
    expanded || !shouldTruncate ? text : text.slice(0, maxLength);

  return (
    <View>
      <Text style={style}>
        <Text className="font-bold">Jutin </Text>
        {displayText}

        <Text> {!expanded && shouldTruncate && "..."} </Text>
      </Text>

      {shouldTruncate && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text className="text-blue-500">
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
      <Text className="font-semibold text-neutral-700">19 May</Text>
    </View>
  );
}
