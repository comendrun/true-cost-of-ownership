"use client";
import React from "react";
import CarForm from "../_components/car-form";
import CarExpensesSection from "../_components/car-expenses-section";


export default function CarsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 lg:grid lg:grid-cols-3">
      <div className="col-span-2">
        <CarForm />
      </div>
      <div className="col-span-1 flex h-full w-full">
        <CarExpensesSection />
      </div>
    </div>
  );
}
