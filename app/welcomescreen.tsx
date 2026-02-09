import { useAuth } from "@/hooks/useAuth";
import { getUserData } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import SwipeButton from "rn-swipe-button";

import { Ionicons } from "@expo/vector-icons";
import { Dimensions, ImageBackground, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleStarted = async () => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }
    try {
      const userData = await getUserData(user.uid);

      if (userData.role === "Admin") {
        router.replace("/(admin)/players");
      } else {
        router.replace("/home");
      }
    } catch (error) {
      console.error(error);
      router.replace("/welcomescreen");
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/images/wellcomeScreen.png")}
        className="flex-1"
        style={{ width, height }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "black"]}
          className="flex-1 justify-end pb-28 px-8"
        >
          <View className="items-center mb-auto mt-40">
            <LottieView
              autoPlay
              loop
              style={{ width: 180, height: 180, marginTop: 10 }}
              source={require("../assets/animations/Bouncing-Cricket-Ball.json")}
            />

            <Text className="text-white text-6xl font-black tracking-[4px] italic mt-4 shadow-2xl">
              FANS11
            </Text>

            <Text className="text-gray-300 text-base tracking-[2px] font-medium text-center uppercase">
              Build Your Dream XI
            </Text>
          </View>

          <SwipeButton
            onSwipeSuccess={handleStarted}
            railBackgroundColor="#30a818ff"
            railBorderColor="transparent"
            railFillBackgroundColor="rgba(0,0,0,0.1)"
            railFillBorderColor="transparent"
            thumbIconBackgroundColor="#000000"
            thumbIconBorderColor="#000000"
            thumbIconStyles={{ borderRadius: 50, borderWidth: 0 }}
            thumbIconComponent={() => (
              <Ionicons name="arrow-forward" size={28} color="#EFFF61" />
            )}
            title="GET STARTED"
            titleColor="#000000"
            titleFontSize={16}
            titleStyles={{ fontWeight: "900", letterSpacing: 2 }}
            containerStyles={{
              borderRadius: 50,
              marginHorizontal: 10,
              borderWidth: 0,
              elevation: 10,
              shadowColor: "#EFFF61",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
            height={60}
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
