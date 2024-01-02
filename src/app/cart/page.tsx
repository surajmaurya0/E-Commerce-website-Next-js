"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { getAllCartItem } from "@/services/cart";
import { useCallback, useContext, useEffect } from "react";

const Cart = () => {
  const { user, setCartItems, cartItems } = useContext(GlobalContext);
  const extractAllCartItem = useCallback(async () => {
    const res = await getAllCartItem(user?._id);
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  },[setCartItems, user])
  useEffect(() => {   
    if (user !== null) extractAllCartItem();
  }, [extractAllCartItem, user]);

  return <CommonCart cartItems={cartItems} />;
};

export default Cart;
