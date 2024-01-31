'use client';

import Logo from '@/components/logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretLeft,
  faEdit,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useReducer } from 'react';
import exercises_data from '@/data/exercises/exercises';
import { weights_data } from '@/data/weights/weights_data';
import { useState } from 'react';
import { useExerciseContext } from '@/context/ExerciseContext';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'next':
      if (state.currentIndex + 1 <= 6) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          exercises_list: exercises_data[state.currentIndex + 1].exercises,
          selectedOption:
            exercises_data[state.currentIndex + 1].exercises[0].name,
          exercises: [...state.exercises],
          formData: {
            exercise_name: '',
            weightSelected: '',
            reps: 0,
            sets: 0,
          },
        };
      } else {
        return {
          ...state,
          currentIndex: 0,
          exercises_list: exercises_data[0].exercises,
          selectedOption: exercises_data[0].exercises[0].name,
          exercises: [...state.exercises],
          formData: {
            exercise_name: '',
            weightSelected: '',
            reps: 0,
            sets: 0,
          },
        };
      }

    case 'back':
      if (state.currentIndex - 1 >= 0) {
        return {
          ...state,
          currentIndex: state.currentIndex - 1,
          exercises_list: exercises_data[state.currentIndex - 1].exercises,
          selectedOption:
            exercises_data[state.currentIndex - 1].exercises[0].name,
          exercises: [...state.exercises],
          formData: {
            exercise_name: '',
            weightSelected: '',
            reps: 0,
            sets: 0,
          },
        };
      } else {
        return {
          ...state,
          currentIndex: 6,
          exercises_list: exercises_data[6].exercises,
          selectedOption: exercises_data[6].exercises[0].name,
          exercises: [...state.exercises],
          formData: {
            exercise_name: '',
            weightSelected: '',
            reps: 0,
            sets: 0,
          },
        };
      }
    case 'handle form input':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.payload },
      };
    case 'handle select option':
      return {
        ...state,
        selectedOption: action.payload,
      };
    case 'handle weight select':
      return {
        ...state,
        weightSelected: action.payload,
      };
    case 'add':
      if (state.formData.reps !== 0 && state.formData.sets !== 0) {
        let newArr = [...state.exercises];
        let generatedId = nanoid(3);
        newArr.push({
          ...state.formData,
          id: generatedId,
          exercise_name: state.selectedOption,
          weight: state.weightSelected,
        });

        return { ...state, exercises: newArr };
      } else {
        const customId = nanoid();
        toast.error(
          'Reps and Sets cannot be 0',
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
        return { ...state };
      }

    case 'delete':
      let newArr_del = state.exercises.filter(
        (item) => item.exercise_name !== action.payload
      );
      return { ...state, exercises: newArr_del };
    case 'edit':
      return {
        ...state,
        editFormData: action.payload,
        weightEditSelected: action.payload.weight,
      };
    case 'handle edit form input':
      return {
        ...state,
        editFormData: { ...state.editFormData, [action.field]: action.payload },
      };
    case 'handle edit weight select':
      return {
        ...state,
        weightEditSelected: action.payload,
      };
    case 'save edit':
      let originalArr = [...state.exercises];
      let index = originalArr.findIndex(
        (obj) => obj.exercise_name === state.editFormData.exercise_name
      );
      originalArr[index].weight = state.weightEditSelected;
      originalArr[index].reps = state.editFormData.reps;
      originalArr[index].sets = state.editFormData.sets;
      return { ...state, exercises: originalArr };
    default:
      return state;
  }
};

const initialState = {
  currentIndex: 0,
  exercises_list: exercises_data[0].exercises,
  formData: {
    exercise_name: '',
    weight: '',
    reps: 0,
    sets: 0,
  },
  editFormData: {
    exercise_name: '',
    weight: '',
    reps: 0,
    sets: 0,
  },
  selectedOption: 'Bench Press',
  weightSelected: '2.5kg',
  weightEditSelected: '',
  exercises: [],
  editModal: false,
};

