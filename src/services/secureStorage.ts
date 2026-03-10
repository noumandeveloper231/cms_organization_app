import * as SecureStore from "expo-secure-store";

/** Check at runtime; on web/dev the native module may be a stub without getValueWithKeyAsync. */
async function isAvailable(): Promise<boolean> {
  try {
    return typeof SecureStore?.isAvailableAsync === "function" && (await SecureStore.isAvailableAsync());
  } catch {
    return false;
  }
}

export async function saveString(key: string, value: string): Promise<void> {
  if (!(await isAvailable())) return;
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    // Ignore; SecureStore not available (e.g. web)
  }
}

export async function getString(key: string): Promise<string | null> {
  if (!(await isAvailable())) return null;
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function deleteItem(key: string): Promise<void> {
  if (!(await isAvailable())) return;
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    // Ignore; SecureStore not available (e.g. web)
  }
}

