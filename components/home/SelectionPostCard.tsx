import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const SelectionPostCard = ({ post }: { post: any }) => {
  const teamData = post.select11 || [];
  const teamName = post.countryName;

  const captain = teamData.find((p: any) => p.id === post.captainId);
  const wicketKeeper = teamData.find((p: any) =>
    p.role?.toLowerCase().includes("wicketkeeper"),
  );

  return (
    <View className="bg-zinc-900 mb-6 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl shadow-black/50 mx-4">
      <View className="flex-row items-center justify-between p-4 bg-zinc-800/30">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 items-center justify-center">
            <Text className="text-emerald-500 font-bold text-lg">
              {post.userName ? post.userName.charAt(0) : "?"}
            </Text>
          </View>
          <View className="">
            <Text className="text-zinc-500 text-[10px]">{post.createdAt}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">
            {post.matchTitle}
          </Text>
          <Text className="text-zinc-400 text-[9px] font-bold">{teamName}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between mb-4">
          <View className="bg-zinc-800 px-3 py-1 rounded-full">
            <Text className="text-zinc-400 text-[10px]">
              Captain:{" "}
              <Text className="text-white font-bold">
                {captain?.name || "N/A"}
              </Text>
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
              <Text className="text-[9px] text-emerald-500/70 font-bold mb-1 uppercase">
                {player.role}
              </Text>
              <Text
                className="text-zinc-300 text-[11px] font-bold text-center"
                numberOfLines={1}
              >
                {player.name}
              </Text>
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
        <View className="flex-row space-x-6">
          <TouchableOpacity className="flex-row items-center space-x-2">
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Text className="text-zinc-400 text-xs">Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectionPostCard;
