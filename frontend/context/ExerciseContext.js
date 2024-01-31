// ExerciseContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState([]);
  const [startTime, setStartTime] = useState();

  const setExercises = (data) => {
    setExerciseData(data);
  };

  return (
    <ExerciseContext.Provider
      value={{ exerciseData, setExercises, startTime, setStartTime }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  return useContext(ExerciseContext);
};
