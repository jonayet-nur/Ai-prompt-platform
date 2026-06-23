'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (formData) => {
    try {
      console.log("Signing in with:", formData);
      
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/" // or wherever you want to redirect after login
      });

      if (error) {
        alert(error.message || "Sign in failed. Please try again.");
        return;
      }

      console.log("Sign in successful:", data);
      
      // Reset form on success
    //   reset();
      
      // Redirect to dashboard or home page
      router.push('/');
      alert("Welcome back! You've been signed in successfully.");
      
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 my-15">
      <div className="w-full max-w-6xl bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row">
        
        {/* Left Side - Background Image */}
        <div className="hidden md:block md:w-1/2 relative min-h-150">
          <div className="absolute inset-0 bg-linear-to-r from-purple-300/70 to-pink-300/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/20 z-20" />
          
          {/* Login themed image */}
                 <Image
            src="/images/login.png"
            alt="Login Background"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 200vw, 100vw"
          />


          
          {/* Overlay Content */}
          {/* <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white p-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <LogIn size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome Back!
              </h2>
              <p className="text-slate-200 text-sm leading-relaxed">
                Sign in to access your personalized dashboard, favorite prompts, and connect with the community.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-xs">
                <span className="text-slate-300">🔐 Secure Login</span>
                <span className="w-px h-4 bg-white/20" />
                <span className="text-slate-300">⚡ Fast Access</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                Sign In
              </h1>
              <p className="text-slate-400">
                Welcome back! Please enter your credentials
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-all duration-300 group-hover:border-white/20"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="text-red-400">•</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Lock size={16} />
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-all duration-300 pr-12 group-hover:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="text-red-400">•</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-white/10 bg-slate-900/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                />
                <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-900 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white py-3 rounded-xl transition-all duration-300 hover:border-white/20 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white py-3 rounded-xl transition-all duration-300 hover:border-white/20 group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Do not have an account?{" "}
                <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline inline-flex items-center gap-1">
                  Create Account
                  <ArrowRight size={14} />
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/30 rounded-full border border-white/5">
                <span className="text-xs text-slate-400">🔒 Secured</span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-xs text-slate-400">🛡️ Encrypted</span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-xs text-slate-400">⚡ Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;