import LottieView from "lottie-react-native";
import { createContext, ReactNode, useState } from "react";
import { Text, View } from "react-native";

interface LoderContextProps {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
}

export const LoaderContext = createContext<LoderContextProps>({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
});

export const LoadProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            elevation: 9999,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="bg-white p-4 rounded-3xl items-center justify-center w-40 h-40">
            <LottieView
              source={require("@/assets/animations/Sandy Loading.json")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
            <Text className="text-white font-bold">Please Wait</Text>
          </View>
        </View>
      )}
    </LoaderContext.Provider>
  );
};
