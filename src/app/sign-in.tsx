import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";
import { useAuthState } from "@/utils/authStore";

export default function SignInScreen() {
    const { logIn, logInAsVip } = useAuthState()
    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Sign In Screen
            </AppText>
            <Button title="Sign in" onPress={logIn} />
            <Button title="Sign in as  VIP 👑" onPress={logInAsVip} />
            <Link asChild push href={`/modal`}>
                <Button title="Open modal" theme="secondary" />
            </Link>
        </View>
    );
}
