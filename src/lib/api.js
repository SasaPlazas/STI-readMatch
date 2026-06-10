import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};
const configuredApiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL || extra.EXPO_PUBLIC_API_URL || "";
const shouldUseLocalApi =
  process.env.EXPO_PUBLIC_USE_LOCAL_API === "true" ||
  extra.EXPO_PUBLIC_USE_LOCAL_API === "true";
const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(
  configuredApiBaseUrl,
);

export const apiBaseUrl =
  configuredApiBaseUrl && (!isLocalApiUrl || shouldUseLocalApi)
    ? configuredApiBaseUrl
    : "https://sti-readmatch-production.up.railway.app";

export async function apiFetch(path, options = {}) {
  const url = `${apiBaseUrl}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  const timeoutMs = Number.isFinite(options.timeoutMs)
    ? options.timeoutMs
    : 30000;
  const { timeoutMs: _timeoutMs, ...fetchOptions } = options ?? {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      payload?.detail || payload?.error || `API error ${response.status}`,
    );
  }

  return payload;
}
