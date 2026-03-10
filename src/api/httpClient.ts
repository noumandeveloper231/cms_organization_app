import { Platform } from "react-native";
import Constants from "expo-constants";

const rawBase =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function getApiBaseUrl(): string {
  if (Platform.OS === "web") return rawBase;
  if (!rawBase.includes("localhost")) return rawBase;

  // Physical device / Expo Go: use same host as Metro bundler (from expo-constants).
  const hostUri =
    Constants.expoConfig?.hostUri ??
    (Constants as unknown as { manifest?: { debuggerHost?: string } }).manifest?.debuggerHost;
  if (hostUri) {
    const devHost = hostUri.split(":")[0];
    if (devHost) return rawBase.replace(/localhost/g, devHost);
  }

  // Android emulator fallback: 10.0.2.2 is the host machine.
  if (Platform.OS === "android") {
    return rawBase.replace(/localhost/g, "10.0.2.2");
  }

  return rawBase;
}

const API_BASE_URL = getApiBaseUrl();

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

interface RequestOptions extends RequestInit {
  method?: HttpMethod;
  authToken?: string | null;
}

function buildUrl(path: string): string {
  const trimmedBase = API_BASE_URL.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { authToken, headers, method = "GET", ...rest } = options;

  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(headers || {}),
      },
      ...rest,
    });

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");

    const body = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const message =
        (body && (body.message as string)) ||
        `Request failed with status ${res.status}`;

      return {
        data: null,
        error: {
          status: res.status,
          message,
          details: body,
        },
      };
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: body as T,
      error: null,
    };
  } catch (e: any) {
    return {
      data: null,
      error: {
        status: 0,
        message: e?.message ?? "Network error",
      },
    };
  }
}

