import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { useAuthState } from "@/utils/stores/authStore";
import { Button } from "@/components/Button";

export default function VipScreen() {
    const { logOut } = useAuthState();
    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Profile Screen
            </AppText>

            <Button title="Sign out" onPress={logOut} />
        </View>
    );
}
