import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function InternalJobsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Jobs</ThemedText>
      <ThemedText type="defaultSemiBold">View job postings</ThemedText>
      <ThemedText type="defaultSemiBold">View applicants for each job</ThemedText>
    </Screen>
  );
}

