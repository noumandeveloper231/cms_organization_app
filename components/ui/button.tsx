import React from "react";
import { ActivityIndicator, Pressable, type PressableProps, Text, View } from "react-native";

import { cn } from "@/components/ui/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "destructive"
  | "info"
  | "ghost"
  | "outline";

type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ButtonProps = Omit<PressableProps, "children"> & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Preferred loading prop */
  isLoading?: boolean;
  /** Backwards compatible alias */
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
};

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: { container: "bg-blue-600 active:bg-blue-700", text: "text-white" },
  secondary: { container: "bg-slate-600 active:bg-slate-700", text: "text-white" },
  success: { container: "bg-emerald-600 active:bg-emerald-700", text: "text-white" },
  danger: { container: "bg-red-600 active:bg-red-700", text: "text-white" },
  destructive: { container: "bg-red-600 active:bg-red-700", text: "text-white" },
  info: { container: "bg-sky-600 active:bg-sky-700", text: "text-white" },
  ghost: { container: "bg-transparent", text: "text-blue-600" },
  outline: { container: "bg-transparent border border-slate-300", text: "text-slate-900" },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; spinner: number }> = {
  sm: { container: "px-3 py-2 rounded-md", text: "text-sm", spinner: 16 },
  md: { container: "px-4 py-3 rounded-lg", text: "text-base", spinner: 18 },
  lg: { container: "px-5 py-3.5 rounded-lg", text: "text-base", spinner: 20 },
  xl: { container: "px-6 py-4 rounded-xl", text: "text-lg", spinner: 22 },
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  isLoading,
  loading,
  disabled,
  fullWidth,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const effectiveLoading = isLoading ?? loading ?? false;
  const isDisabled = disabled || effectiveLoading;
  const styles = variantStyles[variant];
  const sizing = sizeStyles[size];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        "flex-row items-center justify-center",
        sizing.container,
        styles.container,
        fullWidth ? "w-full" : undefined,
        isDisabled ? "opacity-50" : undefined,
        className
      )}
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {effectiveLoading ? (
          <ActivityIndicator
            size={sizing.spinner}
            color={styles.text.includes("text-white") ? "#ffffff" : "#2563eb"}
          />
        ) : null}
        <Text className={cn("font-semibold", sizing.text, styles.text, textClassName)}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

