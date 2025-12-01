"use client";

import ChatLogsPanel from "@/components/chats/ChatLogsPanel";
import appAxios from "@/lib/axiosClient";
import { cacheKeys } from "@/lib/cacheKeys";
import { BackendRoutes } from "@/routes";
import { useAppStore } from "@/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

type CourseChatProps = {
  courseId: string;
};

const CourseChat: React.FC<CourseChatProps> = ({ courseId }) => {
  const { user } = useAppStore((state) => state);
  const [search, setSearch] = useState("");
  const { data: users_chats } = useInfiniteQuery({
    queryKey: [cacheKeys.USER_CHATS, user?.id, search],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedChatResp> => {
      const resp = await appAxios.get(BackendRoutes.LIST_CHATS, {
        params: {
          q: search,
          page: pageParam,
        },
      });

      return resp.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.has_next ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
  });

  return (
    <section className="border border-gray-300 h-full">
      <ChatLogsPanel />
      {/* <ChatMain /> */}
    </section>
  );
};

export default CourseChat;
