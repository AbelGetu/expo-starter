import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function IndexScreen() {

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Settings Screen
      </AppText>
      <Link asChild push href={`/modal`}>
        <Button title="Open modal" />
      </Link>
    </View>
  );
}
