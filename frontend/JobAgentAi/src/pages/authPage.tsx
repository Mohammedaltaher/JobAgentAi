import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Linkedin } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container relative h-screen flex items-center justify-center p-0">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#21CE99]/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1B2A4E]/10 rounded-full filter blur-3xl"></div>
        </div>

        {/* Main Card */}
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 z-10 mx-4">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex bg-gradient-to-br from-[#1B2A4E] to-[#21CE99] p-12 flex-col justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2">JobAgentAI</h1>
              <p className="text-white/80">
                Your AI-powered job search assistant
              </p>
            </div>
            <div className="space-y-4">
              <blockquote className="text-lg italic">
                "The fastest way to land your dream job"
              </blockquote>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-300">
                    ★
                  </span>
                ))}
                <span className="ml-2">500+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#1B2A4E] mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 mb-8">
                Sign in to access your personalized job matches
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    className="mr-2"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <Linkedin className="h-5 w-5 text-[#0077B5]" />
                  Continue with LinkedIn
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    OR
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 px-4 text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 px-4 text-base"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#21CE99] focus:ring-[#21CE99]"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-[#21CE99] hover:text-[#1db989]"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full h-12 bg-[#21CE99] hover:bg-[#1db989] text-white text-base"
                >
                  Sign In
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/dashboard"
                  className="font-medium text-[#21CE99] hover:text-[#1db989]"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
