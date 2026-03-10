import React from "react";

import { ThemedText } from "@/components/themed-text";
import { Screen } from "@/components/ui/screen";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";

export default function HiringProfileScreen() {
  const { logout } = useAuth();

  return (
    <Screen className="gap-4 p-6">
      <ThemedText type="title">Profile / Settings</ThemedText>
      <ThemedText type="defaultSemiBold">Manage personal information</ThemedText>
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

