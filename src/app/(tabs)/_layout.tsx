import { useAuthState } from "@/utils/authStore";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    // const { isVip } = useAuthState();
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'teal' }} backBehavior="order">
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                }} />
            {/* <Tabs.Protected guard={isVip}>
                <Tabs.Screen name="vip" />
            </Tabs.Protected> */}
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarLabel: "Settings",
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" color={color} size={size} />
                    )
                }} />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarLabel: "Profile",
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" color={color} size={size} />
                    )
                }} />
        </Tabs>
    )
}