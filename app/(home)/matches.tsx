import UserSideMatchShowCard from "@/components/home/UserSideMatchShowCard";
import { useLoader } from "@/hooks/useLoader";
import { getAllMatches } from "@/services/matchService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Matches = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        showLoader();
        const data = await getAllMatches();
        setMatches(data);
      } catch (error) {
        console.error(error);
      } finally {
        hideLoader();
      }
    };
    fetchMatches();
  }, []);

  const handleSelectTeam = (
    matchId: string,
    teamSide: "A" | "B",
    teamData: any,
  ) => {
    console.log(teamData.name);
    router.push({
      pathname: "/playerSelectScreen",
      params: {
        matchId: matchId,
        teamName: teamData.name,
        teamSide: teamSide,
      },
    });
  };

  return (
    <View className="flex-1 bg-[#050505]">
      <StatusBar barStyle="light-content" />

      <View className="absolute top-0 left-0 right-0 h-64 bg-emerald-600/5 blur-[100px] rounded-full" />

      <SafeAreaView className="flex-1">
        <View className="px-8 pt-4 pb-8">
          <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-[5px] mb-1">
            Fans11
          </Text>

          <View className="flex-row items-baseline">
            <Text className="text-white text-4xl font-black italic tracking-tighter">
              BATTLE<Text className="text-emerald-500">GROUND</Text>
            </Text>
          </View>
          <View className="h-1 w-12 bg-emerald-500 rounded-full mt-2" />
        </View>

        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserSideMatchShowCard
              match={item}
              onSelectTeam={handleSelectTeam}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="mt-20 items-center">
              <Text className="text-zinc-600 font-bold">No Matches</Text>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default Matches;
