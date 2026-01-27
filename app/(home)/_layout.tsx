import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

const TopTabLayout = () => {
  return (
    <View
      className="flex-1 bg-black"
      style={{
        paddingTop: 20,
      }}
    >
      <View className="flex-row justify-between items-center px-4 py-3 bg-black">
        <View>
          <Text className="text-[30px] font-black text-white tracking-widest">
            FANS<Text className="text-[#27E1C1]">11</Text>
          </Text>
        </View>
      </View>

      <TopTabs
        screenOptions={{
          tabBarActiveTintColor: "#27E1C1",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            backgroundColor: "#27E1C1",
            height: 3,
            borderRadius: 3,
          },
          tabBarStyle: {
            backgroundColor: "#000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: "#222",
          },
        }}
      >
        <TopTabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="home" size={26} color={color} />
            ),
          }}
        />
        <TopTabs.Screen
          name="matches"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="sports-cricket" size={26} color={color} />
            ),
          }}
        />
        <TopTabs.Screen
          name="mySquads"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="groups" size={26} color={color} />
            ),
          }}
        />
        <TopTabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="person" size={26} color={color} />
            ),
          }}
        />
      </TopTabs>
    </View>
  );
};

export default TopTabLayout;
