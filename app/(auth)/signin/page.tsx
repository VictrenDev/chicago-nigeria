"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { callApi } from "@/app/libs/helper/callApi";
import { ApiResponse, AppError, IUser } from "@/app/types";
import { useSession } from "@/app/store/useSession";
import { FormValues } from "@/app/libs/types/user";
import FormFieldErrorMessage from "@/app/components/fieldError";

export default function SignIn() {
  const { updateUser, user } = useSession((state) => ({
    updateUser: state.actions.updateUser,
    user: state.user,
  }));

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>();
  const email = watch("email");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data, error } = await callApi<ApiResponse<IUser>>(
        `/api/v1/auth/signin`,
        "POST",
        formData
      );

      if (error) throw error;

      if (!data?.data) {
        throw new Error("Could not sign in!");
      }

      toast.success(data?.message);
      updateUser(data.data as IUser);

      router.push("/marketplace");
    } catch (error) {
      const castErr = error as AppError;
      toast.error(castErr.message ?? "Invalid credentials or server error");
    }
  };

  console.log(" <====  Back to login  ===> ");

  // if (user) {
  //   console.log(" <====  user is authenticated  ===> ");
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Loader2 className="w-8 h-8 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/chicago-nigeria-logo-1.png"
            alt="logo"
            width={140}
            height={40}
            className="h-10 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-lg font-semibold text-center mb-1">
          Sign in to your account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Connect with thousands of Nigerians in Chicago. Share your story,
          discover opportunities, and build meaningful relationships.
        </p>

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          })}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <FormFieldErrorMessage error={errors.email}/>

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <FormFieldErrorMessage error={errors.password}/>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-end text-sm mt-3 mb-5">
          <Link
            href={`/forgot-password?authenticated=true&email=${encodeURIComponent(
              email || ""
            )}`}
            className="text-[var(--primary-color)] hover:underline text-sm font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign in button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className={` ${
            isSubmitting
              ? "bg-[var(--primary-color)]/90"
              : "bg-[var(--primary-color)]"
          } hover:bg-[var(--primary-color)]/90 cursor-pointer text-white w-full py-3 rounded-lg font-medium transition-all`}
        >
          {isSubmitting ? (
            <span className="flex justify-center ">
              <Loader2 className="w-5 h-5 text-grary-200 mr-1 animate-spin" />{" "}
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[var(--primary-color)] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        <div className="flex justify-center mt-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:underline text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </form>
    </section>
  );
}
