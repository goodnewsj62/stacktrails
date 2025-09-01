import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import PublicHeader from "@/components/layout/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <CenterOnLgScreen>{children}</CenterOnLgScreen>
      <footer></footer>
    </>
  );
}
