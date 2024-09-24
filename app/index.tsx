import { View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import beachImage from "@/assets/meditation-images/beach.webp";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

const index = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"  
        className="flex-1"
      >
       <AppGradient colors={["#00000066", "#000000CC"]}>
          <SafeAreaView className="flex-1  px-1 justify-between">
            <View>
              <Text className="font-bold text-white text-4xl text-center">
                App
              </Text>
              <Text className="text-center text-white text<-xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("./nature-meditate")}
                title={"Get started"}
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default index;
