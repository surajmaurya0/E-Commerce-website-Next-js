"use client";
import { useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { getAllCartItem } from "@/services/cart";

const CartModal = () => {
  const { showCartModal, setShowCartModel, user, cartItems, setCartItems } =
    useContext(GlobalContext);
  const extractAllCartItem = async () => {
    const res = await getAllCartItem(user?._id);
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
    console.log("cart", res);
  };
  useEffect(() => {
    if (user !== null) extractAllCartItem();
  }, [user]);
  return (
    <CommonModal
      showbutton={true}
      show={showCartModal}
      setShow={setShowCartModel}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className=" my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem: any) => {
              return (
                <li key={cartItem.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={
                        cartItem &&
                        cartItem.productID &&
                        cartItem.productID.imageUrl
                      }
                      alt={cartItem.productID.name}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null
      }
      buttonComponents={
        <>
          <button>Go To Cart</button>
          <button>Checkout</button>
        </>
      }
    />
  );
};

export default CartModal;
