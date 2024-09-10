"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={`
      bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 p-4
      transition-all duration-300 ease-in-out
      ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
      fixed md:static md:translate-x-0 h-full z-10
    `}
    >
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900"
            >
              Home {JSON.stringify(isOpen)}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className="block py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block py-2 px-4 hover:bg-purple-100 dark:hover:bg-purple-900"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
