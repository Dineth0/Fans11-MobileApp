import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const animation = useRef(null);

  return (
    <View className="flex-1">
      <ImageBackground 
        source={require('../assets/images/wellcomeScreen.png')} 
        className="flex-1"
        style={{ width, height }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'black']}
          className="flex-1 justify-end pb-28 px-8" 
        >
       
          <View className="items-center mb-auto mt-40"> 
            <LottieView
              autoPlay
              loop
              style={{ width: 180, height: 180, marginTop: 10 }}
              source={require('../assets/animations/Bouncing-Cricket-Ball.json')} 
            />

            <Text className="text-white text-6xl font-black tracking-[4px] italic mt-4 shadow-2xl">
              FANS11
            </Text>
            
            <Text className="text-gray-300 text-base tracking-[2px] font-medium text-center uppercase">
              Build Your Dream XI
            </Text>
          </View>


          <View className="items-center w-full">
            <TouchableOpacity 
              className="w-full h-16 rounded-full p-[1.5px] overflow-hidden"
              activeOpacity={0.8}
              // onPress={() => router.push('/login')} 
            >
              <LinearGradient
                colors={['#1d4ed8', '#9333ea']}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                className="flex-1 rounded-full justify-center items-center"
              >
                <View className="bg-black/40 w-full h-full rounded-full justify-center items-center">
                  <Text className="text-white text-xl font-black tracking-widest uppercase">
                    GET STARTED
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <Text className="text-gray-500 mt-4 text-xs uppercase tracking-[3px] font-bold">
              Predict • Compete • Win
            </Text>
          </View>

        </LinearGradient>
      </ImageBackground>
    </View>
  );
}