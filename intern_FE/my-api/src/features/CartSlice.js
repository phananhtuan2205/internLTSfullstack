import { createSlice } from "@reduxjs/toolkit";
const ItemInCart = localStorage.getItem("CartItem") !== null ? JSON.parse(localStorage.getItem("CartItem")) : []
const initialState ={
    cart:ItemInCart,
    cartTotalQuantity:0,
    cartTotalactual: 0,
    cartTotalOrigin: 0
}

const CartSlice = createSlice({
    name:"carts",
    initialState,
    reducers:{
        addtocart(state,action){
            const proInCart = state.cart.findIndex((item) =>
                item.id === action.payload.id
            );
            console.log(proInCart)
            if(proInCart >= 0){
                state.cart[proInCart].quantity += action.payload.quantity
                
            }
            else{
                 state.cart.push(action.payload)
                 
            }
            localStorage.setItem("CartItem",JSON.stringify(state.cart))
        },

        removecart(state,action){
            let a = state.cart.filter(item => item.id !== action.payload.id)
            state.cart = a;
            localStorage.setItem("CartItem",JSON.stringify(state.cart))
        },
        AddQuantity(state,action){
            const find = state.cart.findIndex((obj) =>
                    obj.id === action.payload.id
                )
                state.cart[find] =  action.payload
                localStorage.setItem("CartItem", JSON.stringify(state.cart))
        },
        SubQuantity(state,action){
            const find = state.cart.findIndex((obj) =>
                    obj.id === action.payload.id
                )
                state.cart[find] =  action.payload
                localStorage.setItem("CartItem", JSON.stringify(state.cart))
        },
        getTotal(state,action){
            let {actual_price,quantity,original_price} = state.cart.reduce((carttotal,cartItem)=>{
                const itemTotal = cartItem.quantity * cartItem.discount
                const originTotal = cartItem.quantity * cartItem.price
                carttotal.actual_price += itemTotal
                carttotal.quantity += cartItem.quantity
                carttotal.original_price +=originTotal
                return carttotal
            },{
                actual_price : 0,
                quantity : 0,
                original_price:0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalactual = actual_price;
            state.cartTotalOrigin = original_price;
        },
        removeAll(state){
            state.cart = []
        }
     }
})



export const {addtocart,removecart,AddQuantity,SubQuantity,getTotal,removeAll} = CartSlice.actions;   

export default CartSlice.reducer