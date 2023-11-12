import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Home() {
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-20">
        <Logo />
        <form>
          <div className="relative flex mt-12 mb-8">
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
          <div className="relative flex mt-12 mb-16">
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
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-72 py-3 px-8 bg-primary text-center text-2xl rounded-2xl text-[#fff] font-semibold border-2 border-primary ease-in-out delay-75 hover:bg-[#fff] hover:text-primary"
            >
              LOG IN
            </button>
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
