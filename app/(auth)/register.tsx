import { useLoader } from "@/hooks/useLoader";
import { userRegister } from "@/services/authService";
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

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const { showLoader, hideLoader, isLoading } = useLoader();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !conPassword || isLoading) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all fields...!",
        autoClose: 3000,
      });
      return;
    }
    if (password !== conPassword) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "do not match password",
        autoClose: 3000,
      });
      return;
    }
    showLoader();

    try {
      await userRegister(name, email, password, "User");
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Account created..!",
        autoClose: 3000,
      });
      router.replace("/login");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Register fail..!",
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
                      Join FANS11
                    </Text>
                    <Text className="text-gray-200 text-center mt-2 font-medium">
                      Create an account to start playing
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-2xl mb-4 px-4 border border-white/10">
                    <MaterialIcons
                      name="person-outline"
                      size={20}
                      color="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 p-4 text-white font-semibold"
                      value={name}
                      onChangeText={setName}
                    />
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
                  <View className="flex-row items-center bg-white/10 rounded-2xl mb-8 px-4 border border-white/10">
                    <MaterialIcons
                      name="verified-user"
                      size={20}
                      color="#9CA3AF"
                    />
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 p-4 text-white font-semibold"
                      value={conPassword}
                      onChangeText={setConPassword}
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
                    onPress={handleRegister}
                  >
                    <Text className="text-white text-xl font-bold text-center">
                      Register
                    </Text>
                  </Pressable>
                  <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-300">
                      Alrady have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/login");
                      }}
                    >
                      <Text className="text-blue-600 font-semibold">Login</Text>
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
export default Register;
