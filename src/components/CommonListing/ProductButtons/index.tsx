"use client";

import ComponentLevelLoader from "@/components/Loader/Componentlevel";
import { GlobalContext } from "@/context";
import { deleteProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProductButtons = ({ item }: any) => {
  const pathName = usePathname();
  const { setUpdateProduct, setComponentLevelLoader, componentLevelLoader } =
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
  ) : (
    <>
      <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Add To Cart
      </button>
    </>
  );
};
export default ProductButtons;
