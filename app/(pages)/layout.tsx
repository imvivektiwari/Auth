import { ROUTES } from "@/routes";
import PrimaryNavigation from "@/ui/tabs/PrimaryNavigation/PrimaryNavigation";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <PrimaryNavigation routes={ROUTES} />
      <div className="mx-auto max-w-3xl">{children}</div>
    </main>
  );
}
