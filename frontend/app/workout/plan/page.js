import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import plan_data from '@/data/plan/plan_data';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Plan() {
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center bg-white shadow-2xl rounded-lg py-20">
        <Logo />
        <h1 className="font-semibold border-b-2 border-primary text-left w-fit ml-16 mt-12">
          Today's Plan
        </h1>
        <div className="flex flex-col justify-center items-center mt-12 space-y-2">
          {plan_data.map((item) => {
            return (
              <div key={item.id} className="flex justify-between w-72">
                <h1 className="font-medium">{item.exercise_name}</h1>
                <div className="flex justify-center items-center space-x-4">
                  <p className="font-light">{item.reps} reps</p>
                  <p className="font-light">{item.sets} sets</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center mt-12 space-y-4">
          <Link href={'/workout/plan/start'}>
            <button className="w-40 h-12 px-4 py-3 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75">
              Start Workout
            </button>
          </Link>
          <p className="font-light">Or</p>
          <Link href={'/workout/manual'}>
            <button className="w-40 h-12 px-4 py-3 bg-secondary text-white font-semibold rounded-md border-2 border-secondary hover:bg-white hover:text-secondary ease-in-out delay-75">
              Manual Plan
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
