import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Login() {
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-20">
        <Logo />
        <form className="flex flex-col items-center">
          <div className="relative flex mt-12">
            <div className="absolute left-4 top-4">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px' }} />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-72 h-14 bg-textSecondary rounded-lg pl-14 focus:outline-none"
            />
          </div>
          <div className="relative flex mt-8">
            <div className="absolute left-4 top-4">
              <FontAwesomeIcon icon={faLock} style={{ fontSize: '24px' }} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-72 h-14 bg-textSecondary rounded-lg pl-14 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center my-6">
            <h1 className="text-textPrimary font-medium">Continue with</h1>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4 mb-12">
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
          <div className="flex justify-center items-center">
            <Link href={'/home'}>
              {' '}
              <button
                type="submit"
                className="w-72 py-3 px-8 bg-primary text-center text-2xl rounded-2xl text-[#fff] font-semibold border-2 border-primary ease-in-out delay-75 lg:hover:bg-[#fff] lg:hover:text-primary"
              >
                LOG IN
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center my-6">
            <Link href={'/auth/register'}>
              <h1 className="text-textPrimary font-medium">Sign up</h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
