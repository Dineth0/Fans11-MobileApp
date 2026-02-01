import { Text, TouchableOpacity } from "react-native";

interface TabButtonsProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

export const TabButton = ({ title, active, onPress }: TabButtonsProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 py-3 items-center rounded-lg ${active ? "bg-slate-800" : ""}`}
  >
    <Text className={`font-bold ${active ? "text-white" : "text-gray-500"}`}>
      {title}
    </Text>
  </TouchableOpacity>
);
