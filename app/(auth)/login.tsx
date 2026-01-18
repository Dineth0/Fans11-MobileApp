import { useLoader } from "@/hooks/useLoader";
import { getUserData, login } from "@/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all fields...!",
        autoClose: 3000,
      });
      return;
    }
    showLoader();

    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      const userData = await getUserData(user.uid);

      if (userData) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: `Welcome back, ${userData.name}`,
          autoClose: 3000,
        });

        if (userData.role === "Admin") {
          router.replace("/(admin)/dashboard");
        } else {
          router.replace("/(home)/home");
        }
      } else {
        throw new Error("User data not found");
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error.message || "Login Failed..!",
        autoClose: 3000,
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require("../../assets/images/wellcomeScreen.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 justify-center items-center bg-black/40 p-6">
          <View className="w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <Text className="text-4xl font-extrabold mb-2 text-center text-white italic">
              FANS11
            </Text>
            <Text className="text-gray-200 text-center mb-8 font-medium">
              Log in to your account
            </Text>

            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#D1D5DB"
              className="bg-white/20 p-4 mb-4 rounded-2xl text-white border border-white/10"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#D1D5DB"
              className="bg-white/20 p-4 mb-8 rounded-2xl text-white border border-white/10"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Pressable
              className="bg-blue-600 py-4 rounded-2xl active:bg-blue-700 shadow-lg"
              onPress={handleLogin}
            >
              <Text className="text-white text-xl font-bold text-center">
                LOGIN
              </Text>
            </Pressable>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-300">Do not have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/register");
                }}
              >
                <Text className="text-blue-400 font-bold">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Login;
