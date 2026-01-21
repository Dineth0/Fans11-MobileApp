import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  label: string;
  selectedTeam: any;
  onPress: () => void;
}

const TeamSelectCard = ({ label, selectedTeam, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[43%] bg-slate-900 h-32 rounded-[30px] justify-center items-center border border-slate-800 shadow-sm"
    >
      {selectedTeam ? (
        <View className="items-center">
          <Text className="text-3xl mb-1">🏏</Text>
          <Text
            className="text-white font-bold text-center px-2"
            numberOfLines={2}
          >
            {selectedTeam.name}
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <View className="bg-slate-800 p-3 rounded-full mb-2">
            <Ionicons name="add" size={24} color="#9333ea" />
          </View>
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-tighter">
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TeamSelectCard;
