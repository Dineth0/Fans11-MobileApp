import { useLoader } from "@/hooks/useLoader";
import { resetPassword } from "@/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter your email",
      });
      return;
    }

    showLoader();
    try {
      await resetPassword(email);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Check Your Email",
        textBody: "We sent a password reset link to your inbox.",
        autoClose: 5000,
      });
      setTimeout(() => router.back(), 2000);
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error.message,
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/wellcomeScreen.png")}
      className="flex-1"
    >
      <View className="flex-1 bg-black/60 p-6 justify-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-6"
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <View className="bg-black/40 p-8 rounded-[40px] border border-white/20">
          <Text className="text-3xl font-black text-white mb-2">
            Forgot Password?
          </Text>
          <Text className="text-gray-300 mb-8">
            Enter your email address and we will send you a link to reset your
            password.
          </Text>

          <View className="flex-row items-center bg-white/10 rounded-2xl mb-6 px-4 border border-white/10">
            <MaterialIcons name="mail-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              className="flex-1 p-4 text-white font-semibold"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            onPress={handleReset}
            className="bg-emerald-500 py-4 rounded-2xl items-center"
          >
            <Text className="text-black font-black uppercase">
              Send Reset Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;
