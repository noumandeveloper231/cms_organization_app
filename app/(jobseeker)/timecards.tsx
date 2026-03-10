import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function JobSeekerTimecardsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Timecards</ThemedText>
      <ThemedText type="defaultSemiBold">Enter weekly hours</ThemedText>
      <ThemedText type="defaultSemiBold">Edit hours before approval</ThemedText>
      <ThemedText type="defaultSemiBold">Submit timecards</ThemedText>
      <ThemedText type="defaultSemiBold">Track approval status</ThemedText>
    </Screen>
  );
}

