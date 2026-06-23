'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Upload, User, Mail, Lock, Calendar, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,reset
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "attendee",
      image_url: "", 
      
    },
  });




  
  const onSubmit = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image_url,
        callbackURL: "/" // Optional: redirect after email verification
      });

      if (error) {
        
        // console.error("Signup error:", error);
        // Show error message to user
        alert(error.message || "Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", data);
      
      // Reset form on success
      reset();
    //    await authClient.signOut();
      
      // Redirect or show success message
      router.push('/login');
      // or
      // toast.success('Account created successfully!');
      alert("Account created successfully! Please check your email to verify your account.");
      
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

//   const onSubmit =async(data) => {
//     const { data, error } = await authClient.signUp.email({
//         email, // user email address
//         password, // user password -> min 8 characters by default
//         name, // user display name
//         image_url, // User image URL (optional)
//         callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
//     },
    
   
//     // console.log(data)
//   )};

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 my-15 ">
      <div className="w-full max-w-6xl bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row">
        
        {/* Left Side - Background Image */}
        <div className="hidden md:block md:w-1/2 relative min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 z-20" />
          
          {/* Replace with your image URL */}
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            fill
            alt="Sign Up Background"
            className="w-full h-full object-cover"
          />
                    

          
          {/* Overlay Content */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white p-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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

              {/* image url */}
              <div className="flex flex-col gap-2">
  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
    <Upload size={16} />
    Profile Image URL
  </label>
  <div className="relative">
    <input
      {...register("image_url", { 
        required: "Image URL is required"
      })}
      type="url"
      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500/50 transition-all"
    />
  </div>
</div>

              

{/*             
               <div className="flex flex-col gap-2">
  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
    <Upload size={16} />
    Profile Image URL
  </label>
  <div className="relative">
    <input
       {...register("image_url", { 
                      required: "Image URL is required",
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                        message: "Invalid image URL"
                      }
                    })}
      type="url"
      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
    //   onChange={handleImageUrlChange}
      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500/50 transition-all"
       
    />
  </div>
  </div>  */}

              {/* Role Field */}
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
                  <option value="attendee" className="bg-slate-900">
                    🎫 Attendee
                  </option>
                  <option value="organizer" className="bg-slate-900">
                    🎪 Organizer
                  </option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>

              {/* Image Upload Field */}
              {/* <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Upload size={16} />
                  Profile Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-linear-to-r file:from-purple-600 file:to-pink-600 file:text-white file:cursor-pointer hover:file:shadow-lg transition-all"
                  />
                </div>
                {previewUrl && (
                  <div className="mt-2 flex items-center gap-4 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                      <Image
                        src={previewUrl}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        {selectedImage?.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(selectedImage?.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )}
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white py-2.5 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
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