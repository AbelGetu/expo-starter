import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAuthState } from "@/utils/authStore";

export default function IndexScreen() {
  const { logOut } = useAuthState();
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Settings Screen
      </AppText>
      <Button title="Sign out" onPress={logOut} />
    </View>
  );
}
