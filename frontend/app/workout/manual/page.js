'use client';

import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import plan_data from '@/data/plan/plan_data';
import { useReducer, useState } from 'react';
import exercises_data from '@/data/exercises/exercises';

const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      if (state.currentIndex + 1 <= 6) {
        return {
          currentIndex: state.currentIndex + 1,
          exercises_list: exercises_data[state.currentIndex + 1].exercises,
        };
      } else {
        return { currentIndex: 0, exercises_list: exercises_data[0].exercises };
      }

    case 'back':
      if (state.currentIndex - 1 >= 0) {
        return {
          currentIndex: state.currentIndex - 1,
          exercises_list: exercises_data[state.currentIndex - 1].exercises,
        };
      } else {
        return { currentIndex: 6, exercises_list: exercises_data[6].exercises };
      }
    default:
      return state;
  }
};

const initialState = {
  currentIndex: 0,
  exercises_list: exercises_data[0].exercises,
  exercises: [],
};

export default function Manual() {
  const [formData, setFormData] = useState({
    exercise_name: '',
    reps: 0,
    sets: 0,
  });

  const [selectedOption, setSelectedOption] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);
  const muscles_images = [
    'chest.png',
    'shoulder.png',
    'tricep.png',
    'back.png',
    'bicep.png',
    'abs.png',
    'leg.png',
  ];

  //handle option default value
  const setOptionDefaultValue = (direction) => {
    switch (direction) {
      case 'next':
        if (state.currentIndex + 1 <= 6) {
          setSelectedOption(
            exercises_data[state.currentIndex + 1].exercises[0].name
          );
        } else {
          setSelectedOption(exercises_data[0].exercises[0].name);
        }

      case 'back':
        if (state.currentIndex - 1 >= 0) {
          setSelectedOption(
            exercises_data[state.currentIndex - 1].exercises[0].name
          );
        } else {
          setSelectedOption(exercises_data[0].exercises[0].name);
        }
    }
  };

  //handle form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //handle add
  const handleAdd = () => {
    // check whether other form is null or not
    if (formData.exercise_name === '') {
      console.log({
        exercise: selectedOption,
        reps: formData.reps,
        sets: formData.sets,
      });
    } else {
      console.log({
        exercise: formData.exercise_name,
        reps: formData.reps,
        sets: formData.sets,
      });
    }
  };

  return (
    <>
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Logo />
        <div className="flex w-96">
          <h1 className="font-semibold border-b-2 border-primary text-left w-fit ml-16 mt-8">
            Workout Plan
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center w-80 h-96 shadow-xl space-y-4">
          <h1 className="font-medium mt-8">Add Exercises</h1>
          <div className="flex justify-center items-center relative">
            <div className="flex items-center justify-center">
              <Image
                src={`/images/muscles/${muscles_images[state.currentIndex]}`}
                width={130}
                height={130}
                quality={85}
                priority
                alt={`${muscles_images[state.currentIndex]}`}
              />
            </div>

            <button
              className="absolute top-8 left-36"
              onClick={() => {
                dispatch({ type: 'next' });
                setOptionDefaultValue('next');
              }}
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: '#6528F7', fontSize: '50px' }}
              />
            </button>
            <button
              className="absolute top-8 right-36"
              onClick={() => {
                dispatch({ type: 'back' });
                setOptionDefaultValue('back');
              }}
            >
              <FontAwesomeIcon
                icon={faCaretLeft}
                style={{ color: '#6528F7', fontSize: '50px' }}
              />
            </button>
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <h1 className="w-24">Exercise</h1>
            <select
              className="w-48 border-2 border-textSecondary rounded-lg"
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              {state.exercises_list.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <h1 className="w-24">Other</h1>
            <input
              type="text"
              className="w-48 border-2 border-textSecondary rounded-xl pl-2"
              name="exercise_name"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
              name="reps"
              onChange={handleChange}
            />
            <h1 className="w-18">reps</h1>
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
              name="sets"
              onChange={handleChange}
            />
            <h1 className="w-18">sets</h1>
          </div>
          <button
            className="w-20 h-8 px-1 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
            onClick={handleAdd}
          >
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
