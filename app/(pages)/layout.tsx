import { ROUTES } from "@/routes";
import PrimaryNavigation from "@/ui/PrimaryNavigation/PrimaryNavigation";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrimaryNavigation routes={ROUTES}>{children} </PrimaryNavigation>;
}
