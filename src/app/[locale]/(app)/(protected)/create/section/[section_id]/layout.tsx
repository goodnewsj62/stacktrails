import AppLayout from "@/components/layout/AppLayout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
