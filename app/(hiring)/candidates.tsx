import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function HiringCandidatesScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Candidates</ThemedText>
      <ThemedText type="defaultSemiBold">View candidate profiles</ThemedText>
      <ThemedText type="defaultSemiBold">Review resumes</ThemedText>
      <ThemedText type="defaultSemiBold">Provide feedback</ThemedText>
    </Screen>
  );
}

