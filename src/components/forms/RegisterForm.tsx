import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { useAuthState, useIsLoading, useAuthError } from '@/utils/stores/authStore';

export const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { createAccount, clearError } = useAuthState();
    const isLoading = useIsLoading();
    const error = useAuthError();

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            // You could set a local error state here
            return;
        }

        try {
            await createAccount({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword;
    const passwordsMatch = formData.password === formData.confirmPassword;

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center p-6">
                <Card className="mb-6">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChangeText={handleChange('name')}
                        placeholder="Enter your full name"
                        autoComplete="name"
                    />

                    <Input
                        label="Email"
                        value={formData.email}
                        onChangeText={handleChange('email')}
                        placeholder="Enter your email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        value={formData.password}
                        onChangeText={handleChange('password')}
                        placeholder="Create a password"
                        secureTextEntry
                        autoComplete="password-new"
                    />

                    <Input
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        placeholder="Confirm your password"
                        secureTextEntry
                        autoComplete="password-new"
                        error={!passwordsMatch && formData.confirmPassword ? "Passwords don't match" : undefined}
                    />

                    <Button
                        title="Create Account"
                        onPress={handleRegister}
                        loading={isLoading}
                        disabled={!isFormValid || !passwordsMatch || isLoading}
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