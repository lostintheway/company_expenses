"use client";
import { useRouter, usePathname } from "next/navigation";

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
    const mainUrl = pathname.substring(0, 16);
    const remaining = pathname.substring(22);
    const newPathname = mainUrl + newSort + remaining;
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSortChange("latest")}
        className={`px-3 py-2 rounded ${
          currentSort === "latest" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Latest
      </button>
      {showOldest && (
        <button
          onClick={() => handleSortChange("oldest")}
          className={`px-3 py-2 rounded ${
            currentSort === "oldest" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Oldest
        </button>
      )}
    </div>
  );
}
