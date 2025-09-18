"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

/**
 * useQueryState - Sync a query param with React state
 * @param key The query param key (e.g. "popup")
 * @returns [value, setValue] like useState
 */
export function useQueryParam(
  key: string
): [string | null, (value?: string | null) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [_, startTransition] = useTransition();

  const value = searchParams.get(key);

  const setValue = useCallback(
    (newValue: string | null = "1") => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (newValue === null) {
          params.delete(key);
        } else {
          params.set(key, newValue);
        }

        const query = params.toString();
        const url = query ? `${pathname}?${query}` : pathname;

        router.replace(url, { scroll: false });
      });
    },
    [key, pathname, router, searchParams]
  );

  return [value, setValue];
}
