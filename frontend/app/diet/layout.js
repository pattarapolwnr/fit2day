import { FoodListProvider } from '@/context/FoodlistContext';

export const metadata = {
  title: 'FIT2DAY',
};

export default function Layout({ children }) {
  return <FoodListProvider>{children}</FoodListProvider>;
}
