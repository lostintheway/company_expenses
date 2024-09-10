import Dashboard from "@/app/admin/Dashboard";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Dashboard>{children}</Dashboard>;
}
