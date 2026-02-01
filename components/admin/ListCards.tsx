import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Player {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const PlayerCard = ({
  player,
  onEdit,
}: {
  player: Player;
  onEdit: () => void;
}) => {
  return (
    <View className="bg-slate-900 mx-4 mb-3 p-4 rounded-3xl border border-slate-800 flex-row items-center">
      <View className="w-12 h-12 bg-slate-800 rounded-2xl overflow-hidden items-center justify-center">
        {player.image ? (
          <Image source={{ uri: player.image }} className="w-full h-full" />
        ) : (
          <MaterialIcons name="person" size={28} color="#475569" />
        )}
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-lg">{player.name}</Text>
        <Text className="text-purple-400 text-xs font-bold uppercase">
          {player.role}
        </Text>
      </View>
      <TouchableOpacity
        className="flex-row items-center space-x-5 mr-3"
        onPress={onEdit}
      >
        <Ionicons name="create-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
export const CountryCard = ({ country }: { country: any }) => (
  <View className="bg-slate-900/40 mb-3 p-4 rounded-2xl flex-row justify-between items-center border border-slate-800">
    <View className="flex-row items-center">
      <View className="w-10 h-7 bg-slate-800 rounded mr-3 overflow-hidden">
        {country.flag && (
          <Image source={{ uri: country.flag }} className="w-full h-full" />
        )}
      </View>
      <Text className="text-white text-lg font-medium">{country.name}</Text>
    </View>
    <TouchableOpacity>
      <MaterialIcons name="delete-outline" size={22} color="#f87171" />
    </TouchableOpacity>
  </View>
);
