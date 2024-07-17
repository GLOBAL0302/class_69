import Dishes from '../../components/Dishes/Dishes';
import Cart from '../../components/Cart/Cart';
import {Dish } from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import React from "react";
import {useAppSelector} from "../../reduxFiles/hooks.ts";
import {selectDeleteDishLoading, selectDishes} from "../../reduxFiles/reduxSlices/dishesSlice.ts";



const Home: React.FC = () => {

  return (
    <div className="row mt-2">
      <div className="col-7">
          <Dishes/>
      </div>
      <div className="col-5">
        <Cart />
      </div>
    </div>
  );
};

export default Home;
