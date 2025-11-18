import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface AlertProps {
    message: string;
    variant?: 'error' | 'success' | 'warning' | 'info';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    message,
    variant = 'error',
    className = ''
}) => {
    const variantClasses = {
        error: 'bg-red-50 border-red-200',
        success: 'bg-green-50 border-green-200',
        warning: 'bg-yellow-50 border-yellow-200',
        info: 'bg-blue-50 border-blue-200',
    };

    const textClasses = {
        error: 'text-red-800',
        success: 'text-green-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800',
    };

    return (
        <View className={cn(
            "border rounded-lg p-4 mb-4",
            variantClasses[variant],
            className
        )}>
            <Text className={cn("text-sm font-medium", textClasses[variant])}>
                {message}
            </Text>
        </View>
    );
};