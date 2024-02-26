"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/user`, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getUserData();
  }, []);

  const handleAdd = async (selected_plan) => {
    try {
      const res = await axios.post(
        `${process.env.baseURL}/plan/preset`,
        {
          data: {
            selected_plan: selected_plan,
          },
        },
        { withCredentials: true }
      );
      router.push("/plan");
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  return (
    <>
      <div className="relative max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/plan"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />

        {/* Plan 1*/}
        <div className="w-[366px] h-[115px] bg-[url('/images/preset/preset1.png')] flex flex-col space-y-4 relative justify-center items-start mt-4">
          <h1 className="font-extrabold text-2xl ml-4 text-white">
            Full body workout
          </h1>
          <div className="flex justify-center items-center space-x-10">
            <p className="font-light text-white ml-4">18 exercises</p>
            <p className="font-medium text-lg text-white">3 days/week</p>
          </div>
          <button
            className="bg-secondary px-6 py-2 rounded-xl text-white font-extrabold absolute bottom-4 right-4 border-2 border-secondary hover:bg-transparent hover:text-secondary ease-in-out delay-75"
            onClick={() => handleAdd("fullbody")}
          >
            Add
          </button>
        </div>

        {/* Plan 2*/}
        <div className="w-[366px] h-[115px] bg-[url('/images/preset/preset2.png')] flex flex-col space-y-4 relative justify-center items-start mt-5">
          <h1 className="font-extrabold text-2xl ml-4 text-white">
            Push Pull Leg
          </h1>
          <div className="flex justify-center items-center space-x-10">
            <p className="font-light text-white ml-4">17 exercises</p>
            <p className="font-medium text-lg text-white">3 days/week</p>
          </div>
          <button
            className="bg-secondary px-6 py-2 rounded-xl text-white font-extrabold absolute bottom-4 right-4 border-2 border-secondary hover:bg-transparent hover:text-secondary ease-in-out delay-75"
            onClick={() => handleAdd("push-pull-leg")}
          >
            Add
          </button>
        </div>

        {/* Plan 3*/}
        <div className="w-[366px] h-[115px] bg-[url('/images/preset/preset3.png')] flex flex-col space-y-4 relative justify-center items-start mt-5">
          <h1 className="font-extrabold text-2xl ml-4 text-white">
            Antagonistic workout
          </h1>
          <div className="flex justify-center items-center space-x-10">
            <p className="font-light text-white ml-4">22 exercises</p>
            <p className="font-medium text-lg text-white">4 days/week</p>
          </div>
          <button
            className="bg-secondary px-6 py-2 rounded-xl text-white font-extrabold absolute bottom-4 right-4 border-2 border-secondary hover:bg-transparent hover:text-secondary ease-in-out delay-75"
            onClick={() => handleAdd("antagonistic")}
          >
            Add
          </button>
        </div>

        {/* Plan 4*/}
        <div className="w-[366px] h-[115px] bg-[url('/images/preset/preset4.png')] flex flex-col space-y-4 relative justify-center items-start mt-5">
          <h1 className="font-extrabold text-2xl ml-4 text-white">
            Upper/Lower workout
          </h1>
          <div className="flex justify-center items-center space-x-10">
            <p className="font-light text-white ml-4">24 exercises</p>
            <p className="font-medium text-lg text-white">4 days/week</p>
          </div>
          <button
            className="bg-secondary px-6 py-2 rounded-xl text-white font-extrabold absolute bottom-4 right-4 border-2 border-secondary hover:bg-transparent hover:text-secondary ease-in-out delay-75"
            onClick={() => handleAdd("upper-lower")}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
