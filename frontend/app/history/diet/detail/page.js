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
  const [dietHistoryData, setDietHistoryData] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const getDietHistoryData = async () => {
      try {
        const res = await axios.get(
          `${process.env.baseURL}/history/diet/detail?id=${id}`,
          {
            withCredentials: true,
          }
        );
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
            Diet History Detail
          </h1>
          <p className="w-full text-base">
            <span className="font-med mr-2">Date:</span>
            <span className="font-light text-secondary">
              {dietHistoryData?.date}
            </span>
          </p>
          <p className="w-full text-lg">
            <span className="font-med mr-2">Total calories:</span>
            <span className="font-light text-secondary">
              {dietHistoryData?.total_calories} Calories
            </span>
          </p>
        </div>

        {/* Breakfast Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Breakfast</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {dietHistoryData?.breakfast?.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} Cal</p>
              </div>
            );
          })}
        </div>

        {/* Lunch Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Lunch</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {dietHistoryData?.lunch?.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} Cal</p>
              </div>
            );
          })}
        </div>

        {/* Dinner Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Dinner</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {dietHistoryData?.dinner?.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} Cal</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
