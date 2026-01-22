import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface Country {
  name: string;
  flag: string;
}

interface MatchShowCardProps {
  match: {
    title: string;
    venue: string;
    date: string;
    teamA: Country;
    teamB: Country;
  };
}

const MatchShowCard = ({ match }: MatchShowCardProps) => {
  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString();
  const formattedTime = matchDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="bg-slate-900 mb-4 p-5 rounded-[30px] border border-slate-800 shadow-lg">
      <View className="mb-4 ml-1">
        <Text className="text-purple-500 font-black text-[10px] uppercase tracking-[3px]">
          {match.title}
        </Text>
      </View>

      <View className="bg-slate-800/40 p-5 rounded-[30px]">
        {/* Flag and VS Row - Everything aligned in one horizontal line */}
        <View className="flex-row justify-between items-center mb-4">
          {/* Team A Flag */}
          <View className="flex-1 items-center">
            <Image
              source={{ uri: match.teamA.flag }}
              className="w-14 h-10 rounded-lg"
              resizeMode="cover"
            />
          </View>

          {/* VS Badge in Middle */}
          <View className="bg-red-600 w-8 h-8 rounded-full justify-center items-center border-4 border-slate-900 shadow-sm mx-2">
            <Text className="text-white font-black text-[9px]">VS</Text>
          </View>

          {/* Team B Flag */}
          <View className="flex-1 items-center">
            <Image
              source={{ uri: match.teamB.flag }}
              className="w-14 h-10 rounded-lg"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text
              className="text-white font-bold text-center ml-12 text-xs"
              numberOfLines={1}
            >
              {match.teamA.name}
            </Text>
          </View>

          <View className="flex-[1.5] items-center">
            <Text className="text-white font-black text-[10px] tracking-tighter">
              {formattedDate}
            </Text>
            <Text className="text-slate-500 font-bold text-[9px] mb-1">
              {formattedTime}
            </Text>

            <View className="flex-row items-center bg-slate-900/50 px-3 py-1 rounded-full">
              <Ionicons name="location" size={10} color="#94a3b8" />
              <Text
                className="text-gray-400 text-[9px] ml-1 font-medium"
                numberOfLines={1}
              >
                {match.venue}
              </Text>
            </View>
          </View>

          <View className="flex-1">
            <Text
              className="text-white font-bold text-center mr-8 text-xs"
              numberOfLines={1}
            >
              {match.teamB.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MatchShowCard;
