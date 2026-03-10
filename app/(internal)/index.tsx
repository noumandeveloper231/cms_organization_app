import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";

export default function InternalDashboardScreen() {
  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Dashboard</ThemedText>
      <ThemedText type="defaultSemiBold">Today's tasks</ThemedText>
      <ThemedText type="defaultSemiBold">Upcoming interviews</ThemedText>
      <ThemedText type="defaultSemiBold">Pending approvals</ThemedText>
    </Screen>
  );
}

