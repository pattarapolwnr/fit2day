"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useFoodListContext } from "/context/FoodListContext";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const { totalCalories, setTotalCalories, setBreakfast, setLunch, setDinner } =
    useFoodListContext();
  const [caloriesBar, setCaloriesBar] = useState("0");
  const [maxCalories, setMaxCalories] = useState(2200);

  useEffect(() => {
    let bar = Math.round((totalCalories / maxCalories) * 300).toString() + "px";
    if (totalCalories >= maxCalories) {
      setCaloriesBar("300px");
    } else {
      setCaloriesBar(bar);
    }
  }, [totalCalories, caloriesBar]);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await axios.get(
        `${process.env.baseURL}/history/diet/current`,
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      if (data) {
        setBreakfast(data.breakfast);
        setLunch(data.lunch);
        setDinner(data.dinner);
        setTotalCalories(data.total_calories);
      }
    };
    getInitialData();
  }, []);

  return (
    <>
      <div className="relative max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/home"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />

        {/* Add food */}
        <Link href={"/diet/add_food/breakfast"}>
          <div className="mt-6 relative">
            <h1 className="absolute font-extrabold text-white text-2xl z-10 top-1/3 left-8">
              + Breakfast
            </h1>
            <Image
              src={"/images/breakfast_bg.png"}
              priority
              width={366}
              height={115}
              alt="breakfast"
              className="z-0"
            />
          </div>
        </Link>
        <Link href={"/diet/add_food/lunch"}>
          <div className="mt-4 relative">
            <h1 className="absolute font-extrabold text-white text-2xl z-10 top-1/3 left-8">
              + Lunch
            </h1>
            <Image
              src={"/images/lunch_bg.png"}
              priority
              width={366}
              height={115}
              alt="lunch"
              className="z-0"
            />
          </div>
        </Link>
        <Link href={"/diet/add_food/dinner"}>
          <div className="mt-4 relative">
            <h1 className="absolute font-extrabold text-white text-2xl z-10 top-1/3 left-8">
              + Dinner
            </h1>
            <Image
              src={"/images/dinner_bg.png"}
              priority
              width={366}
              height={115}
              alt="dinner"
              className="z-0"
            />
          </div>
        </Link>

        {/* Today Total Calories */}
        <h1 className="font-extrabold text-xl mt-6">TODAY</h1>
        <Link href={"/diet/food_list"}>
          <h1 className="font-extrabold mt-3">
            <span className="text-secondary text-4xl">{totalCalories}/</span>
            <span className="text-primary text-4xl">{maxCalories}</span>
            <span className="font-light text-notDoneBox ml-2">kcal</span>
          </h1>
        </Link>

        {/* Bar */}
        <Link href={"/diet/food_list"}>
          <div
            className={
              totalCalories >= maxCalories
                ? `absolute h-8 bg-secondary my-4 rounded-full top-[592px] left-[44px]`
                : `absolute h-8 bg-secondary my-4 rounded-l-full top-[592px] left-[44px]`
            }
            style={{ width: `${caloriesBar}` }}
          ></div>
          <div className="w-[300px] h-8 bg-textSecondary my-4 rounded-full"></div>
        </Link>

        <div className="w-60 rounded-2xl border-2 border-textSecondary py-4 px-4 flex flex-col space-y-2 mt-4">
          <h1 className="text-xs">
            <span className="font-medium">Objective:</span>{" "}
            <span className="font-light">Gain muscle</span>{" "}
          </h1>
          <h1 className="text-xs">
            <span className="font-medium">Recommended:</span>{" "}
            <span className="font-light">2200 cal/day</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default page;
