import {
    Pressable,
    Text,
    ActivityIndicator,
    type PressableProps
} from "react-native";
import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends PressableProps {
    title: string;
    onPress?: () => void;
    variant?: "primary" | "secondary" | "danger" | "tertiary";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    className,
    ...rest
}) => {
    const sizeClasses = {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={cn(
                "flex-row items-center justify-center rounded-lg border",
                variant === "primary" && "bg-blue-500 border-blue-500",
                variant === "secondary" && "bg-white border-gray-300",
                variant === "danger" && "bg-red-500 border-red-500",
                variant === "tertiary" && "bg-transparent border-transparent",
                sizeClasses[size],
                (disabled || loading) && "opacity-50",
                className
            )}
            {...rest}
        >
            {loading && <ActivityIndicator size="small" color="white" className="mr-2" />}
            <Text
                className={cn(
                    "font-semibold tracking-wider",
                    (variant === "primary" || variant === "danger") && "text-white",
                    variant === "secondary" && "text-gray-800",
                    variant === "tertiary" && "text-gray-800",
                    textSizeClasses[size]
                )}
            >
                {title}
            </Text>
        </Pressable>
    );
};