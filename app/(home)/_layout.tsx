import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabs = [
  { name: "home", icon: "home", title: "Home" },
  { name: "matches", icon: "sports-cricket", title: "Matches" },
  { name: "mySquads", icon: "groups", title: "My Squads" },
  { name: "profile", icon: "person", title: "Profile" },
] as const;

const HomeLayout = () => {
  return (
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
  );
};
export default HomeLayout;
