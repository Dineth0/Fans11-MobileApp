import { Ionicons } from "@expo/vector-icons";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface Country {
  id: string;
  name: string;
  image: string;
}
interface Props {
  visible: boolean;
  onClose: () => void;
  countries: Country[];
  selectionType: string | null;
  onSelect: (team: Country) => void;
}

const CountrySelectModal = ({
  visible,
  onClose,
  countries,
  selectionType,
  onSelect,
}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/70">
        <View className="bg-slate-900 h-[60%] rounded-t-[40px] p-8 border-t border-slate-800">
          <Text className="text-white text-xl font-bold mb-6 text-center">
            Select {selectionType === "A" ? "Team A" : "Team B"}
          </Text>

          <FlatList
            data={countries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                className="bg-slate-800 p-5 mb-3 rounded-2xl flex-row items-center border border-slate-700"
              >
                <View className="w-10 h-10 bg-slate-700 rounded-full mr-4 justify-center items-center">
                  <Text>🏏</Text>
                </View>
                <Text className="text-white text-lg font-bold">
                  {item.name}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#4b5563"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            )}
          ></FlatList>

          <TouchableOpacity onPress={onClose} className="mt-4 p-4">
            <Text className="text-center text-gray-500 font-bold uppercase tracking-widest">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CountrySelectModal;
