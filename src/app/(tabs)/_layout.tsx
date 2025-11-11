import { useAuthState } from "@/utils/authStore";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const { isVip } = useAuthState();
    return (
        <Tabs>
            <Tabs.Screen name="index" />
            <Tabs.Protected guard={isVip}>
                <Tabs.Screen name="vip" />
            </Tabs.Protected>
            <Tabs.Screen name="settings" />
        </Tabs>
    )
}