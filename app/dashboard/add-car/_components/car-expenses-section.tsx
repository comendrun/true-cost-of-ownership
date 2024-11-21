import { useCarFormStore } from "@/lib/store";
import React from "react";

export default function CarExpensesSection() {
  const values = useCarFormStore((state) => state.carFormValues);
  console.log("store values", values);
  return (
    <div className="m-auto mt-5 flex w-full flex-col gap-8 divide-y-2 border p-5">
      <h2 className="text-xl font-bold">Expenses</h2>
    </div>
  );
}
