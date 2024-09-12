"use client";
import { ASIDE_ROUTES } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Suspense } from "react";
export default function Aside({ pathname: test }: { pathname: string }) {
  const pathname = usePathname();
  console.log({ pathname });

  return (
    <aside
      className={`border-r border-gray-300 dark:border-zinc-700 h-screen bg-gray-200 
      dark:bg-zinc-800 text-gray-900 dark:text-gray-100 pt-4 transition-all 
      duration-300 ease-in-out transform relative h-full z-10 
      w-12 sm:w-56`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <nav>
          <ul className="space-y-2">
            {ASIDE_ROUTES.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`flex justify-center py-2 px-4 items-center gap-x-1 whitespace-nowrap rounded-l leading-snug transition ${
                    pathname.substring(0, 12) === route.path.substring(0, 12)
                      ? "text-primary border-r-4 border-blue-600 bg-focus font-medium bg-gray-300 dark:bg-zinc-700 "
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="hidden md:inline">{route.name}</span>
                  <span className="md:hidden">{route.name.charAt(0)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Suspense>
    </aside>
  );
}
