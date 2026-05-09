import { Briefcase } from "lucide-react";
import SignupForm from "@/components/signupform";
import Google from "@/components/google";
import Linkedin from "@/components/linkedin";
import Link from "next/link";

export default function Signup() {
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
              <h2 className="text-xl font-bold text-gray-900">
                Welcome to TrackHire
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign up quickly with your existing account
              </p>
            </div>

            <div className="w-full space-y-3">
              {/* google button */}
              <Google />
              {/* linkedin button */}
              <Linkedin />
            </div>

            {/* terms and policy */}
            <p className="text-xs text-center text-muted-foreground px-4">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* RIGHT — Email Signup Form */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
