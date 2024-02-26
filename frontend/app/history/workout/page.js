"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [workoutHistoryData, setWorkoutHistoryData] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const getWorkoutHistoryData = async () => {
      try {
        const res = await axios.get(
          `${process.env.baseURL}/history/workout?id=${id}`,
          {
            withCredentials: true,
          }
        );
        const data = await res.data;
        setWorkoutHistoryData(data);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getWorkoutHistoryData();
  }, []);

  return (
    <>
      <div className="relative max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/history"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />

        {/* Title & description */}
        <div className="mt-4 w-80 flex flex-col space-y-3 justify-start items-center">
          <h1 className="w-full text-xl font-bold text-primary">
            Workout Detail
          </h1>
          <p className="w-full text-base">
            <span className="font-med mr-2">Name:</span>
            <span className="font-light text-secondary">
              {workoutHistoryData?.plan_name}{" "}
            </span>
          </p>
          <p className="w-full text-lg">
            <span className="font-med mr-2">Total workout:</span>
            <span className="font-light text-secondary">
              {workoutHistoryData?.exercises?.length}
            </span>
          </p>
        </div>

        {/* Date & duration */}
        <div className="flex w-80 justify-between items-center mt-6 border-b-2 border-gray-300 pb-4">
          <p className="font-med">{workoutHistoryData?.date} </p>
          <p className="font-med">{workoutHistoryData?.duration} hours</p>
        </div>

        {/* Exercises */}
        <div className="flex w-80 flex-col justify-center items-center mt-4 space-y-2">
          {workoutHistoryData?.exercises?.map((item) => {
            return (
              <div key={item.id} className="flex justify-between w-72">
                <h1 className="font-medium">{item.exercise_name}</h1>
                <div className="flex justify-center items-center space-x-4">
                  <p className="font-light">{item.reps} reps</p>
                  <p className="font-light">{item.sets} sets</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
