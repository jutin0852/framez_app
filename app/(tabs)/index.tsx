import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getImageSrc } from "@/services/imageService";
import { deletePost, fetchPost } from "@/services/postService";
import { getUserData } from "@/services/userServices";
import { Posts } from "@/types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Posts[] | null>(null);

  const getPost = async () => {
    const res = await fetchPost();
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
    <ThemedView>
      <View>
        <Text
          style={{ fontFamily: "josefin-sans" }}
          className="m-auto text-center w-[90%] py-4"
        >
          FRAMEZ
        </Text>
      </View>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post item={item} ondelete={ondelete} />}
        ListFooterComponent={
          <View style={{ marginVertical: posts?.length === 0 ? 300 : 20 }}>
            <Text className="text-center">Loading...</Text>
          </View>
        }
      />
    </ThemedView>
  );
}

export const Post = ({
  item,
  ondelete,
}: {
  item: Posts;
  ondelete: (id: string) => void;
}) => {
  const shadowStyle = {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };
  const createdAt = moment(item.created_at).format(" MMM D");
  const { user } = useAuth();

  if (item.file) {
    return (
      <View
        style={[{ borderRadius: 30, marginBottom: 10 }, shadowStyle]}
        className=" border-black/20 gap-4  border mx-auto w-[90%]"
      >
        <View className="flex-row justify-between">
          <View className="flex-row p-4 gap-3 rounded-lg ">
            <Avatar uri={item?.user?.image!} />
            <View>
              <Text className="font-bold ">{item.user.name}</Text>
              <Text className="font-semibold text-neutral-700">
                {createdAt}
              </Text>
            </View>
          </View>
          <Pressable onPress={() => ondelete(item?.id)}>
            {user?.id === item.user.id && (
              <FontAwesome
                name="trash-o"
                size={27}
                color="black"
                className="self-center p-5"
              />
            )}
          </Pressable>
        </View>

        <View>
          <Image
            source={getImageSrc(item.file)}
            className="w-full h-[375px] "
          />
          <View className="flex-row p-4">
            <SimpleExpandableText
              file={true}
              maxLength={300}
              text={item.body}
              user={item.user.name}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View
      className="border rounded-2xl p-t border-black/20 gap-4 p-3 mx-auto w-[90%] "
      style={[{ borderRadius: 30, marginBottom: 10 }, shadowStyle]}
    >
      <View className="flex-row justify-between">
        <View className="flex-row  gap-3 rounded-lg ">
          <Avatar uri={item?.user?.image!} />
          <View>
            <Text className="font-bold ">{item.user.name}</Text>
            <Text className="font-semibold text-neutral-700">{createdAt}</Text>
          </View>
        </View>
        <Pressable onPress={() => ondelete(item.id)}>
          {user?.id === item.user.id && (
            <FontAwesome
              name="trash-o"
              size={27}
              color="black"
              className="self-center p-5"
            />
          )}
        </Pressable>
      </View>
      <View className="flex-row ">
        <SimpleExpandableText maxLength={300} text={item.body} />
      </View>
    </View>
  );
};

interface SimpleExpandableTextProps {
  text: string;
  maxLength?: number;
  style?: any;
  expandTextStyle?: any;
  file?: boolean;
  user?: string;
}

function SimpleExpandableText({
  text,
  maxLength = 150,
  style,
  expandTextStyle,
  file,
  user,
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
        {file && <Text className="font-bold">{user}</Text>}
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
    </View>
  );
}
