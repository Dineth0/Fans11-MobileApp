import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Services & Components
import AddMatchModal from "@/components/admin/AddMatchModal";
import CountrySelectModal from "@/components/admin/CountrySelectModal";
import TeamSelectCard from "@/components/admin/TeamSelectCard";
import { getAllCountries } from "@/services/countryService";
import { addMatch } from "@/services/matchService";

const Matches = () => {
  const [matchTitle, setMatchTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [countries, setCountries] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState<"A" | "B" | null>(null);
  const [teamA, setTeamA] = useState<any>(null);
  const [teamB, setTeamB] = useState<any>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not load countries");
      }
    };
    loadCountries();
  }, []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // Picker එක වහන්න
    if (selectedDate) {
      const currentDate = new Date(date);
      currentDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      setDate(currentDate);
    }
  };

  // Time එක තෝරාගත් විට
  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false); // Picker එක වහන්න
    if (selectedTime) {
      const currentDate = new Date(date);
      currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setDate(currentDate);
    }
  };

  const handleCreateMatch = async () => {
    if (!teamA || !teamB || !matchTitle || !venue) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    if (teamA.id === teamB.id) {
      Alert.alert("Error", "Cannot select the same team twice!");
      return;
    }

    try {
      // Service එකේ function එක call කිරීම
      await addMatch({
        title: matchTitle,
        venue: venue,
        date: date.toISOString(),
        teamA: { name: teamA.name, id: teamA.id, flag: teamA.flag || "" },
        teamB: { name: teamB.name, id: teamB.id, flag: teamB.flag || "" },
      });

      Alert.alert("Success", "Match Created Successfully!");
      setMatchTitle("");
      setVenue("");
      setTeamA(null);
      setTeamB(null);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to create match");
    }
  };
  const openModal = (type: "A" | "B") => {
    setSelectionType(type);
    setModalVisible(true);
  };

  // ... (UI සහ අනෙක් Modal functions වෙනස් නොවේ)
  return (
    <View className="flex-1 bg-black p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-black mb-8 mt-6 tracking-tight">
          New Match
        </Text>

        {/* VS Section */}
        <View className="flex-row justify-between items-center mb-10">
          <TeamSelectCard
            label="Team A"
            selectedTeam={teamA}
            onPress={() => openModal("A")}
          />

          <View className="bg-red-600 w-10 h-10 rounded-full justify-center items-center z-10 border-4 border-black">
            <Text className="text-white font-black text-[10px]">VS</Text>
          </View>

          <TeamSelectCard
            label="Team B"
            selectedTeam={teamB}
            onPress={() => openModal("B")}
          />
        </View>
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-slate-800 p-4 rounded-2xl w-[48%] border border-slate-700"
          >
            <Text className="text-gray-400 text-xs mb-1">Date</Text>
            <Text className="text-white font-bold">
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="bg-slate-800 p-4 rounded-2xl w-[48%] border border-slate-700"
          >
            <Text className="text-gray-400 text-xs mb-1">Time</Text>
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
            display="default"
            onChange={onDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            is24Hour={false}
            onChange={onTimeChange}
          />
        )}

        {/* Inputs Section */}
        <View className="bg-slate-900/50 p-6 rounded-[35px] border border-slate-800">
          <AddMatchModal
            label="Match Title"
            value={matchTitle}
            onChangeText={setMatchTitle}
            placehplder="e.g. Asia Cup 2026"
          />
          <AddMatchModal
            label="Venue"
            value={venue}
            onChangeText={setVenue}
            placehplder="e.g. R. Premadasa Stadium"
          />

          <TouchableOpacity
            onPress={handleCreateMatch}
            className="bg-purple-600 h-16 rounded-2xl justify-center items-center shadow-xl"
          >
            <Text className="text-white font-black text-lg uppercase">
              Create Match
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CountrySelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        countries={countries}
        selectionType={selectionType}
        onSelect={(selectedItem) => {
          if (selectionType === "A") setTeamA(selectedItem);
          if (selectionType === "B") setTeamB(selectedItem);
          setModalVisible(false);
        }}
      ></CountrySelectModal>
    </View>
  );
};
export default Matches;
