import { createContext, useEffect, useState } from "react";

export const Auth = createContext();

export const Validation = ({ children }) => {
  /* ---------------------------------- State --------------------------------- */
  const [cart, setCart] = useState([]);

/* ------------------- Get Data -------------------*/
useEffect(() => {
  const getSaveCart = () => {
    const saveData = JSON.parse(localStorage.getItem("cart"));
    if (saveData !== null) {
      setCart(saveData);
    }
  };
  getSaveCart();
}, []);

/* ------------------- Set Data -------------------*/
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
console.log(cart)
  const globalStates = {
    cart,
    setCart,
  };
  return <Auth.Provider value={globalStates}>{children}</Auth.Provider>;
};
