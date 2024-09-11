import React from "react";
import { Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 animate-gradient-x">
      <Card className="w-full max-w-3xl overflow-hidden shadow-xl mx-4 dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2 animate-bounce">
            404: Page Not Found
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-white">
            Oops! It seems you&apos;ve ventured into uncharted territory.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4">
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 animate-fade-in">
            The page you&apos;re looking for has gone on an adventure.
          </p>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 animate-slide-in-bottom">
            Explore our home page while we work on bringing it back.
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-3 md:p-4 my-4 animate-pulse">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm md:text-base">
              <strong>Did you know?</strong> &quot;404&quot; is the HTTP status
              code for &quot;Not Found&quot;.
            </p>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 animate-slide-in-bottom delay-150">
            Contact our support team if you believe this page should exist.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 space-y-2 sm:space-y-0">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-300"
            >
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors duration-300"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
