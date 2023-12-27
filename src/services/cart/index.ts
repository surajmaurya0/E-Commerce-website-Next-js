import Cookies from "js-cookie";

export const addToCart = async (formData: any) => {
  try {
    const res = await fetch("/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartItem = async (id: any) => {
  try {
    const res = await fetch(`/api/cart/all-cart-item?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteFromCart = async (id: any) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
