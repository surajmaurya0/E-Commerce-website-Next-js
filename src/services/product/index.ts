import Cookies from "js-cookie";

export const addNewProduct = async (formData: any) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProduct = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/admin/all-product", {
      method: "GET",
      cache:'no-store'
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async(formData:any) =>{
  try {
    const res = await fetch('/api/admin/update-product',{
      method:'PUT',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body:JSON.stringify(formData)
    })
    return await res.json()
    
  } catch (error) {
    console.log(error)
    
  }

}
