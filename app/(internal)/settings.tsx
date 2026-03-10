import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";

export default function InternalSettingsScreen() {
  const { logout } = useAuth();

  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText type="defaultSemiBold">Profile management</ThemedText>
      <ThemedText type="defaultSemiBold">Notifications</ThemedText>
      <Button
        title="Logout"
        variant="outline"
        className="mt-8"
        onPress={async () => {
          await logout();
          router.replace("/auth/login");
        }}
      />
    </Screen>
  );
}

