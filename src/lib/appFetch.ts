const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1";

export interface FetchResponse<T> {
  data: T; // The parsed response body
  status: number; // HTTP status code
  ok: boolean; // Equivalent to response.ok
  headers: Headers; // Response headers
  raw: Response; // Original Response object
}

// utils/customFetch.ts
export async function appFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  }
): Promise<FetchResponse<T>> {
  const makeRequest = async () => {
    return fetch(`${baseURL}${input}`, {
      ...init,

      credentials: "include", // ✅ always include cookies for auth
    });
  };

  // First attempt
  let response = await makeRequest();

  if (response.status === 401) {
    // Attempt refresh
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        // ⚡ Pass through same revalidate/cache if you want refresh to respect it
        next: init?.next,
        cache: init?.cache ?? "no-store",
        body: null,
      }
    );

    if (!refreshRes.ok) {
      throw new Error("Unauthorized and refresh failed");
    }

    // Retry original request once
    response = await makeRequest();
  }

  const data = (await response.json()) as T;

  return {
    data,
    status: response.status,
    ok: response.ok,
    headers: response.headers,
    raw: response,
  };
}
