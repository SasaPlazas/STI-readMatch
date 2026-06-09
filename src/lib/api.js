import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

export const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  extra.EXPO_PUBLIC_API_URL ||
  'https://sti-readmatch.onrender.com';

export async function apiFetch(path, options = {}) {
  const url = `${apiBaseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  let response;
  try {
    response = await fetch(url, {
      ...options,
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
    throw new Error(payload?.detail || payload?.error || `API error ${response.status}`);
  }

  return payload;
}
