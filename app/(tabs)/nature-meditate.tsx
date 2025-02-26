import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { MEDITATION_DATA } from "@/constants/meditationData";
import MEDITATION_IMAGES from "@/constants/mediation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const natureMeditate = () => {
  return (
    <View className="flex-1">
      <AppGradient
        colors={["#161b2e", "#0a4d4a", "#766e67"]}
      >
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome Rajat
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your meditations practice today
          </Text>
        </View>

        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="mb-20"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>router.push(`/meditate/${item.id}`)}
                className="h-48 my-3 rounded-md overflow-hidden"
              >
                <ImageBackground
                  source={MEDITATION_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 rounded-lg justify-center"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8"]}
                    className="flex-1 justify-center items-center"
                  ></LinearGradient>
                  <Text className="text-gray-100 text-3xl font-bold text-center">
                    {item.title}
                  </Text>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default natureMeditate;
