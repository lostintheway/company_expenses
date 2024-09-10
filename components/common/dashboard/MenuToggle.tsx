"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export function MenuToggle() {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="text-white hover:bg-purple-600"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}
