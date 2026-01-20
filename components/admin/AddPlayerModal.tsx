import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export const AddPlayerModal = ({
  visible,
  onClose,
  onPickImage,
  image,
  name,
  setName,
  role,
  setRole,
  onSave,
}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View className="flex-1 justify-end bg-black/80">
      <View className="bg-slate-900 rounded-t-[40px] p-8 border-t border-slate-800">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-2xl font-bold">ADD PLAYER</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-8">
            <TouchableOpacity
              onPress={onPickImage}
              className="w-28 h-28 bg-black/40 rounded-full border-2 border-dashed border-purple-500 items-center justify-center overflow-hidden"
            >
              {image ? (
                <Image source={{ uri: image }} className="w-full h-full" />
              ) : (
                <MaterialIcons name="add-a-photo" size={32} color="#a855f7" />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="gray"
            className="bg-black/50 border border-slate-800 p-4 rounded-2xl text-white mb-4"
          />
          <TextInput
            placeholder="Role"
            value={role}
            onChangeText={setRole}
            placeholderTextColor="gray"
            className="bg-black/50 border border-slate-800 p-4 rounded-2xl text-white mb-8"
          />

          <TouchableOpacity
            onPress={onSave}
            className="bg-purple-600 py-5 rounded-2xl items-center"
          >
            <Text className="text-white font-bold tracking-widest">
              ADD TO LIST
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  </Modal>
);
