'use client';

import Logo from '@/components/logo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faMagnifyingGlass,
  faUtensils,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import food_data from '@/data/food/food_data';
import { useEffect, useState } from 'react';
import { useFoodListContext } from '/context/FoodListContext';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
  const {
    breakfast,
    setBreakfast,
    lunch,
    setLunch,
    dinner,
    setDinner,
    setTotalCalories,
  } = useFoodListContext();
  const { meal } = params;
  const [foodList, setFoodList] = useState(food_data);
  const router = useRouter();

  const handleChange = (event) => {
    const value = event.target.value;
    const newFoodList = food_data.filter(({ eng_name }) =>
      eng_name.includes(value)
    );
    setFoodList(newFoodList);
  };

  const handleAdd = (item) => {
    switch (meal) {
      case 'breakfast':
        const newBreakfast = {
          id: nanoid(4),
          eng_name: item.eng_name,
          calories: item.avg_calories,
        };
        const newBreakfastList = [...breakfast, newBreakfast];
        setBreakfast(newBreakfastList);
        setTotalCalories((prev) => prev + item.avg_calories);
        break;
      case 'lunch':
        const newLunch = {
          id: nanoid(4),
          eng_name: item.eng_name,
          calories: item.avg_calories,
        };
        const newLunchList = [...lunch, newLunch];
        setLunch(newLunchList);
        setTotalCalories((prev) => prev + item.avg_calories);
        break;
      case 'dinner':
        const newDinner = {
          id: nanoid(4),
          eng_name: item.eng_name,
          calories: item.avg_calories,
        };
        const newDinnerList = [...dinner, newDinner];
        setDinner(newDinnerList);
        setTotalCalories((prev) => prev + item.avg_calories);
        break;
    }
    router.push('/diet/food_list');
  };

  return (
    <>
      <div className="relative max-w-sm w-96 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg py-10">
        <Link href={'/diet'} className="absolute top-12 left-8">
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: '#000', fontSize: '32px' }}
          />
        </Link>
        <Logo />

        {/* Title & Search Box */}
        <h1 className="font-extrabold text-xl mt-4">{meal}</h1>
        <div className="relative flex flex-row justify-center items-center mt-4">
          <div className="absolute left-6">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: '#000', fontSize: '20px' }}
            />
          </div>
          <input
            type="text"
            name="food_name"
            className="bg-textSecondary rounded-lg w-72 h-9 pl-16"
            onChange={(event) => handleChange(event)}
          />
        </div>

        {/* Menu Bar */}
        <div className="flex justify-start items-center pl-12 mt-6 w-full h-12 bg-gradient-to-r from-secondary to-white">
          <h1 className="font-semibold">Menu</h1>
        </div>

        {/* Menu List */}
        <div className="flex flex-col justify-center items-center w-80 mt-4 space-y-6">
          {foodList.map((item) => {
            return (
              <div
                className="flex flex-row justify-center items-center pb-4 border-b-2 border-textSecondary space-x-4"
                key={nanoid(4)}
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ color: '#000', fontSize: '20px' }}
                />
                <p className="w-60 font-light">{item.eng_name}</p>
                <button onClick={() => handleAdd(item)}>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ color: '#000', fontSize: '20px' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
