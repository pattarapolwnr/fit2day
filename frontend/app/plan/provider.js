"use client";
import { PlanProvider } from "@/context/planContext";

export function Providers({ children }) {
  return (
    <>
      <PlanProvider>{children}</PlanProvider>
    </>
  );
}
