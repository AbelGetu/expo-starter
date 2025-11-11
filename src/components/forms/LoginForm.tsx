import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { useAuthState, useIsLoading, useAuthError } from '@/utils/stores/authStore';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { logIn, clearError } = useAuthState();
    const isLoading = useIsLoading();
    const error = useAuthError();

    const handleLogin = async () => {
        try {
            await logIn({ email, password });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const isFormValid = email && password;

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center p-6">
                <Card className="mb-6">
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                        autoComplete="password"
                    />

                    <Button
                        title="Sign In"
                        onPress={handleLogin}
                        loading={isLoading}
                        disabled={!isFormValid || isLoading}
                        variant="primary"
                        size="lg"
                    />
                </Card>

                {error && (
                    <Alert
                        message={error}
                        variant="error"
                        className="mb-4"
                    />
                )}

                <View className="flex-row justify-center">
                    <Button
                        title="Clear Error"
                        onPress={clearError}
                        variant="tertiary"
                        size="sm"
                    />
                </View>
            </View>
        </ScrollView>
    );
};