"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faDumbbell,
  faIdCard,
  faRankingStar,
  faTableColumns,
  faUtensils,
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
    username: "",
    firstname: "",
    lastname: "",
    img: "",
    objective: "",
  });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/user`, {
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
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-14 relative">
        {/* Background Image */}
        <Image
          src={"/images/bg_homescreen.png"}
          width={475}
          height={360}
          className="absolute top-0 left-0"
          priority
          alt="background image"
        />
        {/* Content */}
        <div className="w-full flex flex-col justify-center items-center z-10">
          {/* Head Section */}
          <div className="flex justify-center items-center space-x-4">
            <Image
              src={userData.img ? userData.img : "/images/users/noimg.png"}
              width={100}
              height={100}
              className="border-4 border-white rounded-full w-[100px] h-[100px] object-fill"
              quality={90}
              alt="profile pic"
            />
            <div className="flex flex-col justify-center items-center text-white space-y-3">
              <h1 className="font-bold text-lg">
                {userData.firstname} {userData.lastname}
              </h1>
              <h1 className="font-light text-sm">
                {userData.objective !== "" ? userData.objective : ""}
              </h1>
            </div>
          </div>

          {/* Menu buttons */}
          <div className="grid grid-cols-2 justify-center content-center gap-4 mt-6">
            <Link href={"/workout/plan"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">Workout</h1>
              </div>
            </Link>
            <Link href={"/diet"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">Diet diary</h1>
              </div>
            </Link>
            <Link href={"/plan"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">Workout Plan</h1>
              </div>
            </Link>
            <Link href={"/history"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">History</h1>
              </div>
            </Link>
            <Link href={"/ranking"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faRankingStar}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">Ranking</h1>
              </div>
            </Link>
            <Link href={"/profile"}>
              <div className="w-36 h-36 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center space-y-2">
                <FontAwesomeIcon
                  icon={faIdCard}
                  style={{ color: "#6528F7", fontSize: "60px" }}
                />
                <h1 className="text-base font-normal">Profile</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
