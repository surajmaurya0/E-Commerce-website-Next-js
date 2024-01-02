import Cookies from "js-cookie";


///add new address
export const addNewAddress = async (formData: any) => {
  try {
    const res = await fetch("/api/address/add-new-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

//delete address
export const deleteAddress = async (id: any) => {
  try {
    const res = await fetch(`/api/address/delete-address?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

//update old address
export const updateAddress = async (formData: any) => {
  try {
    const res = await fetch("/api/address/update-address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

//get all address
export const getAllAddress = async (id: any) => {
  try {
    const res = await fetch(`api/address/get-all-address?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
