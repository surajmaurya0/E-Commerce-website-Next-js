"use client";

import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const ProductButtons = ({ item }: any) => {
  const pathName = usePathname();
  const { setUpdateProduct } = useContext(GlobalContext);
  const router = useRouter();

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
      <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Delete
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
