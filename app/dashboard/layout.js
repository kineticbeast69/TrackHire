import { auth, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
