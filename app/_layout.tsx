// app/_layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { LoadProvider } from "@/context/LoderContext";
import { Stack } from "expo-router";
import React from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AlertNotificationRoot>
        <LoadProvider>
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="welcomescreen" />
              <Stack.Screen name="(admin)" />
              <Stack.Screen name="(home)" />
            </Stack>
          </AuthProvider>
        </LoadProvider>
      </AlertNotificationRoot>
    </SafeAreaProvider>
  );
};

export default RootLayout;
