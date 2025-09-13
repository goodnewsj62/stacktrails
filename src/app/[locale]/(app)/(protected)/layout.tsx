import Protected from "@/components/auth/Protected";
import { RouterWrapper } from "@/hooks/useBlockNavigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <Protected>
      <RouterWrapper>{children}</RouterWrapper>
    </Protected>
  );
}
