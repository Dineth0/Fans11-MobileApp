import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Components Import කිරීම
import { AddPlayerModal } from "@/components/admin/AddPlayerModal";
import { CountryCard, PlayerCard } from "@/components/admin/ListCards";
import { TabButton } from "@/components/admin/TabButton";

const AdminPlayersScreen = () => {
  const [activeTab, setActiveTab] = useState("players");
  const [selectedCountry, setSelectedCountry] = useState("Sri Lanka");
  const [isPlayerModalVisible, setPlayerModalVisible] = useState(false);

  const [countries, setCountries] = useState([
    { id: "1", name: "Sri Lanka", flag: null },
    { id: "2", name: "India", flag: null },
  ]);
  const [players, setPlayers] = useState([
    {
      id: "1",
      name: "Wanindu Hasaranga",
      country: "Sri Lanka",
      role: "All-Rounder",
      image: null,
    },
  ]);

  const [playerName, setPName] = useState("");
  const [playerRole, setPRole] = useState("");
  const [playerImage, setPImage] = useState<string | null>(null);
  const [countryName, setCName] = useState("");
  const [countryFlag, setCFlag] = useState<string | null>(null);

  const pickImage = async (target: "player" | "country") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: target === "player" ? [1, 1] : [3, 2],
      quality: 0.7,
    });
    if (!result.canceled) {
      target === "player"
        ? setPImage(result.assets[0].uri)
        : setCFlag(result.assets[0].uri);
    }
  };

  const handleAddCountry = () => {};

  const handleAddPlayer = () => {};

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1d4ed8", "#9333ea"]}
        className="pt-16 pb-6 px-6"
      >
        <Text className="text-blue-100 text-xs uppercase">
          Players and Country Management
        </Text>
      </LinearGradient>

      <View className="flex-row bg-slate-900 mx-4 mt-4 rounded-xl p-1">
        <TabButton
          title="SQUADS"
          active={activeTab === "players"}
          onPress={() => setActiveTab("players")}
        />
        <TabButton
          title="COUNTRIES"
          active={activeTab === "countries"}
          onPress={() => setActiveTab("countries")}
        />
      </View>

      <View className="flex-1 mt-4">
        {activeTab === "players" ? (
          <View className="flex-1">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={countries}
              keyExtractor={(item) => item.id}
              className="max-h-14"
              contentContainerStyle={{
                paddingHorizontal: 16,
                alignItems: "center",
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedCountry(item.name)}
                  className={`mr-3 px-6 py-2 rounded-full border ${
                    selectedCountry === item.name
                      ? "bg-purple-600 border-purple-600"
                      : "bg-slate-900 border-slate-800"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      selectedCountry === item.name
                        ? "text-white"
                        : "text-slate-300"
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View className="flex-row justify-between items-center px-6 mb-4">
              <Text className="text-white text-xl font-bold">
                {selectedCountry} Squad
              </Text>
              <TouchableOpacity
                onPress={() => setPlayerModalVisible(true)}
                className="bg-purple-600 p-3 rounded-2xl"
              >
                <MaterialIcons name="person-add" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={players.filter((p) => p.country === selectedCountry)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PlayerCard player={item} />}
            />
          </View>
        ) : (
          <View className="flex-1 px-4">
            <View className="bg-slate-900 p-5 rounded-3xl border border-slate-800 mb-6">
              <View className="flex-row items-center mb-4" style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={() => pickImage("country")}
                  className="w-20 h-14 bg-black/50 rounded-xl border border-dashed border-slate-700 items-center justify-center overflow-hidden"
                >
                  {countryFlag ? (
                    <Image
                      source={{ uri: countryFlag }}
                      className="w-full h-full"
                    />
                  ) : (
                    <MaterialIcons
                      name="add-a-photo"
                      size={20}
                      color="#475569"
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  placeholder="Country Name"
                  value={countryName}
                  onChangeText={setCName}
                  placeholderTextColor="#475569"
                  className="flex-1 bg-black/50 border border-slate-700 rounded-2xl px-4 py-3 text-white"
                />
              </View>
              <TouchableOpacity
                onPress={handleAddCountry}
                className="bg-blue-600 py-4 rounded-2xl items-center"
              >
                <Text className="text-white font-bold">ADD COUNTRY</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CountryCard country={item} />}
            />
          </View>
        )}
      </View>

      <AddPlayerModal
        visible={isPlayerModalVisible}
        onClose={() => setPlayerModalVisible(false)}
        onPickImage={() => pickImage("player")}
        image={playerImage}
        name={playerName}
        setName={setPName}
        role={playerRole}
        setRole={setPRole}
        onSave={handleAddPlayer}
      />
    </View>
  );
};

export default AdminPlayersScreen;
