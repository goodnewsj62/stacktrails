import SideDesign from "@/components/auth/SideDesign";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <aside className="hidden basis-[50%] max-w-[600px] h-screen lg:block">
        <SideDesign />
      </aside>
      <section className="grow h-screen">{children}</section>
    </main>
  );
}
