import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Moon, Sun } from "lucide-react";

type Props = {};

const Dashboard = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Navbar */}
      <nav className="bg-purple-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-purple-600"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white hover:bg-purple-600"
        >
          {theme === "dark" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 w-64 p-4 transition-all duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } absolute md:relative h-full z-10`}
        >
          <nav>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-purple-100 dark:hover:bg-purple-900"
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-purple-100 dark:hover:bg-purple-900"
                >
                  Profile
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-purple-100 dark:hover:bg-purple-900"
                >
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 p-4 overflow-auto transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:ml-64" : ""
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-500">
            Welcome to Your Dashboard
          </h2>
          <p>
            This is where your main content would go. You can add charts,
            tables, or any other components here.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
