"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function SortSelector({
  currentSort,
  showOldest,
}: {
  currentSort: string;
  showOldest: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = (newSort: "latest" | "oldest") => {
    const mainUrl = pathname.substring(0, 14);
    const remaining = pathname.substring(20);
    const newPathname = mainUrl + newSort + remaining;
    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Sort by:{" "}
            {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
          </span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-26">
        <DropdownMenuItem
          onClick={() => handleSortChange("latest")}
          className={currentSort === "latest" ? "bg-accent" : ""}
        >
          Latest
        </DropdownMenuItem>
        {showOldest && (
          <DropdownMenuItem
            onClick={() => handleSortChange("oldest")}
            className={currentSort === "oldest" ? "bg-accent" : ""}
          >
            Oldest
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
