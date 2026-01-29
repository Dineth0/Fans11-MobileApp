import { useAuth } from "@/hooks/useAuth";
import { logOutUser, updateUserProfile } from "@/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Profile = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogOut = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logOutUser();
            router.replace("/welcomescreen");
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Logout failed.");
          }
        },
      },
    ]);
  };

  const addProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setProfileImage(base64Image);

      if (user?.uid) {
        try {
          await updateUserProfile(user.uid, base64Image);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Profile Updated Successfully",
            autoClose: 3000,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  return (
    <View className="flex-1 bg-black p-6">
      <View className="mt-10 mb-8">
        <Text className="text-white text-3xl font-black tracking-tight">
          Profile
        </Text>
      </View>

      <View className="bg-slate-900/50 rounded-[40px] p-8 border border-slate-800 items-center">
        <View className="relative mb-6">
          <TouchableOpacity
            onPress={addProfileImage}
            className="w-32 h-32 rounded-full bg-purple-600 justify-center items-center border-4 border-slate-800 shadow-2xl overflow-hidden"
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} className="w-full h-full" />
            ) : (
              <Text className="text-white text-5xl font-black">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addProfileImage}
            className="absolute bottom-0 right-0 bg-purple-500 w-10 h-10 rounded-full justify-center items-center border-4 border-slate-900"
          >
            <MaterialIcons name="camera-alt" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="items-center mb-8">
          <Text className="text-white text-2xl font-black mb-1">
            {user?.displayName || "User Name"}
          </Text>
          <View className="flex-row items-center bg-slate-800/80 px-4 py-1.5 rounded-full">
            <MaterialIcons name="email" size={14} color="#9333ea" />
            <Text className="text-gray-400 text-sm ml-2 font-medium">
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="w-full space-y-4">
          <TouchableOpacity className="flex-row items-center bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
            <Ionicons name="settings-outline" size={22} color="#94a3b8" />
            <Text className="text-white font-bold ml-4 flex-1">
              Account Settings
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#4b5563" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogOut}
            className="flex-row items-center bg-red-500/10 p-5 rounded-2xl border border-red-500/20 mt-4"
          >
            <MaterialIcons name="logout" size={22} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-4">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
