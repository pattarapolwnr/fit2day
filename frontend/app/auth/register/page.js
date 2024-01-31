'use client';

import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.baseURL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const data = await response.json();
        const customId = nanoid();
        toast.error(
          data.message,
          {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          },
          {
            toastId: customId,
          }
        );
        return;
      }
      alert('Succesfully register!');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center bg-white shadow-2xl rounded-lg py-10 lg:my-4">
        <Logo />
        <div className="flex">
          <h1 className="text-xl text-left text-textMain mt-8 ml-16">
            Create Account
          </h1>
        </div>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex flex-col justify-center space-y-2 items-center mt-6">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
              {...register('firstname', {
                required: true,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+([- ][A-Za-z]+)*$/,
                  message:
                    'Enter a valid name with only letters, spaces, or hyphens.',
                },
              })}
            />
            <div className="h-4 w-80 text-red-500 text-xs flex justify-center items-center">
              {errors.firstname && <p>{errors.firstname.message}</p>}
            </div>
          </div>
          <div className="relative flex flex-col justify-center space-y-2 items-center mt-4">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
              {...register('lastname', {
                required: true,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+([- ][A-Za-z]+)*$/,
                  message:
                    'Enter a valid name with only letters, spaces, or hyphens.',
                },
              })}
            />
            <div className="h-4 w-80 text-red-500 text-xs flex justify-center items-center space-y-2">
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center space-y-2 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address.',
                },
              })}
            />
            <div className="h-4 w-80 text-red-500 text-xs flex justify-center items-center">
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center space-y-2 mt-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
              {...register('username', {
                required: true,
                maxLength: 20,
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,20}$/,
                  message:
                    'Username must be 3-20 characters, with letters, numbers, and underscores.',
                },
              })}
            />
            <div className="h-4 w-80 text-red-500 text-xs flex justify-center items-center">
              {errors.username && <p>{errors.username.message}</p>}
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center space-y-5 mt-6 mb-10">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
              {...register('password', {
                required: true,
                maxLength: 20,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must be 8+ characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.',
                },
              })}
            />
            <div className="h-4 w-80 text-red-500 text-xs flex justify-center items-center">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-72 py-3 px-8 bg-primary text-center text-2xl rounded-2xl text-[#fff] font-semibold border-2 border-primary ease-in-out delay-75 lg:hover:bg-[#fff] lg:hover:text-primary"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center items-center my-5">
            <h1 className="text-textPrimary font-medium">Or</h1>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4">
            <div className="relative">
              <div className="absolute top-2 left-2">
                <Image
                  src={'/images/google_icon.png'}
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
                  src={'/images/facebook_icon.png'}
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
        </form>
      </div>
    </>
  );
}
