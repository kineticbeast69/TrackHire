"use client";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import signinSchema from "@/lib/validation/signin.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [authErr, setAuthErr] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signinSchema) });
  const signinSubmit = async (data) => {
    try {
      const res = await signIn.email({
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res.data === null) {
        setAuthErr(res.error.message);
        return;
      }
      reset();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center px-10 py-14">
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        {authErr ? (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {authErr}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter your credentials below
          </p>
        )}
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(signinSubmit)}>
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20"
            {...register("email")}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type={isSubmitting ? "button" : "submit"}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md mt-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            "Sign In"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground pt-1">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign up for free
          </Link>
        </p>
      </form>
    </div>
  );
}
