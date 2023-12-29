'use client'

import { GlobalContext } from "@/context";
import { useContext } from "react";
import ComponentLevelLoader from "../Loader/Componentlevel";
import { deleteFromCart } from "@/services/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CommonCart = ({ cartItems = [] }: any) => {
  const router = useRouter()
  const {componentLevelLoader,setComponentLevelLoader} = useContext(GlobalContext)
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
  };
  return (
    <>
      <section className="h-screen bg-gray-100 ">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 data_modal">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="my-8">
                    {cartItems.map((cartItem: any) => {
                      return (
                        <li
                          className="flex-col flex space-y-3 py-6 text-le
                       sm:flex-row sm:space-x-5 sm:space-y-0"
                          key={cartItem.id}
                        >
                          <div className="shrink-0">
                            <img
                              src={
                                cartItem &&
                                cartItem.productID &&
                                cartItem.productID.imageUrl
                              }
                              alt={cartItem.productID.name}
                              className="h-24 w-25 max-w-full rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between ">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-4">
                                <p className="text-base font-semibold text-gray-900">
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productID.name}
                                </p>
                              </div>
                              <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-1 sm:ml-8 sm:text-right">
                                  $
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productID.price}
                                </p>
                                <button
                                  type="button"
                                  className="font-medium text-yellow-700 sm:order-2"
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
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-sm text-black font-semibold">
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total: any, item: any) =>
                            item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-sm text-black font-semibold">$0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-sm text-black font-semibold">
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total: any, item: any) =>
                            item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking "
                  >
                    {" "}
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CommonCart;
