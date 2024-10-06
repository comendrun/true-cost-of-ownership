import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex items-center gap-4 mx-auto">
      <Button>
        <Link href="/dashboard/add-car">Add a New Car</Link>
      </Button>
      <Button variant="outline" className="">
        <Link href="/dashboard/my-cars">Check all your Cars</Link>
      </Button>
    </div>
  );
}
