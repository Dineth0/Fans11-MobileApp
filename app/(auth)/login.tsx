import { useLoader } from "@/hooks/useLoader";
import { getUserData, login } from "@/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
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
  const [showPassword, setShowPassword] = useState(false);

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
          router.replace("/(admin)/players");
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
      <View className="flex-1">
        <ImageBackground
          source={require("../../assets/images/wellcomeScreen.png")}
          className="flex-1"
          resizeMode="cover"
        >
          <KeyboardAvoidingView className="flex-1">
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex-1 justify-center items-center bg-black/50 p-6">
                <View className="w-full bg-black/40 backdrop-blur-3xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                  <View className="items-center mb-8">
                    <Image
                      source={require("../../assets/images/fans11.png")}
                      className="p-4 rounded-full mb-4 shadow-lg w-28 h-28"
                    />
                    <Text className="text-4xl font-black text-center text-white tracking-tight">
                      FANS11
                    </Text>
                    <Text className="text-gray-200 text-center mt-2 font-medium">
                      Login your account
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-2xl mb-4 px-4 border border-white/10">
                    <MaterialIcons
                      name="mail-outline"
                      size={20}
                      color="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Email Address"
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 p-4 text-white font-semibold"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-2xl mb-4 px-4 border border-white/10">
                    <MaterialIcons
                      name="lock-outline"
                      size={20}
                      color="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 p-4 text-white font-semibold"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>

                  <Pressable
                    className="bg-blue-600 py-4 rounded-2xl active:bg-blue-700 shadow-lg"
                    onPress={handleLogin}
                  >
                    <Text className="text-white text-xl font-bold text-center">
                      LOGIN
                    </Text>
                  </Pressable>

                  <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-300">
                      Do not have an account?{" "}
                    </Text>
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
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
