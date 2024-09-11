import React from "react";
import SignInForm from "@/components/signin-form";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-zinc-800">
            Business Expenses Tracker
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to manage your expenses effortlessly
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <span className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {/* <Google
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                aria-hidden="true"
              /> */}
            </span>
            <SignInForm />
            {/* Sign in with Google */}
          </span>
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-blue-200">
                Free for small businesses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
