import React, {useEffect} from 'react';
import DishItem from './DishItem';
import { Dish } from '../../types';
import {useDispatch} from "react-redux";
import {addDish} from "../../reduxFiles/reduxSlices/cartSlice.ts";
import {useAppDispatch, useAppSelector} from "../../reduxFiles/hooks.ts";
import {
  selectDeleteDishLoading,
  selectDishes,
  selectFetchDishesLoading
} from "../../reduxFiles/reduxSlices/dishesSlice.ts";
import {deleteDish, fetchDishes} from "../../reduxFiles/reduxSlices/dishesThunks.ts";
import Spinner from "../Spinner/Spinner.tsx";

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading)
  const dishLoading = useAppSelector(selectFetchDishesLoading)


  const removeDish = async (dishId:string)=>{
    await dispatch(deleteDish(dishId))
    await dispatch(fetchDishes())

  }

  const addDishToCart = (dish:Dish)=>{
    dispatch(addDish(dish))
  }


  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch]);
  return (
    <>
      <h4>Dishes</h4>
      {dishLoading ? <Spinner/> : dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          addToCart={()=>{addDishToCart(dish)}}
          onDelete={() => removeDish(dish.id)}
          deleteLoading={deleteLoading}
        />
      ))}
    </>
  );
};

export default Dishes;
