"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPen,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

const page = () => {
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
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("/images/users/noimg.png");

  const [filename, setFilename] = useState("No file Uploaded");

  const { register, setValue, handleSubmit } = useForm();

  const uploadImage = async () => {
    var formdata = new FormData();
    formdata.append("files", selectedFile);

    var requestOptions = { method: "POST", body: formdata };

    const response = await fetch("/profile/edit/api", requestOptions);
    const result = await response.text();
  };

  const onSubmit = async (data) => {
    try {
      if (filename !== "No file Uploaded") {
        await uploadImage();
        const res = await axios.put(
          `${process.env.baseURL}/profile`,
          {
            data: { data: data, image: `/images/upload/${filename}` },
          },
          { withCredentials: true }
        );
        router.push("/profile");
        return;
      }
      const res = await axios.put(
        `${process.env.baseURL}/profile`,
        {
          data: { data: data, image: `${userData.img}` },
        },
        { withCredentials: true }
      );
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFilename(file.name);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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

  useEffect(() => {
    if (userData) {
      setValue("firstname", userData.firstname);
      setValue("lastname", userData.lastname);
      setValue("age", userData.age);
      setValue("height", userData.height);
      setValue("weight", userData.weight);
      setValue("objective", userData.objective);
      setPreview(userData.img);
    }
  }, [userData]);
  return (
    <>
      <div className="relative max-w-sm w-96 min-h-[770px] flex flex-col justify-start items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={"/profile"} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#000", fontSize: "32px" }}
          />
        </Link>
        <Logo />
        {/* Title */}
        <div className="flex justify-center items-center space-x-2 font-semibold text-xl mt-4">
          <h1 className="text-mainText">Edit Profile</h1>
          <FontAwesomeIcon icon={faPen} className="text-primary" />
        </div>

        {/* Form Section */}
        <form
          className="w-80 flex flex-col justify-center items-center space-y-4 mt-4 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Image
            src={preview}
            width={100}
            height={100}
            alt={"profile picture"}
            quality={95}
          />
          <label
            htmlFor="upload-photo"
            className="bg-bgFile border-dashed border-2 border-bgBorderFile cursor-pointer rounded-xl w-72 h-28"
          >
            <div className="flex flex-col justify-center items-center py-2 space-y-2">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                style={{ fontSize: "36px", color: "#8B2CF5" }}
              />
              <h1 className="text-xs font-med text-textPrimary">
                SELECT A FILE
              </h1>
              <h1 className="text-xs font-reg text-gray-400">
                File name: {filename}
              </h1>
            </div>
          </label>
          <input
            type="file"
            name="photo"
            id="upload-photo"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              handleFileUpload(e);
            }}
          />

          {/* Firstname */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Firstname</h1>
            <input
              type="text"
              className="w-56 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("firstname", {
                required: true,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+([- ][A-Za-z]+)*$/,
                  message:
                    "Enter a valid name with only letters, spaces, or hyphens.",
                },
              })}
            />
          </div>

          {/* Lastname */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Lastname</h1>
            <input
              type="text"
              className="w-56 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("lastname", {
                required: true,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+([- ][A-Za-z]+)*$/,
                  message:
                    "Enter a valid name with only letters, spaces, or hyphens.",
                },
              })}
            />
          </div>

          {/* Age */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Age</h1>
            <input
              type="text"
              className="w-20 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("age", {
                required: true,
                maxLength: 3,
                min: 0,
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Age must be between 1 to 1XX",
                },
              })}
            />
          </div>

          {/* Height */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Height (cm)</h1>
            <input
              type="text"
              className="w-20 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("height", {
                required: true,
                maxLength: 3,
                min: 100,
                pattern: {
                  value: /^100|[1-9]\d{2,}$/,
                  message: "Height must be greater than 100 cm",
                },
              })}
            />
          </div>

          {/* Weight */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Weight (kg)</h1>
            <input
              type="text"
              className="w-20 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("weight", {
                required: true,
                maxLength: 3,
                min: 21,
                pattern: {
                  value: /^([2-9]\d|\d{2,})$/,
                  message: "Weight must be greater than 20 kg",
                },
              })}
            />
          </div>

          {/* Objective */}
          <div className="w-full flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <h1 className="text-sm">Objective</h1>
            <input
              type="text"
              className="w-56 bg-gray-100 rounded-lg pr-4 text-right"
              {...register("objective", {
                required: true,
                maxLength: 30,
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: "Objective must include only string and number.",
                },
              })}
            />
          </div>
          <button
            type="submit"
            className="w-28 h-12 px-4 py-3 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
