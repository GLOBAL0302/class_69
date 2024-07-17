import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ApiDishes, Dish} from "../../types.ts";
import {retry} from "@reduxjs/toolkit/query";
import {AppDispatch} from "../store.ts";
import {updateDishes} from "./cartSlice.ts";

export const fetchDishes = createAsyncThunk<Dish[], undefined, { dispatch: AppDispatch }>(
    "dishes/fetchDishes",
    async (_args, thunkAPI) => {
        const dishesResponse = await axiosApi.get<ApiDishes | null>("/dishes.json");
        const dishes = dishesResponse.data


        let newDishes: Dish[] = [];

        if (dishes) {
            newDishes = Object.keys(dishes).map((key: string) => {
                const dish = dishes[key];
                return {
                    id: key,
                    ...dish
                }
            })
        }
        thunkAPI.dispatch(updateDishes(newDishes));
        return newDishes
    }
)


export const deleteDish = createAsyncThunk<void, string>(
    "dishes/deleteDish",
    async (dishId: string) => {
        await axiosApi.delete(`/dishes/${dishId}.json`)
    }
)
