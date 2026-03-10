import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function JobSeekerHomeScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Home</ThemedText>
      <ThemedText type="defaultSemiBold">Upcoming shifts</ThemedText>
      <ThemedText type="defaultSemiBold">Pending paperwork</ThemedText>
      <ThemedText type="defaultSemiBold">Recent timecards</ThemedText>
      <ThemedText type="defaultSemiBold">Job application updates</ThemedText>
    </Screen>
  );
}

