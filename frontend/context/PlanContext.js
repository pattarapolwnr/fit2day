// ExerciseContext.js
"use client";
import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [planData, setPlanData] = useState([]);

  const setPlan = (data) => {
    setPlanData(data);
  };

  return (
    <PlanContext.Provider value={{ planData, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  return useContext(PlanContext);
};
