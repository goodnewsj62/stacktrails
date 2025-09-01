import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import PublicFooter from "@/components/layout/Footer";
import PublicHeader from "@/components/layout/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <CenterOnLgScreen props={{ component: "main" }}>
        {children}
      </CenterOnLgScreen>
      <PublicFooter />
    </>
  );
}
