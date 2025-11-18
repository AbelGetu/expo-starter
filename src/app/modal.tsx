import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function ModalScreen() {
    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Modal Screen
            </AppText>
        </View>
    );
}
