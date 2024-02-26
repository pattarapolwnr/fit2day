"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFoodListContext } from "/context/FoodListContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = ({ params }) => {
  const {
    breakfast,
    setBreakfast,
    lunch,
    setLunch,
    dinner,
    setDinner,
    totalCalories,
    setTotalCalories,
  } = useFoodListContext();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const router = useRouter();

  today = dd + "/" + mm + "/" + yyyy;

  const handleDelete = (meal, id, calories) => {
    switch (meal) {
      case "breakfast":
        let newBreakfastList = breakfast.filter((item) => item.id !== id);
        setBreakfast(newBreakfastList);
        setTotalCalories((prev) => prev - calories);
        break;
      case "lunch":
        let newLunchList = lunch.filter((item) => item.id !== id);
        setLunch(newLunchList);
        setTotalCalories((prev) => prev - calories);
        break;
      case "dinner":
        let newDinnerList = dinner.filter((item) => item.id !== id);
        setDinner(newDinnerList);
        setTotalCalories((prev) => prev - calories);
        break;
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${process.env.baseURL}/history/diet`,
        {
          data: {
            totalCalories: totalCalories,
            breakfast: breakfast,
            lunch: lunch,
            dinner: dinner,
          },
        },
        { withCredentials: true }
      );
      router.push("/diet");
    } catch (error) {
      console.log(error);
      router.push("/diet");
    }
  };

  return (
    <>
      <div className="relative max-w-sm w-96 h-[770px] flex flex-col items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/diet"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />

        {/* Title & Search Box */}
        <h1 className="font-medium text-xl mt-4">{today}</h1>

        {/* Breakfast Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Breakfast</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {breakfast.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} cal</p>
                <button
                  onClick={() =>
                    handleDelete("breakfast", item.id, item.calories)
                  }
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#000", fontSize: "20px" }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Lunch Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Lunch</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {lunch.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} cal</p>
                <button
                  onClick={() => handleDelete("lunch", item.id, item.calories)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#000", fontSize: "20px" }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dinner Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Dinner</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {dinner.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={item.id}
              >
                <p className="w-48 font-light">{item.eng_name}</p>
                <p>{item.calories} cal</p>
                <button
                  onClick={() => handleDelete("dinner", item.id, item.calories)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#000", fontSize: "20px" }}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center mt-16">
          <button
            className={
              "w-28 h-12 px-4 py-3 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
            }
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
