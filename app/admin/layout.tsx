import Dashboard from "@/app/admin/Dashboard";
import { headers } from "next/headers";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const headersList = headers();
  // const host = headersList.get("host") || "";
  // const proto = headersList.get("x-forwarded-proto") || "http";
  // const pathname = headersList.get("x-invoke-path") || "";
  // console.log({ pathname, host, proto });

  return <Dashboard pathname={"/"}>{children}</Dashboard>;
}
