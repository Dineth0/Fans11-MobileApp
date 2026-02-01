import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import AddMatchModal from "@/components/admin/AddMatchModal";
import CountrySelectModal from "@/components/admin/CountrySelectModal";
import MatchShowCard from "@/components/admin/MatchShowCard";
import TeamSelectCard from "@/components/admin/TeamSelectCard";
import { useLoader } from "@/hooks/useLoader";
import { getAllCountries } from "@/services/countryService";
import { addMatch, getAllMatches } from "@/services/matchService";

const Matches = () => {
  const [matchTitle, setMatchTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [countries, setCountries] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState<"A" | "B" | null>(null);
  const [teamA, setTeamA] = useState<any>(null);
  const [teamB, setTeamB] = useState<any>(null);

  const [matches, setMatches] = useState<any[]>([]);
  const { showLoader, hideLoader, isLoading } = useLoader();

  useEffect(() => {
    getAllCountries().then(setCountries).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        showLoader();
        const data = await getAllMatches();
        setMatches(data);
      } catch (e) {
        console.error(e);
      } finally {
        hideLoader();
      }
    };
    fetchMatches();
  }, []);

  const handleCreateMatch = async () => {
    if (!teamA || !teamB || !matchTitle || !venue) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    if (teamA.id === teamB.id) {
      Alert.alert("Error", "Cannot select same team twice!");
      return;
    }
    const timeString = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    try {
      await addMatch({
        title: matchTitle,
        venue,
        date: date.toISOString(),
        time: timeString,
        teamA: teamA,
        teamB: teamB,
      });

      Alert.alert("Success", "Match Created!");
      setMatchTitle("");
      setVenue("");
      setTeamA(null);
      setTeamB(null);

      const updated = await getAllMatches();
      setMatches(updated);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create match");
    }
  };

  const Header = (
    <View>
      <Text className="text-white text-3xl font-black mb-8 mt-9">
        New Match
      </Text>

      <View className="flex-row justify-between items-center mb-10">
        <TeamSelectCard
          label="Team A"
          selectedTeam={teamA}
          onPress={() => {
            setSelectionType("A");
            setModalVisible(true);
          }}
        />

        <View className="bg-red-600 w-10 h-10 rounded-full justify-center items-center">
          <Text className="text-white font-black text-[10px]">VS</Text>
        </View>

        <TeamSelectCard
          label="Team B"
          selectedTeam={teamB}
          onPress={() => {
            setSelectionType("B");
            setModalVisible(true);
          }}
        />
      </View>

      <View className="flex-row justify-between mb-5">
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-zinc-800 p-4 rounded-2xl w-[48%]"
        >
          <Text className="text-emerald-400 text-xs">Date</Text>
          <Text className="text-white font-bold">
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="bg-zinc-800 p-4 rounded-2xl w-[48%]"
        >
          <Text className="text-emerald-400 text-xs">Time</Text>
          <Text className="text-white font-bold">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(e, d) => {
            setShowDatePicker(false);
            if (d) setDate(d);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={(e, d) => {
            setShowTimePicker(false);
            if (d) setTime(d);
          }}
        />
      )}

      <View className="bg-zinc-900 p-6 rounded-[35px] mb-10">
        <AddMatchModal
          label="Match Title"
          value={matchTitle}
          onChangeText={setMatchTitle}
          placehplder="Asia Cup 2026"
        />
        <AddMatchModal
          label="Venue"
          value={venue}
          onChangeText={setVenue}
          placehplder="R. Premadasa Stadium"
        />

        <TouchableOpacity
          onPress={handleCreateMatch}
          className="bg-emerald-600 h-16 rounded-2xl justify-center items-center"
        >
          <Text className="text-white font-black text-lg">Create Match</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-3xl font-black mb-6">
        Match Schedule
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black px-4">
      <FlatList
        ListHeaderComponent={Header}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchShowCard match={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading ? (
            <Text className="text-gray-500 text-center mt-20">
              No matches found
            </Text>
          ) : null
        }
      />

      <CountrySelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        countries={countries}
        selectionType={selectionType}
        onSelect={(item) => {
          selectionType === "A" ? setTeamA(item) : setTeamB(item);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default Matches;
