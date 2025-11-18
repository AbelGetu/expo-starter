import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = ''
}) => {
    return (
        <View className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-6", className)}>
            {children}
        </View>
    );
};