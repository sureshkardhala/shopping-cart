import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        showCart: false,
        changed: false
    },
    reducers:{
        replaceData(state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.itemsList = action.payload.itemsList;
        },
        addToCart(state, action){
           
            const newItem = action.payload;
            const existedItem = state.itemsList.find(item => item.id === newItem.id);
            state.changed = true;
            if(existedItem){
                existedItem.quantity++;
                existedItem.totalPrice+=newItem.price;
            } else{
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name

                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action){
            state.changed = true;
            const id=action.payload.id;
            const existedItem = state.itemsList.find((item) => item.id === id);
            if(existedItem.quantity ===1){
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            }else{
                existedItem.quantity--;
                existedItem.totalPrice-=existedItem.price;
            }
        },
        showCart(state){
            state.showCart=!state.showCart;
        }
    }
});
export const  cartActions = cartSlice.actions;


export default cartSlice;