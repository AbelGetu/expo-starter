import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface InputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    className?: string;
    inputClassName?: string;
    [key: string]: any;
}

export const Input: React.FC<InputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    error,
    className = '',
    inputClassName = '',
    ...props
}) => {
    return (
        <View className={cn("mb-4", className)}>
            {label && (
                <Text className="text-gray-700 text-sm font-medium mb-2">
                    {label}
                </Text>
            )}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                className={cn(
                    "border rounded-lg px-4 py-5 bg-white",
                    error ? "border-red-500" : "border-gray-300",
                    inputClassName
                )}
                placeholderTextColor="#9CA3AF"
                {...props}
            />
            {error && (
                <Text className="text-red-500 text-sm mt-1">
                    {error}
                </Text>
            )}
        </View>
    );
};