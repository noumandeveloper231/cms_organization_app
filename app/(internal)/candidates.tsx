import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function InternalCandidatesScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Candidates</ThemedText>
      <ThemedText type="defaultSemiBold">Search candidates</ThemedText>
      <ThemedText type="defaultSemiBold">View candidate profiles</ThemedText>
      <ThemedText type="defaultSemiBold">Update candidate status</ThemedText>
      <ThemedText type="defaultSemiBold">Add notes</ThemedText>
    </Screen>
  );
}

