import {Dish} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import dishes from "../../components/Dishes/Dishes.tsx";
import {deleteDish, fetchDishes} from "./dishesThunks.ts";
import {RootState} from "../store.ts";

interface DishesState{
    items:Dish[]
    fetchLoading:boolean,
    deleteLoading:string | boolean
}

const initialState:DishesState = {
    items:[],
    fetchLoading:false,
    deleteLoading:false,
}


export const dishesSlice = createSlice<>({
    name:"dishes",
    initialState,
    reducers:{
        someReducers:()=>{

        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchDishes.pending, (state:DishesState)=>{
            state.fetchLoading = true
        })
            .addCase(fetchDishes.fulfilled, (state:DishesState, {payload:items} )=> {
            state.fetchLoading = false;
            state.items = items;
        })
            .addCase(fetchDishes.rejected, (state:DishesState) => {
                state.fetchLoading = false
            })

        builder
            .addCase(deleteDish.pending, (state:DishesState, {meta:{arg:dishId}})=>{
                state.deleteLoading = dishId;
            })
            .addCase(deleteDish.fulfilled, (state:DishesState)=>{
                state.deleteLoading = false;
            })
            .addCase(deleteDish.rejected, (state:DishesState)=>{
                state.deleteLoading = false;
            })
    }
});


export  const dishesReducer = dishesSlice.reducer
export const selectDishes = (state:RootState) => state.dishes.items
export const selectFetchDishesLoading = (state:RootState) => state.dishes.fetchLoading

export const selectDeleteDishLoading = (state:RootState) => state.dishes.deleteLoading

