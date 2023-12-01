'use client';
import { ExerciseProvider } from '@/context/ExerciseContext';

export function Providers({ children }) {
  return (
    <>
      <ExerciseProvider>{children}</ExerciseProvider>
    </>
  );
}
