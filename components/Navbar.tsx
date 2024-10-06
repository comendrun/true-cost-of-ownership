import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./ui/providers/theme-toggle";

export default function Navbar() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <p className="text-xl font-bold">Cars TCO</p>
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
