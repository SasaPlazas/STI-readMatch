import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

export const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  extra.EXPO_PUBLIC_API_URL ||
  'http://localhost:8000';

export async function apiFetch(path, options = {}) {
  const url = `${apiBaseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

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
    throw new Error(payload?.detail || payload?.error || `API error ${response.status}`);
  }

  return payload;
}