export default function Manual() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModal, setOpenModal] = useState(false);
  const { setExercises } = useExerciseContext();
  const muscles_images = [
    'chest.png',
    'shoulder.png',
    'tricep.png',
    'back.png',
    'bicep.png',
    'abs.png',
    'leg.png',
  ];

  //handle form
  const handleChange = (event) => {
    dispatch({
      type: 'handle form input',
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handleDropdownChange = (event) => {
    dispatch({
      type: 'handle select option',
      payload: event.target.value,
    });
  };

  const handleWeightChange = (event) => {
    dispatch({
      type: 'handle weight select',
      payload: event.target.value,
    });
  };

  // Modal form
  const handleEditChange = (event) => {
    dispatch({
      type: 'handle edit form input',
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handleEditWeightChange = (event) => {
    dispatch({
      type: 'handle edit weight select',
      payload: event.target.value,
    });
  };

  return (
    <>
      <div
        className={
          openModal
            ? 'max-w-sm w-96 h-[800px] flex flex-col justify-center items-center bg-black opacity-50 shadow-2xl rounded-lg py-10 absolute z-10'
            : 'hidden'
        }
      ></div>
      <div
        className={
          openModal
            ? 'flex flex-col justify-center items-center w-80 h-72 shadow-xl space-y-6 bg-white z-20 absolute'
            : 'hidden'
        }
      >
        <div className="absolute top-5 right-5">
          <button onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: '20px' }} />
          </button>
        </div>
        <h1 className="font-medium">Edit Exercises</h1>

        <div className="flex items-center space-x-2 font-light text-sm w-60">
          <h1 className="w-24">Exercise</h1>
          <select
            className="w-48 border-2 border-textSecondary rounded-lg"
            value={state.editFormData.exercise_name}
            name="exercise_selected"
            disabled
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
          <h1 className="w-24">Weight</h1>
          <select
            className="w-24 border-2 border-textSecondary rounded-lg pl-4"
            value={state.weightEditSelected}
            onChange={handleEditWeightChange}
            name="weight_selected"
          >
            {weights_data.map((item) => {
              return (
                <option key={item.id} value={item.weight}>
                  {item.weight}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center space-x-2 font-light text-sm w-60">
          <input
            type="text"
            className="border-2 border-textSecondary rounded-xl pl-2 w-10"
            name="reps"
            value={state.editFormData.reps}
            onChange={(event) => handleEditChange(event)}
          />
          <h1 className="w-18">reps</h1>
          <input
            type="text"
            className="border-2 border-textSecondary rounded-xl pl-2 w-10"
            name="sets"
            value={state.editFormData.sets}
            onChange={(event) => handleEditChange(event)}
          />
          <h1 className="w-18">sets</h1>
        </div>
        <button
          className="w-20 h-8 px-1 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
          onClick={() => {
            dispatch({ type: 'save edit' });
            setOpenModal(false);
          }}
        >
          Edit
        </button>
      </div>
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
              value={state.selectedOption}
              onChange={handleDropdownChange}
              name="exercise_selected"
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
            <h1 className="w-24">Weight</h1>
            <select
              className="w-24 border-2 border-textSecondary rounded-lg pl-4"
              value={state.weightSelected}
              onChange={handleWeightChange}
              name="weight_selected"
            >
              {weights_data.map((item) => {
                return (
                  <option key={item.id} value={item.weight}>
                    {item.weight}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center space-x-2 font-light text-sm w-60">
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
              name="reps"
              value={state.formData.reps}
              onChange={(event) => handleChange(event)}
            />
            <h1 className="w-18">reps</h1>
            <input
              type="text"
              className="border-2 border-textSecondary rounded-xl pl-2 w-10"
              name="sets"
              value={state.formData.sets}
              onChange={(event) => handleChange(event)}
            />
            <h1 className="w-18">sets</h1>
          </div>
          <button
            className="w-20 h-8 px-1 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
            onClick={() => dispatch({ type: 'add' })}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-12 space-y-3 text-sm md:text-xs">
          {state.exercises?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between w-72"
              >
                <div className="flex flex-col justify-center items-center space-y-1">
                  <h1 className="font-medium ">
                    {item.exercise_name.substr(0, 20)}
                  </h1>
                  <h1 className="font-medium ">{item.weight}</h1>
                </div>

                <div className="flex justify-center items-center space-x-4">
                  <p className="font-light">{item.reps} reps</p>
                  <p className="font-light">{item.sets} sets</p>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      dispatch({ type: 'edit', payload: item });
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ color: '#A076F9', fontSize: '20px' }}
                    />
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'delete',
                        payload: `${item.exercise_name}`,
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: '#A076F9', fontSize: '20px' }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center mt-12 space-y-4">
          <Link href={'/workout/start'}>
            <button
              className={
                'w-40 h-12 px-4 py-3 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75'
              }
              onClick={() => setExercises(state.exercises)}
              disabled={state.exercises.length > 0 ? false : true}
            >
              Start Workout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
