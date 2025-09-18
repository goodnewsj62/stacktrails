"use client";

import { useAppStore } from "@/store";

export const useUploads = () => {
  const { addJob, updateJob, removeJob, jobs } = useAppStore((state) => state);
  return { addJob, updateJob, removeJob, jobs };
};
