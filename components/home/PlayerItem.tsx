import { Player } from "@/types/player";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PlayerItemProps {
  player: Player;
  isSelected: boolean;
  onPress: () => void;
  width: number;
}

export const PlayerItem = ({
  player,
  isSelected,
  onPress,
  width,
}: PlayerItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: width - 20 }}
      className="items-center mb-8 mx-2"
      activeOpacity={0.7}
    >
      <View className="relative">
        {isSelected && (
          <View className="absolute -inset-2 bg-emerald-500/30 rounded-full blur-md" />
        )}

        <View
          className={`w-20 h-20 rounded-full border-2 p-1 ${
            isSelected
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-zinc-800 bg-zinc-900"
          }`}
        >
          <Image
            source={{ uri: player.image }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>

        {isSelected && (
          <View className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-zinc-950">
            <Ionicons name="checkmark-sharp" size={12} color="black" />
          </View>
        )}
      </View>

      <Text
        className={`mt-2 font-black text-[10px] text-center uppercase tracking-tighter ${
          isSelected ? "text-emerald-400" : "text-zinc-100"
        }`}
        numberOfLines={1}
      >
        {player.name}
      </Text>

      <Text className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">
        {player.role}
      </Text>
    </TouchableOpacity>
  );
};
