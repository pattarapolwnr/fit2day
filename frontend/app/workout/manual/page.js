import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import plan_data from '@/data/plan/plan_data';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Manual() {
  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Logo />
        <div className="flex w-96">
          <h1 className="font-semibold border-b-2 border-primary text-left w-fit ml-16 mt-12">
            Workout Plan
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center w-80 h-60 shadow-xl space-y-4">
          <h1 className="font-medium">Add Exercises</h1>
          <div className="flex justify-center items-center relative">
            <button className="absolute top-8 left-24">
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: '#6528F7', fontSize: '35px' }}
              />
            </button>
            <button className="absolute top-8 right-24">
              <FontAwesomeIcon
                icon={faCaretLeft}
                style={{ color: '#6528F7', fontSize: '35px' }}
              />
            </button>
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <h1 className="w-36">Exercise</h1>
            <select className="w-36 border-2 border-textSecondary rounded-lg">
              <option>55555555</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <h1 className="w-36">Other</h1>
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-36"
            />
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
            />
            <h1 className="w-18">reps</h1>
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
            />
            <h1 className="w-18">sets</h1>
          </div>
          <button className="w-20 h-8 px-1 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75">
            Add
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-12 space-y-2 text-sm">
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
        </div>
      </div>
    </>
  );
}
