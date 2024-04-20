"use client";

import Logo from "@/components/logo";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAward,
  faTrophy,
  faStar,
  faBolt,
  faCalendar,
  faUpDown,
  faWeightScale,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: 'FIT2DAY',
// };

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    img: "",
    age: "",
    height: "",
    weight: "",
    objective: "",
  });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/profile`, {
          withCredentials: true,
        });
        setUserData(res.data);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getUserData();
  }, []);

  const logOut = async () => {
    try {
      const res = await axios.get(`${process.env.baseURL}/auth/logout`, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-14 relative">
        {/* Background Image */}
        <Image
          src={"/images/bg-profile.png"}
          width={475}
          height={360}
          className="absolute top-0 left-0"
          priority
          alt="background image"
        />
        <Link href={"/home"} className="absolute top-6 left-6 z-20">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>

        {/* Content */}
        <div className="w-full flex flex-col justify-center items-center z-10">
          {/* Head Section */}
          <div className="flex flex-col justify-center items-center space-x-4 bg-white rounded-xl shadow-lg w-72 h-72">
            {/* Profile Image */}
            <Image
              src={userData.img ? userData.img : "/images/users/noimg.png"}
              width={140}
              height={140}
              className="border-4 border-white rounded-full w-[140px] h-[140px] object-fill"
              quality={100}
              alt="profile pic"
            />
            {/* Name & Objective */}
            <div className="flex flex-col justify-start items-center text-textMain space-y-1 p-4">
              <h1 className="font-bold text-base">
                {userData.firstname} {userData.lastname}
              </h1>
              <h1 className="font-light text-xs">
                {userData.objective !== "" ? userData.objective : ""}
              </h1>
            </div>
            {/* Achievement */}
            <div className="w-full flex justify-center items-center space-x-4">
              <FontAwesomeIcon
                icon={faAward}
                style={{ color: "#FFEA00", fontSize: "36px" }}
              />
              <FontAwesomeIcon
                icon={faTrophy}
                style={{ color: "#FFEA00", fontSize: "36px" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#FFEA00", fontSize: "36px" }}
              />
              <FontAwesomeIcon
                icon={faBolt}
                style={{ color: "#FFEA00", fontSize: "36px" }}
              />
            </div>
          </div>

          {/* User Details */}
          <div className="w-72 flex flex-col justify-center items-center">
            {/* Age */}
            <div className="w-full flex flex-col justify-center items-start space-y-2 mt-4 border-b-2 border-gray-300 pb-4">
              <h1 className="w-full font-medium text-base">Age</h1>
              <div className="w-full flex justify-between items-center">
                {/* Icon & Age */}
                <div className="flex items-center justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ color: "#6528F7", fontSize: "18px" }}
                  />
                  <p className="flex justify-center items-center font-light text-sm">
                    {userData?.age}
                  </p>
                </div>
                {/* Link to edit */}
                <Link href={"/profile/edit"}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: "#000", fontSize: "18px" }}
                  />
                </Link>
              </div>
            </div>

            {/* Height */}
            <div className="w-full flex flex-col justify-center items-start space-y-2 mt-4 border-b-2 border-gray-300 pb-4">
              <h1 className="w-full font-medium text-base">Height</h1>
              <div className="w-full flex justify-between items-center">
                {/* Icon & Age */}
                <div className="flex items-center justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faUpDown}
                    style={{ color: "#6528F7", fontSize: "18px" }}
                  />
                  <p className="flex justify-center items-center font-light text-sm">
                    {userData?.height} cm
                  </p>
                </div>
                {/* Link to edit */}
                <Link href={"/profile/edit"}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: "#000", fontSize: "18px" }}
                  />
                </Link>
              </div>
            </div>

            {/* Weight */}
            <div className="w-full flex flex-col justify-center items-start space-y-2 mt-4 border-b-2 border-gray-300 pb-4">
              <h1 className="w-full font-medium text-base">Weight</h1>
              <div className="w-full flex justify-between items-center">
                {/* Icon & Age */}
                <div className="flex items-center justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faWeightScale}
                    style={{ color: "#6528F7", fontSize: "18px" }}
                  />
                  <p className="flex justify-center items-center font-light text-sm">
                    {userData?.weight} kg
                  </p>
                </div>
                {/* Link to edit */}
                <Link href={"/profile/edit"}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: "#000", fontSize: "18px" }}
                  />
                </Link>
              </div>
            </div>

            {/* Objective */}
            <div className="w-full flex flex-col justify-center items-start space-y-2 mt-4 border-b-2 border-gray-300 pb-4">
              <h1 className="w-full font-medium text-base">Objective</h1>
              <div className="w-full flex justify-between items-center">
                {/* Icon & Age */}
                <div className="flex items-center justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    style={{ color: "#6528F7", fontSize: "18px" }}
                  />
                  <p className="flex justify-center items-center font-light text-sm">
                    {userData?.objective}
                  </p>
                </div>
                {/* Link to edit */}
                <Link href={"/profile/edit"}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: "#000", fontSize: "18px" }}
                  />
                </Link>
              </div>
            </div>

            <button
              className="mt-8 w-32 h-12 px-4 py-3 bg-secondary text-white font-semibold rounded-md border-2 border-secondary hover:bg-white hover:text-secondary ease-in-out delay-75"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
