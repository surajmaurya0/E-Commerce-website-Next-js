"use client";

import ComponentLevelLoader from "@/components/Loader/Componentlevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProductButtons = ({ item }: any) => {
  const pathName = usePathname();
  const { setUpdateProduct, setComponentLevelLoader, componentLevelLoader,user,setShowCartModel } =
    useContext(GlobalContext);
  const router = useRouter();
  const productDelete = async (id: any) => {
    setComponentLevelLoader({ loading: true, id});

    const res = await deleteProduct(id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };
  
  const handleAddCart =async(item:any) =>{
    setComponentLevelLoader({loading:true,id:item._id})
    const res = await addToCart({productID:item._id,userID:user._id})
    if(res.success){
      toast.success(res.message,{
        position:toast.POSITION.TOP_RIGHT
      })
      setShowCartModel(true)
      setComponentLevelLoader({loading:false,id:''})
    }else{
      toast.error(res.message,{
        position:toast.POSITION.TOP_RIGHT
      })
      setShowCartModel(true)
      setComponentLevelLoader({loading:false,id:''})
    }

  }
  const isAdminView = pathName.includes("admin-view");
  return isAdminView ? (
    <>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => {
          setUpdateProduct(item), router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => productDelete(item._id)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </button>
    </>
  ) : user ? (
    <>
      <button onClick={()=> handleAddCart(item)} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
      {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"ADDING TO CART.."}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "ADD TO CART"
        )}
      </button>
    </>
  ): null;
};
export default ProductButtons;
