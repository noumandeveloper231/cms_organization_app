import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function HiringJobsScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Requisitions / Jobs</ThemedText>
      <ThemedText type="defaultSemiBold">View job openings</ThemedText>
      <ThemedText type="defaultSemiBold">See candidate submissions for each job</ThemedText>
    </Screen>
  );
}

