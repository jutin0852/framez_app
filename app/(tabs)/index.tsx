import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Feed() {
  return (
    <ThemedView>
      <View>
        <Text style={{fontFamily:'josefin-sans'}} className="m-auto py-4">FRAMEZ</Text>
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
  return (
    <View>
      
      <View className="flex-row p-4 gap-3 border-t border-black/20 ">
        <Image
          source={{ uri: "https://avatar.iran.liara.run/public/boy" }}
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
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
