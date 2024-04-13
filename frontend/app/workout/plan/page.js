"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useExerciseContext } from "@/context/ExerciseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Plan() {
  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const d = new Date();
  let day = weekday[d.getDay()];
  const router = useRouter();
  const [planData, setPlanData] = useState([]);
  const { setExercises, setPlanName } = useExerciseContext();
  useEffect(() => {
    const getPlanData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/plan`, {
          withCredentials: true,
        });
        switch (day) {
          case "sunday":
            setPlanData(res.data?.sunday.exercises);
            setPlanName(res.data?.sunday.plan_name);
            break;
          case "monday":
            setPlanData(res.data?.monday.exercises);
            setPlanName(res.data?.monday.plan_name);
            break;
          case "tuesday":
            setPlanData(res.data?.tuesday.exercises);
            setPlanName(res.data?.tuesday.plan_name);
            break;
          case "wednesday":
            setPlanData(res.data?.wednesday.exercises);
            setPlanName(res.data?.wednesday.plan_name);
            break;
          case "thursday":
            setPlanData(res.data?.thursday.exercises);
            setPlanName(res.data?.thursday.plan_name);
            break;
          case "friday":
            setPlanData(res.data?.friday.exercises);
            setPlanName(res.data?.friday.plan_name);
            break;
          case "saturday":
            setPlanData(res.data?.saturday.exercises);
            setPlanName(res.data?.saturday.plan_name);
            break;
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getPlanData();
  }, []);

  return (
    <>
      <div className=" relative max-w-sm w-96 flex flex-col justify-center bg-white shadow-2xl rounded-lg py-20">
        <Link href={"/home"} className="absolute top-20 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />
        <h1 className="font-semibold border-b-2 border-primary text-left w-fit ml-16 mt-12">
          Today's Plan
        </h1>
        <div className="flex flex-col justify-center items-center mt-12 space-y-2 min-h-[200px]">
          {planData?.length > 0 ? (
            planData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-between w-80 text-sm"
                >
                  <h1 className="font-medium">{item.exercise_name}</h1>
                  <div className="flex justify-center items-center space-x-2">
                    <p className="font-light">{item.reps} reps</p>
                    <p className="font-light">{item.sets} sets</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="w-52 text-center">
              You don't have any exercises for today yet.
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center items-center mt-12 space-y-4">
          <Link href={"/workout/start"}>
            <button
              className="w-40 h-12 px-4 py-3 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
              disabled={planData?.length === 0}
              onClick={() => setExercises(planData)}
            >
              Start Workout
            </button>
          </Link>
          <p className="font-light">Or</p>
          <Link href={"/workout/manual"}>
            <button
              className="w-40 h-12 px-4 py-3 bg-secondary text-white font-semibold rounded-md border-2 border-secondary hover:bg-white hover:text-secondary ease-in-out delay-75"
              onClick={() => setPlanName("Manual Plan")}
            >
              Manual Plan
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
