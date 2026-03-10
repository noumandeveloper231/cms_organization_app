import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function JobSeekerDocumentsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Documents</ThemedText>
      <ThemedText type="defaultSemiBold">View onboarding paperwork</ThemedText>
      <ThemedText type="defaultSemiBold">Upload required documents</ThemedText>
      <ThemedText type="defaultSemiBold">Sign required forms</ThemedText>
    </Screen>
  );
}

