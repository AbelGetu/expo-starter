// app/_layout.tsx
import { Stack } from "expo-router";
import "../../global.css";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthState, useIsLoading } from "@/utils/stores/authStore";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function RootLayout() {
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    initializeAuth
  } = useAuthState();

  const isLoading = useIsLoading();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Show loading screen while checking authentication state
  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        {/* Authenticated Routes */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack.Protected>

        {/* Unauthenticated Routes (After Onboarding) */}
        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
              animation: 'fade',
              gestureEnabled: false
            }}
          />
          {/* <Stack.Protected guard={shouldCreateAccount}> */}
          <Stack.Screen
            name="create-account"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
        </Stack.Protected>
        {/* </Stack.Protected> */}

        {/* Onboarding Flow */}
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}