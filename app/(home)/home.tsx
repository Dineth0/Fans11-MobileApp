import SelectionPostCard from "@/components/home/SelectionPostCard";
import { useLoader } from "@/hooks/useLoader";
import { getAllSelection11s } from "@/services/select11Service";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const loadData = async () => {
      try {
        showLoader();
        const data = await getAllSelection11s();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        hideLoader();
      }
    };
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAllSelection11s();
    setRefreshing(false);
  };

  const header = () => (
    <View className="px-6 py-2 mb-4 border-b border-zinc-800">
      <Text className="text-white text-[20px] font-black italic">
        PUBLIC<Text className="text-emerald-500">FEED</Text>
      </Text>
      <Text className="text-zinc-500 text-[10px] uppercase tracking-widest">
        See what others are picking
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={header}
          renderItem={({ item }) => (
            <SelectionPostCard post={item} isHome={true} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#0d2e23ff"
            />
          }
          contentContainerStyle={{ paddingVertical: 2, paddingBottom: 3 }}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default Home;
