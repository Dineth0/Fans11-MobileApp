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
    matchTitle: string,
  ) => {
    console.log(teamData.name);
    router.push({
      pathname: "/playerSelectScreen",
      params: {
        matchId: matchId,
        teamName: teamData.name,
        teamSide: teamSide,
        matchTitle: matchTitle,
      },
    });
  };

  const header = () => (
    <View className="px-6 py-4 border-b border-zinc-800">
      <Text className="text-white text-2xl font-black italic">Matches</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#050505]">
      <StatusBar barStyle="light-content" />

      <SafeAreaView className="flex-1">
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={header}
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
