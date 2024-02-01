"use client";
import Logo from "@/components/logo";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.baseURL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const data = await response.json();
        const customId = nanoid();
        toast.error(
          data.message,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          },
          {
            toastId: customId,
          }
        );
        return;
      }
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>FIT2DAY</title>
      </Head>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-20">
        <Logo />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex mt-12">
            <div className="absolute left-4 top-4">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px" }} />
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-72 h-14 bg-textSecondary rounded-lg pl-14 focus:outline-none"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  pattern: {
                    value: /^[a-zA-Z0-9_]{3,20}$/,
                    message:
                      "Username must be 3-20 characters, with letters, numbers, and underscores.",
                  },
                })}
              />
              <div className="h-4 w-72 text-red-500 text-xs flex justify-center items-center">
                {errors.username && <p>{errors.username.message}</p>}
              </div>
            </div>
          </div>
          <div className="relative flex mt-8">
            <div className="absolute left-4 top-4">
              <FontAwesomeIcon icon={faLock} style={{ fontSize: "24px" }} />
            </div>
            <div className="flex flex-col justify-center items-center space-y-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-72 h-14 bg-textSecondary rounded-lg pl-14 focus:outline-none"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be 8+ characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                  },
                })}
              />
              <div className="h-4 w-72 text-red-500 text-xs flex justify-center items-center">
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-6">
            <h1 className="text-textPrimary font-medium">Continue with</h1>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4 mb-12">
            <div className="relative">
              <div className="absolute top-2 left-2">
                <Image
                  src={"/images/google_icon.png"}
                  width={40}
                  height={40}
                  alt="google"
                />
              </div>
              <button className="border-2 rounded-2xl w-36 text-center border-textSecondary text-gray-500 py-4 pl-14 px-9">
                Google
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-2 left-2">
                <Image
                  src={"/images/facebook_icon.png"}
                  width={40}
                  height={40}
                  alt="facebook"
                />
              </div>
              <button className="border-2 rounded-2xl w-36 text-center border-textSecondary text-gray-500 py-4 pl-12 px-9">
                Facebook
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-72 py-3 px-8 bg-primary text-center text-2xl rounded-2xl text-[#fff] font-semibold border-2 border-primary ease-in-out delay-75 lg:hover:bg-[#fff] lg:hover:text-primary"
            >
              LOG IN
            </button>
          </div>
          <div className="flex justify-center items-center my-6">
            <Link href={"/auth/register"}>
              <h1 className="text-textPrimary font-medium">Sign up</h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
