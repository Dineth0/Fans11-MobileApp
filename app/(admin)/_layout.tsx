import { LoadProvider } from "@/context/LoderContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
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
        <Tabs screenOptions={{ headerShown: false }}>
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
