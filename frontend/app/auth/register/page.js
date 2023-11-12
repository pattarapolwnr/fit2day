import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Register() {
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center bg-white shadow-2xl rounded-lg py-10">
        <Logo />
        <div className="flex">
          <h1 className="text-xl text-left text-textMain mt-8 ml-16">
            Create Account
          </h1>
        </div>
        <form className="flex flex-col items-center">
          <div className="relative flex mt-6">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
            />
          </div>
          <div className="relative flex mt-8">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
            />
          </div>
          <div className="relative flex mt-8 mb-16">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-72 h-10 bg-textSecondary rounded-lg pl-8 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-72 py-3 px-8 bg-primary text-center text-2xl rounded-2xl text-[#fff] font-semibold border-2 border-primary ease-in-out delay-75 hover:bg-[#fff] hover:text-primary"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center items-center my-6">
            <h1 className="text-textPrimary font-medium">Or</h1>
          </div>
          <div className="flex flex-row justify-center items-center mb-6 space-x-4">
            <div className="relative">
              <div className="absolute top-2 left-2">
                <Image src={'/images/google_icon.png'} width={40} height={40} />
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
