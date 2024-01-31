'use client';
import { FoodListProvider } from '@/context/FoodlistContext';

export function Providers({ children }) {
  return (
    <>
      <FoodListProvider>{children}</FoodListProvider>
    </>
  );
}
