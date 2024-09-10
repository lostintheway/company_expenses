import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 p-4 flex justify-between items-center border-b border-gray-300 dark:border-zinc-700">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-700"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
    </nav>
  );
}
