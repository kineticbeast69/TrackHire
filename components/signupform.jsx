"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import signupSchema from "@/lib/validation/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const [authErr, setAuthErr] = useState("");

  const togglePassword = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const signupSubmit = async (data) => {
    try {
      const res = await signUp.email({
        email: data.email,
        name: data.email,
        password: data.password,
      });
      // console.log(res);
      if (res.data === null) {
        setAuthErr(res.error.message);
        return;
      }
      toast.info("Please sign-in to continue.");
      reset();
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center px-10 py-14">
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-bold text-gray-900">Create your account</h2>
        {authErr ? (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {authErr}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Fill in your details below
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(signupSubmit)}>
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20"
              {...register("name")}
              maxLength={50}
            />
            {errors.name && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Create a strong password"
                className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => togglePassword("password")}
                tabIndex={-1}
                aria-label={
                  showPassword.password ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
              >
                {showPassword.password ? (
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="confirm_password"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm_password"
                type={showPassword.confirm_password ? "text" : "password"}
                placeholder="Repeat your password"
                className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 pr-10"
                {...register("confirm_password")}
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm_password")}
                tabIndex={-1}
                aria-label={
                  showPassword.confirm_password
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
              >
                {showPassword.confirm_password ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md mt-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              "Create Account"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-1">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
