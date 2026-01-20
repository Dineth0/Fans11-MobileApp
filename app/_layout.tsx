// app/_layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { LoadProvider } from "@/context/LoderContext";
import { Stack } from "expo-router"; // Slot වෙනුවට Stack ගන්න
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <LoadProvider>
        <AuthProvider>
          {/* Slot වෙනුවට Stack එකක් භාවිතා කිරීමෙන් Navigation Context එකක් ලැබෙනවා */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcomescreen" />
            <Stack.Screen name="(admin)" />
            <Stack.Screen name="(home)" />
          </Stack>
        </AuthProvider>
      </LoadProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
