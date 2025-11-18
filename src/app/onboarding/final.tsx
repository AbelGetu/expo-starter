import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAuthState } from "@/utils/stores/authStore";
// import { useAuthState } from "@/utils/authStore";

export default function OnboardingFinalScreen() {
  const { completeOnboarding } = useAuthState();
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Onboarding Screen 2
      </AppText>
      <Button title="Complete onboarding" onPress={completeOnboarding} />
    </View>
  );
}
