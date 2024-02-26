"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClockRotateLeft,
  faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [dietHistoryData, setDietHistoryData] = useState([]);
  useEffect(() => {
    const getDietHistoryData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/history/diet`, {
          withCredentials: true,
        });
        const data = await res.data;
        setDietHistoryData(data);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getDietHistoryData();
  }, []);

  return (
    <>
      <div className="relative max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/home"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />

        {/* Tabs selector */}
        <div className="mt-4 flex justify-center items-center space-x-24 text-sm">
          <Link href="/history" className="text-secondary opacity-70">
            Workout
          </Link>
          <Link href="/history/diet" className="text-primary font-bold">
            Diet
          </Link>
        </div>

        {dietHistoryData?.map((item, index) => {
          return (
            <Link href={`/history/diet/detail?id=${item._id}`} key={index}>
              <div className="w-[350px] h-24 flex justify-center items-center rounded-2xl shadow-xl mt-6 border-2 border-gray-100 px-4 py-4">
                {/* icon */}
                <div className="w-32 h-full flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faPlateWheat}
                    style={{ color: "#6528F7", fontSize: "48px" }}
                  />
                </div>
                {/* Right Section */}
                <div className="w-60 flex flex-col justify-start items-center">
                  {/* Title */}
                  <h1 className="w-full font-medium text-sm">{item.date}</h1>
                  <div className="w-full flex justify-between items-center text-sm text-gray-400">
                    <p>{item.total_calories} kcal</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default page;
