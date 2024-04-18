"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { usePlanContext } from "@/context/PlanContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const { planData, setPlan } = usePlanContext();
  const router = useRouter();
  useEffect(() => {
    const getPlanData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/plan`, {
          withCredentials: true,
        });
        setPlan(res.data);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getPlanData();
  }, []);
  return (
    <>
      <div className="relative max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <div className="flex justify-center items-center">
          <Link href={"/home"} className="absolute top-12 left-8">
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#000", fontSize: "32px" }}
            />
          </Link>
          <h1 className="text-xl font-medium border-b-2 border-primary pb-2">
            Workout Plan
          </h1>
          <Link
            href={"/plan/preset"}
            className="font-light absolute top-12 right-8"
          >
            Preset
          </Link>
        </div>

        {/* line */}
        <div className="bg-gray-400 w-[2px] h-[470px] absolute left-[70px] top-40"></div>

        {/* Date & Workouts */}
        <div className="flex flex-col justify-center items-center mt-8 z-10 space-y-5 text-center">
          {/* Sunday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-primary">
              Sun
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-lg">
                {planData?.sunday?.plan_name ? planData.sunday.plan_name : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.sunday?.exercises.length > 0
                  ? `${planData.sunday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=sunday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Monday */}
          <div className="flex w-80 justify-center items-center space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-gradient-to-br from-secondary to-purple-100">
              Mon
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.monday?.plan_name ? planData.monday.plan_name : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.monday?.exercises.length > 0
                  ? `${planData.monday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=monday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Tuesday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-primary">
              Tue
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.tuesday?.plan_name
                  ? planData.tuesday.plan_name
                  : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.tuesday?.exercises.length > 0
                  ? `${planData.tuesday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=tuesday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Wednesday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-gradient-to-br from-secondary to-purple-100">
              Wed
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.wednesday?.plan_name
                  ? planData.wednesday.plan_name
                  : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.wednesday?.exercises.length > 0
                  ? `${planData.wednesday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=wednesday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Thursday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-primary">
              Thu
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.thursday?.plan_name
                  ? planData.thursday.plan_name
                  : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.thursday?.exercises.length > 0
                  ? `${planData.thursday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=thursday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Friday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-gradient-to-br  from-secondary to-purple-100">
              Fri
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.friday?.plan_name ? planData.friday.plan_name : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.friday?.exercises.length > 0
                  ? `${planData.friday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=friday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>

          {/* Saturday */}
          <div className="flex w-80 justify-center items-center  space-x-8">
            {/* Circle */}
            <div className="font-medium w-16 flex justify-center items-center h-16 text-lg rounded-full p-5 text-white bg-primary">
              Sat
            </div>
            {/* Plan name & no. of exercises */}
            <div className="flex flex-col justify-center items-center w-40">
              <h1 className="font-semibold text-xl">
                {planData?.saturday?.plan_name
                  ? planData.saturday.plan_name
                  : "-"}
              </h1>
              <p className="text-xs font-light text-gray-400">
                {planData?.saturday?.exercises.length > 0
                  ? `${planData.saturday.exercises.length} exercises`
                  : ""}
              </p>
            </div>
            {/* Edit button */}
            <Link href={"/plan/edit?day=saturday"}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: "#A076F9", fontSize: "20px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
