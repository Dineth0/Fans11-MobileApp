import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const onSave = async () => {};

export const CommentModel = ({ visible, onClose }: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View className="flex-1 justify-end bg-black/80">
      <View className="bg-slate-900 rounded-t-[40px] p-8 border-t border-slate-800">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-2xl font-bold">Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Add Comment"
            placeholderTextColor="gray"
            className="bg-black/50 border border-slate-800 p-4 rounded-2xl text-white mb-8"
          />

          <TouchableOpacity
            onPress={onSave}
            className="bg-purple-600 py-5 rounded-2xl items-center"
          >
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  </Modal>
);
