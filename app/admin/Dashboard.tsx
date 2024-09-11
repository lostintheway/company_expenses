"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Aside from "./Aside";
import Navbar from "./Navbar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main content area with sidebar */}
      <div className="flex overflow-hidden">
        {/* Sidebar */}
        <Aside />

        {/* Main content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out bg-gray-200 dark:bg-zinc-900`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;