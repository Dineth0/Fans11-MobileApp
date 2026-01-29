import { PlayerItem } from "@/components/home/PlayerItem";
import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/hooks/useLoader";
import { getUserData } from "@/services/authService";
import { getPlayersByCountry } from "@/services/playerService";
import {
  addSelect11,
  getSelection11sById,
  updateMySelection11s,
} from "@/services/select11Service";
import { Player } from "@/types/player";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = width / 3;

const PickSquadScreen = () => {
  const { matchId, teamName, matchTitle, edit, postId } =
    useLocalSearchParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const [captainId, setCaptainId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const isEdit = edit === "true";

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        if (teamName) {
          showLoader();
          const data = await getPlayersByCountry(teamName as string);
          setPlayers(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        hideLoader();
      }
    };
    loadPlayers();
  }, [teamName]);

  useEffect(() => {
    const loadExistingSelection11s = async () => {
      if (isEdit && postId) {
        try {
          showLoader();
          const data = await getSelection11sById(postId as string);
          const playerIds = data.select11.map((p: any) => p.id);
          setSelectedPlayers(playerIds);
          setCaptainId(data.captainId);
        } catch (error) {
          console.error(error);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Faild load select squad",
          });
        } finally {
          hideLoader();
        }
      }
    };
    loadExistingSelection11s();
  }, [isEdit, postId]);
  const findKipper = players
    .filter((p) => selectedPlayers.includes(p.id))
    .some((p) => p.role.toLowerCase().includes("wicketkeeper"));

  const isTeamValid =
    selectedPlayers.length === 11 && findKipper && captainId !== null;

  const togglePlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
      if (captainId === playerId) setCaptainId(null);
    } else {
      if (selectedPlayers.length < 11) {
        setSelectedPlayers((prev) => [...prev, playerId]);
      }
    }
  };

  const handleComfirmTeam = async () => {
    if (!user) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please login to save your team",
      });
      return;
    }
    try {
      const userData = await getUserData(user.uid);
      const userImage = userData.image;
      showLoader();
      const selectedFullDetails = players.filter((p) =>
        selectedPlayers.includes(p.id),
      );
      const squadData = {
        matchId: matchId as string,
        matchTitle: matchTitle as string,
        select11: selectedFullDetails,
        countryName: teamName as string,
        captainId: captainId || "",
        userId: user.uid,
        userName: user.displayName || "",
        userImage: userImage,
      };

      if (isEdit && postId) {
        await updateMySelection11s(postId as string, squadData);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Your update Successfully",
          autoClose: 3000,
        });
      } else {
        await addSelect11(squadData);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Your added Successfully",
          autoClose: 3000,
        });
      }

      setTimeout(() => {
        router.replace("/(home)/matches");
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 bg-black">
      <ImageBackground
        source={require("../assets/images/parth.png")}
        className="flex-1"
        style={{ width }}
      >
        <View className="flex-1 bg-black/70">
          <SafeAreaView className="flex-1">
            <View className="px-6 py-6 flex-row justify-between items-center">
              <View>
                <Text className="text-emerald-500 font-black text-2xl italic uppercase">
                  SELECT <Text className="text-white">11</Text>
                </Text>
                <View className="flex-row space-x-2 mt-1">
                  <Text
                    className={`text-[8px] font-bold px-1 rounded ${findKipper ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-500"}`}
                  >
                    WK {findKipper ? "✓" : "REQUIRED"}
                  </Text>
                  <Text
                    className={`text-[8px] font-bold px-1 rounded ${captainId ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-500"}`}
                  >
                    CAPTAIN {captainId ? "✓" : "REQUIRED"}
                  </Text>
                </View>
                <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-[2px]">
                  {teamName} | {players.length} Available
                </Text>
              </View>

              <View className="bg-emerald-500 px-4 py-2 rounded-2xl shadow-lg">
                <Text className="text-black font-black text-lg">
                  {selectedPlayers.length}/11
                </Text>
              </View>
            </View>

            <FlatList
              data={players}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedPlayers.includes(item.id);
                const isCaptain = captainId === item.id;

                return (
                  <View className="relative">
                    <PlayerItem
                      player={item}
                      isSelected={isSelected}
                      onPress={() => togglePlayer(item.id)}
                      width={COLUMN_WIDTH}
                    />

                    {isSelected && (
                      <TouchableOpacity
                        onPress={() => setCaptainId(item.id)}
                        className={`absolute top-0 right-4 w-7 h-7 rounded-full items-center justify-center border-2 ${
                          isCaptain
                            ? "bg-amber-500 border-white"
                            : "bg-black/50 border-zinc-500"
                        }`}
                      >
                        <Text className="text-[10px] font-black text-white">
                          {isCaptain ? "C" : "(C)"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 100,
                paddingTop: 10,
              }}
              showsVerticalScrollIndicator={false}
            />

            {selectedPlayers.length === 11 && !findKipper && (
              <View className="absolute bottom-28 w-full items-center">
                <Text className="bg-red-500/80 text-white text-[10px] px-4 py-1 rounded-full font-bold">
                  ⚠️ YOU MUST INCLUDE AT LEAST ONE WICKET-KEEPER
                </Text>
              </View>
            )}

            {isTeamValid && (
              <View className="absolute bottom-10 w-full px-10">
                <TouchableOpacity
                  className="bg-emerald-500 py-4 rounded-2xl items-center shadow-2xl shadow-emerald-500/50"
                  onPress={handleComfirmTeam}
                >
                  <Text className="text-black font-black text-lg uppercase tracking-widest">
                    Confirm Team
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};
export default PickSquadScreen;
