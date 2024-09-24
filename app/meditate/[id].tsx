import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import IMAGE_BACKGROUND from "@/constants/mediation-images";
import AppGradient from "@/components/AppGradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditationData";
import { TimeContext } from "@/context/timerContext";

const meditate = () => {
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useContext(TimeContext);
  // const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timeId: NodeJS.Timeout;
    if (secondsRemaining == 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timeId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStarted = async () => {
    if (secondsRemaining === 0) setDuration(10);
    setIsMeditating(!isMeditating);
    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const statusCode = await sound?.getStatusAsync();
    if (statusCode?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudioSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStarted();

    router.push("/(modals)/adjust-meditation-duration");
  };

  const formatedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(
    2,
    "0"
  );
  const formatedSeconds = String(Math.floor(secondsRemaining % 60)).padStart(
    2,
    "0"
  );

  return (
    <View className="flex-1">
      <ImageBackground
        source={IMAGE_BACKGROUND[Number(id) - 1]}
        className="flex-1"
        resizeMode="cover"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color="white"
            />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center ">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formatedMinutes}:{formatedSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop Meditating " : "Start meditation"}
              onPress={toggleMeditationSessionStarted}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default meditate;
