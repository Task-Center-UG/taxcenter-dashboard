export default function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const proxyUrl = "/api";

  const defaultHeaders: HeadersInit = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const fullUrl = `${proxyUrl}/v1/${endpoint}`;

  return fetch(fullUrl, config);
}
