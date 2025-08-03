import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please set the EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable."
  );
}

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../../assets/fonts/Quicksand-Light.ttf"),
  });

  const isAuthenticated = false;

  useEffect(() => {
    if (error) {
      console.log("fonts error", error);
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)/(tabs)" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <InitialLayout />
    </ClerkProvider>
  );
}
