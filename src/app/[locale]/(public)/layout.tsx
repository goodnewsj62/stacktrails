import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import PublicFooter from "@/components/layout/Footer";
import PublicHeader from "@/components/layout/Header";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <>
      <PublicHeader locale={locale} />
      <CenterOnLgScreen props={{ component: "main" }}>
        {children}
      </CenterOnLgScreen>
      <PublicFooter />
    </>
  );
}
