"use client";
import Logo from "@/components/logo";
import { useExerciseContext } from "@/context/ExerciseContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FacebookShare } from "react-share-kit";

export default function FinishPage() {
  const { exerciseData, startTime, planName } = useExerciseContext();
  const endTime = new Date();
  const timeElapsed = msToHMS(endTime - startTime);
  const router = useRouter();

  const calculatePoints = (startTime, endTime) => {
    const timeElapsed = endTime - startTime;
    let seconds = timeElapsed / 1000;
    // Half an hour gets 10 points
    const points = parseInt((seconds / 1800) * 10);
    return points;
  };

  const points = calculatePoints(startTime, endTime);

  function msToHMS(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.round(seconds % 60);
    // Format with leading zeros
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const saveWorkoutHistory = async () => {
      try {
        const res = await axios.post(
          `${process.env.baseURL}/history/workout`,
          {
            data: {
              plan_name: planName,
              duration: timeElapsed,
              exercises: exerciseData,
              points: points,
            },
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    saveWorkoutHistory();
  }, []);

  return (
    <>
      {/* Normal Content */}
      <div className="max-w-sm w-96 min-h-[770px] flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Logo />
        <h1 className="font-extrabold text-3xl my-10">Congratulations!</h1>
        <h1 className="font-extrabold text-2xl mb-10 text-secondary">
          {timeElapsed}
        </h1>
        <p className="font-medium text-xl text-center w-60">
          You have done all of these exercises.
        </p>
        <div className="flex flex-col justify-center items-center my-10 space-y-3 text-sm md:text-xs">
          {exerciseData?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between w-72"
              >
                <div className="flex flex-col justify-center items-center space-y-1 w-36">
                  <h1 className="font-extrabold ">
                    {item.exercise_name.substr(0, 20)}
                  </h1>
                  <h1 className="font-medium ">{item.weight}</h1>
                </div>

                <div className="flex justify-center items-center space-x-4 w-36">
                  <p className="font-light">{item.reps} reps</p>
                  <p className="font-light">{item.sets} sets</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <button className="relative flex justify-center items-center w-60 h-14 px-1 bg-primary text-sm text-white font-semibold rounded-2xl border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75">
          <div className="flex top-1 left-5">
            <Image
              src={"/images/facebook_icon.png"}
              width={40}
              height={40}
              alt="facebook"
            />
            
          </div>
          <h1 className="ml-9">Share on Facebook</h1>
        </button> */}
        <FacebookShare
          url={"https://fit2day.vercel.app"}
          quote={"I have completed these exercises via Fit2day App."}
          hashtag={"#Fit2day"}
        />
        <Link
          href={"/home"}
          className="my-10 flex justify-center items-center w-40 h-14 px-1 bg-primary text-sm text-white font-semibold rounded-2xl border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
