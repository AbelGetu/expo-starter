import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";
import { useAuthState } from "@/utils/stores/authStore";

export default function IndexScreen() {
  const { user, isLoggedIn } = useAuthState()
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Home Screen
        {isLoggedIn ? "User is logged in" : "User is not logged in."}
        {user?.email} || {user?.full_name}
      </AppText>
      <Link asChild push href={`/modal`}>
        <Button title="Open modal" />
      </Link>
    </View>
  );
}
