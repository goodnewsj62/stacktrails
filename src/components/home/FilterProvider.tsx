"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type HomeFilter = {
  sort: "recent" | "top_rated" | "most_enrolled";
  level: null | "beginner" | "intermediate" | "advanced" | "expert";
};

export const FilterContext = createContext<{
  value: HomeFilter;
  setValue: (val: Partial<HomeFilter>) => void;
}>({
  value: {
    sort: "recent",
    level: null,
  },
  setValue: () => {},
});

export function FilterProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<HomeFilter>({
    sort: "recent",
    level: null,
  });

  return (
    <FilterContext
      value={{
        value: filters,
        setValue: (val: Partial<HomeFilter>) =>
          setFilters((state) => ({ ...state, ...val })),
      }}
    >
      {children}
    </FilterContext>
  );
}

export const useFilter = () => {
  return useContext(FilterContext);
};
