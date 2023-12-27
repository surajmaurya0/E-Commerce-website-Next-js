"use client";
import { useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItem } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/Componentlevel";
import emptyCart from '../../image/empty-cart.svg'
import Image from "next/image";

const CartModal = () => {
  const {
    showCartModal,
    setShowCartModel,
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const extractAllCartItem = async () => {
    const res = await getAllCartItem(user?._id);
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    if (user !== null) extractAllCartItem();
  }, [user, cartItems, extractAllCartItem]);

  //delete prodduct from cart
  const handleDeleteCartItem = async (id: any) => {
    setComponentLevelLoader({ loading: true, id });
    const res = await deleteFromCart(id);
    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
    setComponentLevelLoader({ loading: false, id: "" });
    console.log(res);
  };
  return (
    <CommonModal
      showbutton={true}
      show={showCartModal}
      setShow={setShowCartModel}
      mainContent={
        cartItems && cartItems.length ? (
          <ul
            role="list"
            className="cart_list my-6 divide-y divide-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          >
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
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{cartItem.productID.name}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      ${cartItem.productID.price}
                    </p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <button
                        type="button"
                        className="font-medium text-yellow-600 sm:order-2"
                        onClick={() => handleDeleteCartItem(cartItem._id)}
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading &&
                        componentLevelLoader.id === cartItem._id ? (
                          <ComponentLevelLoader
                            text={" Removing from cart"}
                            color={"#000000"}
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading
                            }
                          />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : <div className="py-6 w-full text-center animate-moveForwardAndBack">
          <Image src={emptyCart} className="m-auto empty_cart_img "  alt='empty cart' height={150} width={100}/>
          <p className="text-gray-500 uppercase font-semibold ">Your cart is empty</p></div>
      }
      buttonComponents={
        <>
          <button
            type="button"
            className="mt-1.5 w-full inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
          >
            Go To Cart
          </button>
          <button
            type="button"
            disabled={cartItems && cartItems.length === 0}
            className="mt-1.5 w-full inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-gray">
              {" "}
              Continue Shopping <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </>
      }
    />
  );
};

export default CartModal;
