import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Country } from "../../types/country";

interface Props {
  match: {
    id: string;
    tourName: string;
    title: string;
    venue: string;
    date: string;
    teamA: Country;
    teamB: Country;
  };
  onSelectTeam: (
    matchId: string,
    team: "A" | "B",
    teamData: Country,
    matchTitle: string,
    tourName: string,
  ) => void;
}

const UserSideMatchShowCard = ({ match, onSelectTeam }: Props) => {
  const matchDate = new Date(match.date);
  const time = matchDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateShort = matchDate.toLocaleDateString("default", {
    day: "numeric",
    month: "short",
  });

  return (
    <View className="mb-10 mx-1">
      <View className="bg-zinc-900/90 rounded-[40px] border border-zinc-800 shadow-2xl overflow-hidden shadow-emerald-900/20">
        <View className="h-1 w-full bg-emerald-500/30" />

        <View className="flex-row justify-between items-center px-6 pt-6">
          <View className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Text className="text-emerald-500 font-bold text-[9px] uppercase tracking-widest">
              {match.tourName}
            </Text>
          </View>
          <View className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Text className="text-emerald-500 font-bold text-[9px] uppercase tracking-widest">
              {match.title}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-zinc-100 font-black text-xs uppercase">
              {dateShort}
            </Text>
            <Text className="text-zinc-500 text-[10px] font-bold">{time}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-around py-8 px-2">
          <TouchableOpacity
            onPress={() =>
              onSelectTeam(
                match.id,
                "A",
                match.teamA,

                match.title,
                match.tourName,
              )
            }
            className="items-center flex-1"
          >
            <View className="relative">
              <View className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md" />
              <View className="w-20 h-20 rounded-full border-2 border-emerald-500/40 p-1.5 bg-zinc-950 shadow-inner">
                <Image
                  source={{ uri: match.teamA.flag }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-zinc-100 font-black text-[13px] mt-3 uppercase tracking-tighter numberOfLines={1}">
              {match.teamA.name}
            </Text>
            <Text className="text-emerald-500/70 text-[8px] font-bold mt-1 tracking-widest">
              TAP TO PICK
            </Text>
          </TouchableOpacity>

          <View className="items-center px-2">
            <View className="w-10 h-10 bg-zinc-950 rounded-2xl border border-zinc-700 rotate-45 items-center justify-center shadow-lg">
              <Text className="text-amber-500 font-black text-xs -rotate-45 italic">
                VS
              </Text>
            </View>
            <View className="h-12 w-[1px] bg-zinc-800 my-2" />
          </View>

          <TouchableOpacity
            onPress={() =>
              onSelectTeam(
                match.id,
                "B",
                match.teamB,

                match.title,
                match.tourName,
              )
            }
            className="items-center flex-1"
          >
            <View className="relative">
              <View className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md" />
              <View className="w-20 h-20 rounded-full border-2 border-emerald-500/40 p-1.5 bg-zinc-950 shadow-inner">
                <Image
                  source={{ uri: match.teamB.flag }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-zinc-100 font-black text-[13px] mt-3 uppercase tracking-tighter numberOfLines={1}">
              {match.teamB.name}
            </Text>
            <Text className="text-emerald-500/70 text-[8px] font-bold mt-1 tracking-widest">
              TAP TO PICK
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-zinc-950/50 py-4 px-6 border-t border-zinc-800/50 flex-row items-center justify-center">
          <MaterialIcons name="stadium" size={14} color="#71717a" />
          <Text className="text-zinc-500 text-[10px] font-bold ml-2 uppercase tracking-tight">
            {match.venue}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserSideMatchShowCard;
