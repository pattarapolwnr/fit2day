"use client";

import Logo from "@/components/logo";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    img: "",
    user_id: "",
  });
  const [rankingData, setRankingData] = useState([]);
  const [index, setIndex] = useState(0);
  const getRankingIndex = () => {
    const index = rankingData.findIndex(
      (item) => item._id === userData.user_id
    );
    console.log(index);
    return index;
  };
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
    const getRankingData = async () => {
      try {
        const res = await axios.get(`${process.env.baseURL}/ranking`, {
          withCredentials: true,
        });
        setRankingData(res.data);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getUserData();
    getRankingData();
  }, []);
  return (
    <>
      <div className="max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-14 relative">
        {/* Background Image */}
        <Image
          src={"/images/bg-ranking.png"}
          width={475}
          height={360}
          className="absolute top-0 left-0"
          priority
          alt="background image"
        />
        <Link href={"/home"} className="absolute top-10 left-10 z-20">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <h1 className="font-extrabold text-3xl text-white z-20">
          Hall of fame
        </h1>

        {/* Content */}
        <div className="w-full h-full flex flex-col justify-center items-center z-10 relative">
          {/* Head Section */}
          <div className="flex w-full justify-center items-center space-x-4 mb-14">
            <Image
              src={userData.img ? userData.img : "/images/users/noimg.png"}
              width={80}
              height={80}
              className="absolute border-4 border-white rounded-full top-3 left-2"
              quality={90}
              alt="profile pic"
            />
            <div className="w-full flex flex-col justify-start items-center text-white space-y-3 mt-6 pl-20">
              <h1 className="w-full font-bold text-lg">
                {userData.firstname} {userData.lastname}
              </h1>
              {/* <h1 className="w-full font-light text-sm">
                You're in {index} place.
              </h1> */}
            </div>
          </div>

          {/* Ranking */}
          {rankingData?.map((item, index) => {
            return (
              <div
                className={
                  item._id === userData.user_id
                    ? "w-[350px] h-20 bg-gradient-to-br from-secondary from-20% to-white to-80% rounded-xl shadow-xl flex justify-start items-center space-x-4 pl-4 mb-4"
                    : "w-[350px] h-20 bg-white rounded-xl shadow-xl flex justify-start items-center space-x-4 pl-4 mb-4"
                }
                key={item._id}
              >
                <h1 className="font-semibold">{index + 1}</h1>
                <Image
                  src={item.img ? item.img : "/images/users/noimg.png"}
                  width={70}
                  height={70}
                  className="border-4 border-white rounded-full"
                  quality={90}
                  alt="profile pic"
                />
                <p
                  className={
                    item._id === userData.user_id ? "hidden" : "text-sm w-1/3"
                  }
                >
                  {item.firstname} {item.lastname}
                </p>
                {item._id === userData.user_id && (
                  <p className="text-sm w-1/3">You</p>
                )}
                <p className="text-lg font-semibold">{item.points}</p>
                {index === 0 && (
                  <FontAwesomeIcon
                    icon={faTrophy}
                    style={{ color: "#FFEA00", fontSize: "32px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
