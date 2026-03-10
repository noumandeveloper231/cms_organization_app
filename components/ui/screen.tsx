import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView, type ThemedViewProps } from "@/components/themed-view";
import { cn } from "@/components/ui/cn";

export type ScreenProps = ThemedViewProps & {
  /** Tailwind className applied to inner container */
  className?: string;
  /** Which edges to apply safe-area padding to */
  edges?: Array<"top" | "right" | "bottom" | "left">;
};

export function Screen({
  className,
  edges = ["top", "right", "left"],
  style,
  children,
  ...rest
}: ScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      <ThemedView
        className={cn("flex-1", className)}
        style={style}
        {...rest}
      >
        {children}
      </ThemedView>
    </SafeAreaView>
  );
}

