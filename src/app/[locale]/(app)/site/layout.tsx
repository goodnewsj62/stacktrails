import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import PublicFooter from "@/components/layout/Footer";
import PublicHeader from "@/components/layout/Header";

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
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
