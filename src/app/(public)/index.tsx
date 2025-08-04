import CustomButtom from "@/components/CustomButtom";
import { images } from "@/constants";
import { useAuth, useSSO } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { startSSOFlow: startGoogleOAuthFlow } = useSSO();

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (isSignedIn) {
        router.replace("/(protected)/(tabs)");
        return;
      }

      const { createdSessionId, setActive } = await startGoogleOAuthFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/(public)/sso-callback", {
          scheme: "fastfood",
        }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        router.replace("/(protected)/(tabs)");
      } else {
        router.replace("/(public)");
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      router.replace("/(public)");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="bg-white h-full">
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 1.75 }}
        >
          <Image
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-12 z-10"
          />
        </View>
        <View className="bg-white p-5 mt-20">
          <CustomButtom
            title="Continue with Google"
            style="flex flex-row items-center justify-center gap-3 bg-white border border-primary"
            textStyle="text-black"
            leftIcon={<Image source={images.google} className="size-7" />}
            onPress={handleLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
