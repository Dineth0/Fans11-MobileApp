import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const CommentModel = ({
  visible,
  onClose,
  onSave,
  setComment,
  comment,
  commentsList,
  onDelete,
  currentUserId,
}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 justify-end bg-black/60">
        <View className="bg-zinc-900 rounded-t-[40px] h-[85%] border-t border-zinc-800">
          <View className="items-center pt-3 pb-5">
            <View className="w-12 h-1 bg-zinc-700 rounded-full mb-4" />
            <View className="flex-row justify-between items-center w-full px-8">
              <Text className="text-white text-xl font-bold">
                Comments ({commentsList.length || 0})
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#a1a1aa" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 px-6"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {commentsList &&
              commentsList.map((item: any) => (
                <View key={item.id} className="flex-row mb-6 items-start">
                  <View className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700 mr-3">
                    {item.userImage ? (
                      <Image
                        source={{ uri: item.userImage }}
                        className="w-full h-full"
                      />
                    ) : (
                      <View className="items-center justify-center flex-1">
                        <MaterialIcons
                          name="person"
                          size={20}
                          color="#52525b"
                        />
                      </View>
                    )}
                  </View>
                  <View className="flex-1">
                    <View className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none">
                      <Text className="text-zinc-400 font-bold text-xs mb-1">
                        {item.userName}
                      </Text>
                      <Text className="text-white text-[14px] leading-5">
                        {item.comment}
                      </Text>
                    </View>
                    {currentUserId === item.userId && (
                      <TouchableOpacity
                        className="mt-2 flex-row items-center"
                        onPress={() => onDelete(item.id)}
                      >
                        <Text className="text-zinc-500 text-xs mr-1">
                          Delete
                        </Text>
                        <Ionicons name="trash-bin" size={12} color="#71717a" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
          </ScrollView>

          <View className="p-4 px-6 border-t border-zinc-800 bg-zinc-900 pb-8">
            <View className="flex-row items-center bg-zinc-800 rounded-3xl px-4 py-2 border border-zinc-700">
              <TextInput
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
                placeholderTextColor="#71717a"
                multiline
                className="flex-1 text-white text-[14px] max-h-24 py-2"
              />
              <TouchableOpacity
                onPress={onSave}
                disabled={!comment.trim()}
                className={`ml-2 p-2 rounded-full ${comment.trim() ? "bg-blue-600" : "opacity-50"}`}
              >
                <Ionicons name="send" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);
