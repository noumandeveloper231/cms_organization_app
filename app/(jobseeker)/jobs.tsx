import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function JobSeekerJobsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Jobs</ThemedText>
      <ThemedText type="defaultSemiBold">View available jobs</ThemedText>
      <ThemedText type="defaultSemiBold">View job details</ThemedText>
      <ThemedText type="defaultSemiBold">Apply for jobs</ThemedText>
      <ThemedText type="defaultSemiBold">Track application status</ThemedText>
    </Screen>
  );
}

