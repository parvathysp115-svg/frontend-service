"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useAppStore } from "../../stores/useAppStore";
import { PillInput } from "../ui/PillInput";
import { PillButton } from "../ui/PillButton";

const authSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Valid phone number required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export const AuthScreen: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { setScreen, setIsAuthenticated } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      fullName: "Sarah Laurent",
      email: "sarah.laurent@fineed.ai",
      phone: "+33 6 42 98 11 02",
      password: "password123",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    // Simulate fast auth
    await new Promise((res) => setTimeout(res, 400));
    setIsAuthenticated(true);
    setScreen("home");
  };

  return (
    <div className="relative w-full h-full min-h-[750px] bg-white flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Top Header Section */}
      <div className="pt-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-lime flex items-center justify-center font-black text-brand-dark text-xl shadow-lime-glow mb-4">
          Fi
        </div>
        <h1 className="text-3xl font-black text-brand-dark tracking-tight leading-tight">
          We Say Hello!
        </h1>
        <p className="mt-1 text-sm font-medium text-brand-muted">
          {isSignUp
            ? "Create your Fineed account and unlock AI resume optimization."
            : "Welcome back! Discover your next high-impact career move."}
        </p>
      </div>

      {/* Sign In / Sign Up Segmented Control */}
      <div className="mt-6 p-1 bg-brand-input rounded-full flex items-center border border-brand-border/60">
        <button
          type="button"
          onClick={() => setIsSignUp(false)}
          className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
            !isSignUp ? "bg-white text-brand-dark shadow-sm" : "text-brand-muted hover:text-brand-dark"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(true)}
          className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
            isSignUp ? "bg-white text-brand-dark shadow-sm" : "text-brand-muted hover:text-brand-dark"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Auth Form with Pill Inputs */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-3.5">
        {isSignUp && (
          <PillInput
            placeholder="Full Name"
            icon={<User className="w-4 h-4" />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        )}

        <PillInput
          placeholder="Email Address"
          type="email"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        {isSignUp && (
          <PillInput
            placeholder="Phone Number (e.g. +33 6...)"
            type="tel"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        )}

        <PillInput
          placeholder="Password"
          isPassword
          icon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register("password")}
        />

        {!isSignUp && (
          <div className="flex justify-end pr-2">
            <button
              type="button"
              className="text-xs font-bold text-brand-muted hover:text-brand-dark transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Full-width #CEF238 Action Button */}
        <div className="mt-4">
          <PillButton
            type="submit"
            variant="lime"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {isSignUp ? "Create Account" : "Log In"}
          </PillButton>
        </div>
      </form>

      {/* Social Login Row with Circular Buttons */}
      <div className="mt-6 pb-4">
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-brand-border w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Google */}
          <button
            type="button"
            onClick={() => {
              setIsAuthenticated(true);
              setScreen("home");
            }}
            className="w-12 h-12 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm hover:bg-brand-surface hover:scale-105 active:scale-95 transition-all"
            title="Google Login"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </button>

          {/* Instagram */}
          <button
            type="button"
            onClick={() => {
              setIsAuthenticated(true);
              setScreen("home");
            }}
            className="w-12 h-12 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm hover:bg-brand-surface hover:scale-105 active:scale-95 transition-all text-[#E4405F]"
            title="Instagram Login"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>

          {/* X / Twitter */}
          <button
            type="button"
            onClick={() => {
              setIsAuthenticated(true);
              setScreen("home");
            }}
            className="w-12 h-12 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm hover:bg-brand-surface hover:scale-105 active:scale-95 transition-all text-black"
            title="X Login"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
