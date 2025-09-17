// hooks/useBlockingRouter.tsx
"use client";

import { useRouter as useNextRouter } from "@/i18n/navigation";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useUploads } from "./useUploads";

type BlockingCondition = () => boolean;
type ConfirmationMessage = () => string;

interface BlockingRouterContextType {
  router: ReturnType<typeof useNextRouter>;
  addBlockingCondition: (
    id: string,
    condition: BlockingCondition,
    message?: ConfirmationMessage
  ) => void;
  removeBlockingCondition: (id: string) => void;
  hasBlockingConditions: () => boolean;
}

const BlockingRouterContext = createContext<BlockingRouterContextType | null>(
  null
);

interface RouterWrapperProps {}

// Store blocking conditions
const blockingConditions = new Map<
  string,
  { condition: BlockingCondition; message?: ConfirmationMessage }
>();

export function RouterWrapper({
  children,
}: RouterWrapperProps & PropsWithChildren) {
  const nextRouter = useNextRouter();

  // Check if any blocking conditions are active
  const hasBlockingConditions = (): boolean => {
    return Array.from(blockingConditions.values()).some(({ condition }) =>
      condition()
    );
  };

  // Get confirmation message from active conditions
  const getConfirmationMessage = (): string => {
    for (const { condition, message } of blockingConditions.values()) {
      if (condition()) {
        return message
          ? message()
          : "You have unsaved changes. Are you sure you want to leave?";
      }
    }
    return "Are you sure you want to leave?";
  };

  // Add blocking condition
  const addBlockingCondition = (
    id: string,
    condition: BlockingCondition,
    message?: ConfirmationMessage
  ) => {
    blockingConditions.set(id, { condition, message });
  };

  // Remove blocking condition
  const removeBlockingCondition = (id: string) => {
    blockingConditions.delete(id);
  };

  // Create wrapped router with confirmation
  const createConfirmedMethod = <T extends any[]>(
    originalMethod: (...args: T) => void
  ) => {
    return (...args: T) => {
      if (hasBlockingConditions() && !confirm(getConfirmationMessage())) {
        return;
      }
      return originalMethod.apply(nextRouter, args);
    };
  };

  // Wrapped router object
  const router = {
    ...nextRouter,
    push: createConfirmedMethod(nextRouter.push),
    replace: createConfirmedMethod(nextRouter.replace),
    back: createConfirmedMethod(nextRouter.back),
    forward: createConfirmedMethod(nextRouter.forward),
  };

  // Handle browser navigation (back/forward buttons, refresh, close)
  useEffect(() => {
    // Handle browser refresh/close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasBlockingConditions()) {
        e.preventDefault();
        // e.returnValue = getConfirmationMessage();
        return "";
      }
    };

    // Handle browser back/forward buttons
    const handlePopState = (e: PopStateEvent) => {
      if (hasBlockingConditions() && !confirm(getConfirmationMessage())) {
        // Restore current state to prevent navigation
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const contextValue: BlockingRouterContextType = {
    router,
    addBlockingCondition,
    removeBlockingCondition,
    hasBlockingConditions,
  };

  return (
    <BlockingRouterContext value={contextValue}>
      {children}
    </BlockingRouterContext>
  );
}

// Custom hook to use the blocking router
export function useRouter() {
  const context = useContext(BlockingRouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterWrapper");
  }
  return context.router;
}

// Hook to manage blocking conditions
export function useNavigationBlocker(
  id: string,
  condition: BlockingCondition,
  message?: ConfirmationMessage
) {
  const context = useContext(BlockingRouterContext);
  if (!context) {
    throw new Error("useNavigationBlocker must be used within a RouterWrapper");
  }

  useEffect(() => {
    context.addBlockingCondition(id, condition, message);
    return () => {
      context.removeBlockingCondition(id);
    };
  }, [id, condition, message, context]);

  return {
    hasBlockingConditions: context.hasBlockingConditions,
  };
}

// Simplified hook for upload blocking (your specific use case)
export function useUploadBlocker() {
  const { jobs } = useUploads(); // Your upload context

  const hasActiveUploads = () => jobs.some((j) => j.status === "uploading");
  const getUploadMessage = () =>
    "Uploads are in progress. Are you sure you want to leave?";

  return useNavigationBlocker("uploads", hasActiveUploads, getUploadMessage);
}

// Usage in your app layout or root component:
/*
// app/layout.tsx or pages/_app.tsx
import { RouterWrapper } from '@/hooks/useBlockingRouter';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <RouterWrapper>
          <UploadProvider>
            {children}
          </UploadProvider>
        </RouterWrapper>
      </body>
    </html>
  );
}
*/

// Usage in components:
/*
// Any component
import { useRouter } from '@/hooks/useBlockingRouter';

function MyComponent() {
  const router = useRouter(); // This is now the wrapped router
  
  // Use normally - blocking happens automatically
  const handleNavigation = () => {
    router.push('/some-route'); // Will show confirmation if blocking conditions are active
  };

  return <button onClick={handleNavigation}>Navigate</button>;
}

// Component with uploads
import { useUploadBlocker } from '@/hooks/useBlockingRouter';

function UploadComponent() {
  // Automatically blocks navigation when uploads are active
  useUploadBlocker();
  
  return <div>Upload component</div>;
}

// Custom blocking condition
import { useNavigationBlocker } from '@/hooks/useBlockingRouter';

function FormComponent() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Block navigation when form has unsaved changes
  useNavigationBlocker(
    'form-changes',
    () => hasUnsavedChanges,
    () => 'You have unsaved changes. Are you sure you want to leave?'
  );

  return <form>...</form>;
}
*/
