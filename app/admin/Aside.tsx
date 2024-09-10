"use client";
import { ASIDE_ROUTES } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Aside() {
  const pathname = usePathname();
  return (
    <aside
      className={`border-r border-gray-300 dark:border-zinc-700 h-screen bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 w-56 pt-4 transition-all duration-300 ease-in-out transform relative h-full z-10`}
    >
      <nav>
        <ul className="space-y-2">
          {ASIDE_ROUTES.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`flex py-2 px-10 items-center gap-x-1 whitespace-nowrap rounded-l leading-snug transition ${
                  route.path === pathname
                    ? "text-primary border-r-4 border-blue-600 bg-focus font-medium bg-gray-300 dark:bg-zinc-700 "
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
