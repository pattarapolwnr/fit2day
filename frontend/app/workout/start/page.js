'use client';
import Logo from '@/components/logo';
import { useExerciseContext } from '@/context/ExerciseContext';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

export default function StartWorkout() {
  const router = useRouter();
  const alarm = '/sound/alarm.mp3';
  const { exerciseData, setStartTime } = useExerciseContext();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(
    exerciseData[currentExerciseIndex]
  );
  const [currentSet, setCurrentSet] = useState(1);
  const [maxSet, setMaxSet] = useState(exerciseData[0]?.sets);
  const [displaySetBoxex, setDisplaySetBoxes] = useState([]);
  const [currentSetBoxex, setCurrentSetBoxes] = useState([]);
  const [restTime, setRestTime] = useState(0);
  const [isRest, setIsRest] = useState(false);
  const [audio, setAudio] = useState(null);

  const handleChange = (event) => {
    setRestTime(event.target.value);
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed && isRest) {
      audio.src = alarm;
      return (
        <>
          <h1 className="font-extrabold text-5xl text-white my-4">
            Time is up!
          </h1>
          {/* <SoundPlayer src={alarm} /> */}
        </>
      );
    } else {
      return (
        <h1 className="font-extrabold text-7xl text-white">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </h1>
      );
    }
  };

  useEffect(() => {
    const soundEffect = new Audio();
    soundEffect.autoplay = true;
    soundEffect.src =
      'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    setAudio(soundEffect);
  }, []);

  useEffect(() => {
    const generateDisplaySetBoxes = () => {
      let boxes = [];
      for (let index = 1; index <= maxSet; index++) {
        boxes.push(
          <div
            className="w-16 h-16 bg-notDoneBox rounded-lg opacity-50 flex justify-center items-center"
            key={index}
          >
            <h1 className="font-bold text-white text-xl">{index}</h1>
          </div>
        );
      }
      setDisplaySetBoxes(boxes);
    };
    generateDisplaySetBoxes();
    const startTime = new Date();
    setStartTime(startTime);
  }, []);

  const createUserInteraction = () => {
    audio.play();
  };

  const handleFinishRest = () => {
    audio.src =
      'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    setIsRest(false);
    if (currentSet + 1 <= maxSet) {
      setCurrentSet((prev) => prev + 1);
    } else {
      if (currentExerciseIndex + 1 <= exerciseData.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentExercise(exerciseData[currentExerciseIndex + 1]);
        setCurrentSet(1);
      } else {
        router.push('/workout/finish');
      }
    }
  };

  // handle sets
  useEffect(() => {
    const generateCurrentSetBoxes = () => {
      let boxes = [];
      for (let index = 1; index <= currentSet; index++) {
        boxes.push(
          <div
            className="w-16 h-16 bg-secondary rounded-lg flex justify-center items-center"
            key={index}
          >
            <h1 className="font-bold text-white text-xl">{index}</h1>
          </div>
        );
      }
      setCurrentSetBoxes(boxes);
    };
    generateCurrentSetBoxes();
  }, [currentSet]);

  //trigger rerender when exercise changed
  useEffect(() => {}, [currentExercise, currentExerciseIndex]);

  return (
    <>
      {/* Rest Modal */}
      <div
        className={
          isRest
            ? 'max-w-sm w-96 h-screen flex flex-col justify-center items-center bg-black opacity-50 shadow-2xl rounded-lg py-10 absolute z-20'
            : 'hidden'
        }
      ></div>
      <div
        className={
          isRest
            ? 'max-w-sm w-96 h-screen flex flex-col justify-center items-center rounded-lg py-10 absolute z-30 space-y-6'
            : 'hidden'
        }
      >
        <Countdown
          date={Date.now() + 60000 * restTime}
          key={nanoid()}
          renderer={renderer}
        />
        <button
          className="w-36 h-16 px-1 bg-primary text-2xl text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
          onClick={handleFinishRest}
        >
          Continue
        </button>
      </div>
      {/* Normal Content */}
      <div className="max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Logo />
        <Image
          src={'/images/exercises/bench_press.jpg'}
          width={300}
          height={300}
          quality={85}
          priority
          alt="bench press"
          className="my-4"
        />
        <div className="grid grid-cols-4 gap-3">
          {displaySetBoxex}
          <div className="grid grid-cols-4 gap-3 absolute z-10">
            {currentSetBoxex}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center my-8 space-y-6">
          {/* Display set */}
          <div className="flex justify-center items-center space-x-4">
            <h1 className="font-bold text-2xl">
              {currentExercise?.exercise_name}
            </h1>
            <h1 className="font-bold text-2xl text-primary">
              x{currentExercise?.reps}
            </h1>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <h1 className="font-bold text-xl text-secondary">
              {currentExercise?.weight}
            </h1>
          </div>
          {/* Rest time */}
          <div className="flex justify-center items-center space-x-4 text-base">
            <h1>Rest time (minute)</h1>
            <input
              type="text"
              name="rest_time"
              value={restTime}
              onChange={handleChange}
              className="w-14 h-6 bg-textSecondary rounded-lg pl-4"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="w-24 h-10 px-1 bg-primary text-white font-semibold rounded-md border-2 border-primary hover:bg-white hover:text-primary ease-in-out delay-75"
              onClick={() => {
                setIsRest(true);
                createUserInteraction();
              }}
            >
              Rest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
