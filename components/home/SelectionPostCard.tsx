import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/hooks/useLoader";
import { getUserData } from "@/services/authService";
import {
  addComments,
  deleteComment,
  getComments,
} from "@/services/commentService";
import { addReaction, getReactions } from "@/services/postService";
import { deleteMySelection11 } from "@/services/select11Service";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { CommentModel } from "./CommentModel";

interface Props {
  post: any;
  isHome: boolean;
  onDeleteSuccess?: (id: string) => void;
}

const SelectionPostCard = ({ post, isHome = true, onDeleteSuccess }: Props) => {
  const teamData = post.select11 || [];
  const teamName = post.countryName;
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();
  const { user } = useAuth();
  const [userReaction, setUserReaction] = useState<{
    likes: string[];
    dislikes: string[];
  }>({
    likes: [],
    dislikes: [],
  });

  const [isCommentModal, setIsCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<any[]>([]);

  const captain = teamData.find((p: any) => p.id === post.captainId);
  const wicketKeeper = teamData.find((p: any) =>
    p.role?.toLowerCase().includes("wicketkeeper"),
  );

  const formatedDate = (timestamp: any) => {
    if (!timestamp) {
      return "";
    }
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return formatDistanceToNowStrict(date)
      .replace(" seconds", "s")

      .replace(" minutes", "m")

      .replace(" hours", "h")

      .replace(" days", "d")
      .replace(" weeks", "w")
      .replace(" months", "mon")

      .replace(" years", "y");
  };

  useEffect(() => {
    if (!isHome) return;

    const loadData = getReactions(post.id, (data) => {
      setUserReaction(data);
    });
    return () => loadData();
  }, [post.id]);

  useEffect(() => {
    if (!isCommentModal) return;

    const loadComments = getComments(post.id, (commentData) => {
      setCommentList(commentData);
    });
    return () => loadComments();
  }, [post.id, isCommentModal]);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            showLoader();
            try {
              await deleteMySelection11(id);
              if (onDeleteSuccess) {
                onDeleteSuccess(id);
              }
            } catch {
              Alert.alert("Error", "Could not delete task");
            } finally {
              hideLoader();
            }
          },
        },
      ],
    );
  };

  const addReactions = async (type: "like" | "dislike") => {
    if (!user) {
      Alert.alert("Login Required", "Please login to react to this post");
      return;
    }

    try {
      await addReaction(post.id, user.uid, type);
    } catch (error) {
      console.error("Reaction error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleCommentSave = async () => {
    if (!comment.trim()) return;

    if (!user) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please Login First",
      });
      return;
    }

    showLoader();

    try {
      const userData = await getUserData(user.uid);
      const userImage = userData.image;
      await addComments(
        post.id,
        user?.uid as string,
        user?.displayName || "",
        userImage,
        comment,
      );
      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  const handleCommentDelete = async (id: string) => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteComment(id);
            } catch (error) {
              console.error(error);
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: "Delete faild",
              });
            }
          },
        },
      ],
    );
  };

  return (
    <View className="bg-zinc-900 mb-6 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl shadow-black/50 mx-4">
      <View className="flex-row items-center justify-between p-4 bg-zinc-800/30">
        <View className="flex-row items-center space-x-3">
          <View className="w-12 h-12 rounded-full bg-emerald-500/20 border  items-center justify-center overflow-hidden">
            {post.userImage ? (
              <Image
                source={{ uri: post.userImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-emerald-500 font-bold text-lg">
                {post.userName ? post.userName.charAt(0) : "?"}
              </Text>
            )}
          </View>
          <View className="">
            <Text className="text-white font-bold text-[12px] ml-2">
              {isHome ? post.userName || "Anonymous" : "Me"}
            </Text>
            <Text className="text-zinc-500 text-[10px] ml-2">
              {formatedDate(post.createdAt)}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">
            {post.tourName}
          </Text>
          <Text className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">
            {post.matchTitle}
          </Text>
          <View className="items-center justify-center py-1">
            <Text className="text-zinc-400 text-[12px] font-bold uppercase tracking-tighter">
              {teamName}
            </Text>
          </View>
        </View>
      </View>
      <View className="p-4">
        <View className="flex-row justify-between mb-4">
          <View className="bg-zinc-800 px-3 py-1 rounded-full">
            <Text className="text-zinc-400 text-[10px]">
              Captain:{" "}
              <Text className="text-white font-bold">{captain?.name}</Text>
            </Text>
          </View>
          <View className="bg-zinc-800 px-3 py-1 rounded-full">
            <Text className="text-zinc-400 text-[10px]">
              WK:{" "}
              <Text className="text-white font-bold">
                {wicketKeeper?.name || "N/A"}
              </Text>
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {teamData.map((player: any, index: number) => (
            <View
              key={index}
              className="w-[32%] mb-3 items-center bg-zinc-950/50 p-2 rounded-xl border border-zinc-800/50"
            >
              <View className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 items-center justify-center">
                <Image
                  source={{ uri: player.image }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text
                className="text-zinc-300 text-[12px] font-bold text-center"
                numberOfLines={1}
              >
                {player.name}
              </Text>
              {/* <Text className="text-[7px] text-emerald-500/70 font-bold mb-1 uppercase">
                {player.role}
              </Text> */}

              {player.id === post.captainId && (
                <View className="absolute -top-1 -right-1 bg-amber-500 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-[8px] text-black font-bold">C</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row justify-between items-center p-4 bg-zinc-950 border-t border-zinc-800">
        {isHome ? (
          <View className="flex-row justify-between  w-full">
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                className="flex-row items-center space-x-2 mr-4"
                onPress={() => addReactions("like")}
              >
                <Ionicons
                  name={
                    userReaction.likes.includes(user?.uid as string)
                      ? "heart"
                      : "heart-outline"
                  }
                  size={22}
                  color={
                    userReaction.likes.includes(user?.uid as string)
                      ? "#f43f5e"
                      : "#fff"
                  }
                />
              </TouchableOpacity>
              <Text className="text-zinc-300 text-[13px] font-bold mr-6">
                {userReaction.likes?.length || 0}
              </Text>

              <TouchableOpacity
                className="flex-row items-center space-x-2 mr-4"
                onPress={() => addReactions("dislike")}
              >
                <MaterialIcons
                  name={
                    userReaction.dislikes.includes(user?.uid as string)
                      ? "thumb-down"
                      : "thumb-down-off-alt"
                  }
                  size={24}
                  color={
                    userReaction.dislikes.includes(user?.uid as string)
                      ? "#fbbf24"
                      : "#fff"
                  }
                />
              </TouchableOpacity>
              <Text className="text-zinc-300 text-[13px] font-bold mr-6">
                {userReaction.dislikes?.length || 0}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsCommentModal(true)}
              className="ml-40"
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <Text className="text-zinc-300 text-[13px] font-bold">
              {commentList?.length || 0}
            </Text>
          </View>
        ) : (
          <View className="flex-row space-x-6">
            <TouchableOpacity
              className="flex-row items-center space-x-5 mr-3"
              onPress={() =>
                router.push({
                  pathname: "/playerSelectScreen",
                  params: {
                    edit: "true",
                    postId: post.id,
                    teamName: post.countryName,
                    matchTitle: post.matchTitle,
                    matchId: post.matchId,
                    tourName: post.tourName,
                  },
                })
              }
            >
              <Ionicons name="create-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center space-x-5"
              onPress={() => handleDelete(post.id)}
            >
              <Ionicons name="trash-bin" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <CommentModel
        visible={isCommentModal}
        onClose={() => setIsCommentModal(false)}
        onSave={handleCommentSave}
        setComment={setComment}
        comment={comment}
        commentsList={commentList}
        onDelete={handleCommentDelete}
        currentUserId={user?.uid}
      />
    </View>
  );
};

export default SelectionPostCard;
