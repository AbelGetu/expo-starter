import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface LoadingScreenProps {
    message?: string;
    className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading...',
    className = ''
}) => {
    return (
        <View className={cn("flex-1 justify-center items-center bg-white", className)}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-600 mt-4 text-lg">
                {message}
            </Text>
        </View>
    );
};