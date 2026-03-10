import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function HiringDashboardScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Dashboard</ThemedText>
      <ThemedText type="defaultSemiBold">Overview of open job requests</ThemedText>
      <ThemedText type="defaultSemiBold">Pending approvals</ThemedText>
      <ThemedText type="defaultSemiBold">Recent candidates</ThemedText>
    </Screen>
  );
}

