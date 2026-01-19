import { AuthProvider } from "@/context/AuthContext";
import { LoadProvider } from "@/context/LoderContext";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  console.log(insets);

  return (
    <LoadProvider>
      <AuthProvider>
        <View style={{ marginTop: insets.top, flex: 1 }}>
          <Slot />
        </View>
      </AuthProvider>
    </LoadProvider>
  );
};

export default RootLayout;
