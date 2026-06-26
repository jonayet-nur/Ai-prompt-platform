
'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Upload, User, Mail, Lock, Calendar, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      image: "", // changed from image_url to image
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      console.log("Submitting form data:", formData);
      
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image || "", // Make sure image is properly passed
        role: formData.role, // This is crucial for role-based access
        callbackURL: "/login"
      });

      if (error) {
        console.error("Signup error:", error);
        alert(error.message || "Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", data);
      
      reset();
      
      // Show role-specific success message
      const roleMessage = formData.role === 'creator' 
        ? '🎉 Creator account created successfully! You can now add and manage prompts.'
        : '✅ Account created successfully!';
      
      alert(roleMessage);
      
      // Redirect to login
      router.push('/login');
      
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 my-15">
      <div className="w-full max-w-6xl bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row">
        
        {/* Left Side - Background Image */}
        <div className="hidden md:block md:w-1/2 relative min-h-150">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/80 to-pink-600/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/20 z-20" />
          
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            fill
            alt="Sign Up Background"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white p-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join PromptHub
              </h2>
              <p className="text-slate-200 text-lg mb-6">
                Create your account and start exploring thousands of AI prompts
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-purple-400" />
                  <span className="text-slate-300">10K+ Members</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-pink-400" />
                  <span className="text-slate-300">5K+ Prompts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-slate-400">
                Join the community of creators
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { 
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                <div className="relative">
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
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Profile Image URL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Upload size={16} />
                  Profile Image URL
                </label>
                <div className="relative">
                  <input
                    {...register("image")}
                    type="url"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Role Selection - IMPORTANT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Users size={16} />
                  Select Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: "Role is required" })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-pink-500/50 focus:border-pink-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="user" className="bg-slate-900">
                    👤 User - Browse and save prompts
                  </option>
                  <option value="creator" className="bg-slate-900">
                    🎨 Creator - Create and sell prompts
                  </option>
                   <option value="admin" className="bg-slate-900 text-yellow-400">
                    👑 Admin - Full access (Development Only)
                  </option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>

              
           

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting || isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Login
                </Link>
              </p>
            </div>

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
              <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white py-2.5 rounded-xl transition-colors">
                <FcGoogle size={25}></FcGoogle>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white py-2.5 rounded-xl transition-colors">
                <IoLogoGithub size={25} />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;