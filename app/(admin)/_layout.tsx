import { LoadProvider } from "@/context/LoderContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";

const tabs = [
  { name: "dashboard", icon: "dashboard", title: "OverView" },
  { name: "players", icon: "person-add", title: "Players" },
  { name: "matches", icon: "add-box", title: "Matches" },
  { name: "profile", icon: "person", title: "Profile" },
] as const;

const AdminLayout = () => {
  return (
    <AlertNotificationRoot>
      <LoadProvider>
        <View className="bg-[#121212] px-6 pt-12 pb-4 border-b border-zinc-800">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-black text-white tracking-tighter">
                FANS<Text className="text-[#10b981]">11</Text>
              </Text>
              <View className="flex-row items-center mt-1">
                <View className="w-2 h-2 rounded-full bg-[#10b981] mr-2" />
                <Text className="text-zinc-400 text-[12px] font-bold uppercase tracking-[2px]">
                  Admin Dashboard
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#10b981",
            tabBarInactiveTintColor: "#94a3b8",
            tabBarStyle: {
              position: "absolute",
              bottom: 10,
              left: 25,
              right: 15,
              elevation: 20,
              backgroundColor: "#1A1A1A",
              borderRadius: 25,
              borderTopWidth: 0,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
              marginTop: -5,
            },
          }}
        >
          {tabs.map((tab) => (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name={tab.icon} color={color} size={size} />
                ),
              }}
            />
          ))}
        </Tabs>
      </LoadProvider>
    </AlertNotificationRoot>
  );
};
export default AdminLayout;
