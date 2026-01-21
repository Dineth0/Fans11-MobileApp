import { Text, TextInput, View } from "react-native";

interface AddMatchModalProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placehplder: string;
}

const AddMatchModal = ({
  label,
  value,
  onChangeText,
  placehplder,
}: AddMatchModalProps) => {
  return (
    <View className="mb-5">
      <Text className="text-gray-400 mb-2 ml-1 text-xs uppercase font-bold tracking-widest">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
        placeholder={placehplder}
        placeholderTextColor="#4b5563"
      />
    </View>
  );
};
export default AddMatchModal;
