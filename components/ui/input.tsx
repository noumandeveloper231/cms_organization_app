import React from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";

import { cn } from "@/components/ui/cn";

type InputVariant = "default" | "filled" | "ghost";
type InputSize = "sm" | "md" | "lg";

export type InputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  containerClassName?: string;
  inputClassName?: string;
};

const variantStyles: Record<InputVariant, string> = {
  default: "border border-slate-300 bg-white",
  filled: "border border-slate-200 bg-slate-100",
  ghost: "border border-transparent bg-transparent",
};

const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-2 rounded-md text-sm",
  md: "px-4 py-3 rounded-lg text-base",
  lg: "px-4 py-3.5 rounded-xl text-base",
};

export function Input({
  label,
  helperText,
  error,
  variant = "default",
  size = "md",
  containerClassName,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <View className={cn("gap-1.5", containerClassName)}>
      {label ? <Text className="text-sm font-medium text-slate-700">{label}</Text> : null}

      <TextInput
        placeholderTextColor="#94a3b8"
        className={cn(
          "text-slate-900",
          variantStyles[variant],
          sizeStyles[size],
          error ? "border-red-500" : undefined,
          inputClassName
        )}
        {...props}
      />

      {error ? (
        <Text className="text-xs text-red-600">{error}</Text>
      ) : helperText ? (
        <Text className="text-xs text-slate-500">{helperText}</Text>
      ) : null}
    </View>
  );
}

