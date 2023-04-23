import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cart-actions";
let isFirstRender = true;

function App() {

 
  const cart = useSelector(state => state.cart);
  const isLoggedin = useSelector(state => state.auth.isLoggedin);
  const  notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();
  // console.log(isLoggedin);
  useEffect(() =>{
   
    dispatch(fetchData());
  }, [dispatch])
  useEffect(() =>{
    if(isFirstRender){
      isFirstRender=false;
      return
    }
   if(cart.changed){
    dispatch(sendCartData(cart));
   }
  }, [cart, dispatch])
  // console.log(cart);
  return (
    <div className="App">
      
      {!isLoggedin&&<Auth />}
      {cart.changed&&isLoggedin&&notification&&<Notification type={notification.type} message={notification.message} />}
      {isLoggedin&&<Layout />}
    </div>
  );
}

export default App;
