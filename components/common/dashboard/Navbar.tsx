import { MenuToggle } from "./MenuToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="bg-purple-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <MenuToggle />
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      {/* <ThemeToggle /> */}
    </nav>
  );
}
