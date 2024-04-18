"use client";
import { PlanProvider } from "@/context/PlanContext";

export function Providers({ children }) {
  return (
    <>
      <PlanProvider>{children}</PlanProvider>
    </>
  );
}
