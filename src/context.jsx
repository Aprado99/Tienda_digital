import { useContext, useReducer, useEffect, createContext } 
from 'react';
import reducer from "./reducer" 
import cartItems from './data';
import { getTotals } from './utils';
const url = 'https://www.course-api.com/react-useReducer-cart-project';
import { CLEAR_CART, DECREASE, DISPLAY_ITEMS, INCREASE, LOADING, REMOVE } from './actions';
const AppContext = createContext();


const initialstate = {
  loading:false, 
  // cart:[]
  cart: new Map(),
}

export const AppProvider = ({ children }) => {

  const [state ,dispatch] = useReducer(reducer,initialstate);
  const {totalAmount,totalCost} = getTotals (state.cart);




  const clearCart = () => {
    dispatch({type:CLEAR_CART});
  }

  const remove = (id) =>{
dispatch({type:REMOVE ,payload :{id}})
  }
  const increase = (id)=>{
    dispatch({type:INCREASE,payload :{id}})
  }
  const decrease = (id)=>{
    dispatch({type:DECREASE,payload :{id}})
  }

  const fetchData = async()=>{
    dispatch({type:LOADING})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type:DISPLAY_ITEMS,payload:{cart}})
    console.log(cart);

  }
  useEffect(()=>{
    fetchData();
  },[])
    return (
    <AppContext.Provider value={{...state,
    clearCart,remove,increase,decrease,
    totalAmount,totalCost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
