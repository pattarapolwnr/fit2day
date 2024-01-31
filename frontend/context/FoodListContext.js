'use client';
import { createContext, useContext, useState } from 'react';

const FoodListContext = createContext();

export const FoodListProvider = ({ children }) => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <FoodListContext.Provider
      value={{
        breakfast,
        setBreakfast,
        lunch,
        setLunch,
        dinner,
        setDinner,
        totalCalories,
        setTotalCalories,
      }}
    >
      {children}
    </FoodListContext.Provider>
  );
};

export const useFoodListContext = () => {
  return useContext(FoodListContext);
};
