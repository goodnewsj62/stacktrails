const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1";

// utils/customFetch.ts
export async function appFetch(
  input: RequestInfo | URL,
  init?: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  }
): Promise<any> {
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

  return response;
}
