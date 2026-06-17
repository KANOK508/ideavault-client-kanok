"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { HiLightBulb } from "react-icons/hi";


export default function SignupForm() {
  const { register: registerUser, updateUserProfile, googleLogin } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  //      we get those register , handleSubmit function from useFrom () 


  const onSubmit = async ({ name, email, photoURL, password }) => {
    try {
      //    -----------  for execute the try block wwill everything in the try block have to run ? like every function 
      await registerUser(email, password);
      await updateUserProfile(name, photoURL);
      //   are the registerUser  and updateUserProfile      came from firebase   docs for ---  built in register and updateProfile....
      toast.success("Account created successfully!");
      router.push("/");
      // what is happening ?   if already have this user info not possible to push or  create account ? 
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };
//-----------------------------------------------
  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed up with Google!");
      router.push("/");   // go to the home page 
    } catch (err) {
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          {/*  ---------------below we create this feature :    when we click on the logo or the IdeaVault --- 
           Redirect to the home page --    the app/page.jsx  */}
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <HiLightBulb className="text-4xl text-indigo-600" />
            <span className="text-2xl font-extrabold text-indigo-600">IdeaVault</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5">Join thousands of innovators worldwide</p>
        </div>
        {/* ------------------------------------------------------------------------------------------- */}

        <div className="card p-8">
          {/* login with Google button  */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 mb-6"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            {/*          Makes a dash...    */}
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  {...register("name", { required: "Name is required" })}
                  
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                  })}
                  type="email"
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Photo URL (optional)</label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  {...register("photoURL")}
                  type="url"
                  className="input-field pl-10"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    validate: {
                      hasUpper: (v) => /[A-Z]/.test(v) || "Must include an uppercase letter",
                      hasLower: (v) => /[a-z]/.test(v) || "Must include a lowercase letter",
                    },
                  })}
                  type={showPass ? "text" : "password"}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              <p className="text-xs text-gray-400 mt-1">Min 6 chars, must include uppercase and lowercase</p>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base mt-2">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
