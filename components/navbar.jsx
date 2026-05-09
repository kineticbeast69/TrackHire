"use client";
import { useState } from "react";
import Link from "next/link";
import { Briefcase, LogOut, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "react-toastify";
export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession(); // 👈 reactive session
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    const result = await signOut();
    if (result.data) {
      router.push("/");
      router.refresh(); // 👈 clears server cache so UI updates
    } else {
      toast.error("Error signing out.");
    }
  };

  return (
    <header className="border-b border-gray-300 bg-white shadow-sm sticky top-0 z-50">
      <nav>
        <div className="container mx-auto flex h-16 items-center px-4 justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary"
          >
            <Briefcase className="h-5 w-5" />
            <span>TrackHire</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              // skeleton while session loads — prevents flicker
              <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
            ) : session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200 p-0"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-white text-sm font-semibold uppercase">
                          {session?.user?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-56 rounded-xl border border-gray-200 shadow-lg p-1.5"
                  >
                    {/* User info */}
                    <DropdownMenuLabel className="px-2 py-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="bg-primary text-white text-sm font-semibold uppercase">
                            {session?.user?.name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {session?.user?.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session?.user?.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1 bg-gray-100" />

                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 shrink-0" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-black"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-primary hover:bg-primary/90">
                    Start for free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
            {isPending ? (
              <div className="h-9 w-full rounded-lg bg-gray-100 animate-pulse" />
            ) : session?.user ? (
              <>
                {/* User info row */}
                <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-primary text-white text-sm font-semibold uppercase">
                      {session?.user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-gray-700 hover:text-black"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>

                <Button
                  onClick={logout}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-black"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Start for free
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
