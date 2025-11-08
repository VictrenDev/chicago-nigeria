"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import useSWRMutation from "swr/mutation";
import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon, SigninFacebookIcon } from "@/app/components/icons";
import { callApi } from "@/app/libs/helper/callApi";
import { ApiResponse, AppError, IUser } from "@/app/types";
import { useSession } from "@/app/store/useSession";

type FormValues = {
  email: string;
  password: string;
};

async function postUser(url: string, { arg }: { arg: FormValues }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) throw new Error("Failed to sign in");
  return res.json();
}

export default function SignIn() {
  const { updateUser } = useSession((state) => state.actions);
  // const { trigger } = useSWRMutation(
  //   "https://68e5269b8e116898997e96bc.mockapi.io/users/v1/Users",
  //   postUser
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData: FormValues) => {
    try {
      // const hashedPassword = await bcrypt.hash(data.password, 10);
      // const newUser = await trigger({ ...data, password: hashedPassword });
      // toast.success("Signed in successfully!");
      // console.log(newUser);

      const { data, error } = await callApi<ApiResponse<IUser>>(
        "/api/v1/auth/signin",
        "POST",
        formData
      );
      if (error) throw error;

      if (!data?.data) {
        console.log("cold not signin!");
      }

      updateUser(data?.data as IUser);
    } catch (error) {
      const castErr = error as AppError;
      toast.error(castErr.message ?? "Invalid credentials or server error");
    }
  };

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
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
          })}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
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
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm mt-3 mb-5">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[var(--primary-color)]" />
            Remember Me
          </label>
          <Link
            href="#"
            className="text-[var(--primary-color)] hover:underline text-sm font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 cursor-pointer text-white w-full py-3 rounded-lg font-medium transition-all"
        >
          Sign in
        </button>
        {/* Footer */}
        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
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

// {/* Divider */}
// <div className="flex items-center gap-2 my-4">
//   <div className="flex-1 h-px bg-gray-200" />
//   <span className="text-gray-400 text-xs">Or</span>
//   <div className="flex-1 h-px bg-gray-200" />
// </div>

// {/* Social login */}
// <button
//   type="button"
//   className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 mb-2"
// >
//   <GoogleIcon/>
//   Sign in with Google
// </button>
// <button
//   type="button"
//   className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
// >
//   <SigninFacebookIcon/>
//   Sign in with Facebook
// </button>
