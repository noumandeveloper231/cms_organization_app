import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function HiringTimecardsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Timecards</ThemedText>
      <ThemedText type="defaultSemiBold">Review submitted timecards</ThemedText>
      <ThemedText type="defaultSemiBold">Approve or reject timecards</ThemedText>
    </Screen>
  );
}

