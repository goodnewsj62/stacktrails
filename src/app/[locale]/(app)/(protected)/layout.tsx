import Protected from "@/components/auth/Protected";
import ReplaceProviderWarningWrapper from "@/components/auth/ReplaceProviderWarning";
import { RouterWrapper } from "@/hooks/useBlockNavigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <Protected>
      <RouterWrapper>
        <ReplaceProviderWarningWrapper>
          {children}
        </ReplaceProviderWarningWrapper>
      </RouterWrapper>
    </Protected>
  );
}
