// app/sign-in.tsx
import { View, ScrollView } from "react-native";
import { Link, Redirect } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { AppText } from "@/components/AppText";
import { useAuthState, useIsLoggedIn, useIsLoading, useAuthError } from "@/utils/stores/authStore";
import { useState } from "react";

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { logIn, clearError } = useAuthState();
    const isLoggedIn = useIsLoggedIn();
    const isLoading = useIsLoading();
    const error = useAuthError();

    // Redirect if already logged in
    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />;
    }

    const handleLogin = async () => {
        try {
            await logIn({ email, password });
        } catch (error) {
            // Error is handled in the store
            console.log('Login error:', error);
        }
    };

    const isFormValid = email && password;

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="flex-1 min-h-screen">
                {/* Header Section */}
                <View className="bg-white pt-16 pb-8 px-6 rounded-b-3xl shadow-sm">
                    <AppText center size="heading" className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </AppText>
                    <AppText center size="large" className="text-gray-600 text-base">
                        Sign in to your account
                    </AppText>
                </View>

                {/* Login Form */}
                <View className="flex-1 px-6 pt-8">
                    <View className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            className="mb-4"
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry
                            autoComplete="password"
                            className="mb-6"
                        />

                        <Button
                            title={isLoading ? "Signing In..." : "Sign In"}
                            onPress={handleLogin}
                            loading={isLoading}
                            disabled={!isFormValid || isLoading}
                            variant="primary"
                            size="lg"
                        />
                    </View>

                    {error && (
                        <View className="mb-4">
                            <Alert
                                message={error}
                                variant="error"
                            />
                            <Button
                                title="Clear Error"
                                onPress={clearError}
                                variant="tertiary"
                                size="sm"
                                className="mt-2"
                            />
                        </View>
                    )}

                    {/* Sign In Link */}
                    <View className="flex-column justify-center items-center mt-8 pt-6 border-t border-gray-200">
                        <AppText className="text-gray-600">Don't have an account? </AppText>
                        <Link href="/create-account" asChild>
                            <Button
                                title="Sign up"
                                variant="tertiary"
                                size="sm"
                                className="p-2 border-md border-dark"
                            />
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}