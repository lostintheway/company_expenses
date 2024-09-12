// components/common/expenses/DateRangeSelector.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowLeftRight, Search } from "lucide-react";

export default function DateRangeSelector({
  initialStartDate,
  initialEndDate,
}: {
  initialStartDate: string;
  initialEndDate: string;
}) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", startDate);
      params.set("endDate", endDate);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      {/* {JSON.stringify({ startDate, endDate })} */}
      <div>
        {/* <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label> */}
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-white bg-opacity-80 shadow px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="pb-2">
        <ArrowLeftRight className="w-3 h-3 text-gray-700" />
      </div>
      <div>
        {/* <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label> */}
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-white bg-opacity-80 shadow px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
      >
        <Search className="w-3 h-3 text-white" />
      </button>
    </form>
  );
}
