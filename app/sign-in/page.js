import { Button } from "@/components/ui/button";
import SignInForm from "@/components/signinform";
import Google from "@/components/google";
import Linkedin from "@/components/linkedin";
import { Briefcase } from "lucide-react";
import Link from "next/link";
export default function SignIn() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl rounded-2xl shadow-lg border border-gray-200 bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT — Social Login */}
          <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 px-10 py-14 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Sign in quickly with your existing account
              </p>
            </div>

            <div className="w-full space-y-3">
              {/* Google */}
              <Google />

              {/* LinkedIn */}
              <Linkedin />
            </div>

            <p className="text-xs text-center text-muted-foreground px-4">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* RIGHT — Email Login Form */}
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
