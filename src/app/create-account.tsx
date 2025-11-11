import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Redirect } from "expo-router";

// const shouldCreateAccount = false;
export default function CreateAccountScreen() {
    // if (!shouldCreateAccount) {
    //     return <Redirect href={`/sign-in`} />
    // }
    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Create Account Screen
            </AppText>
        </View>
    );
}
