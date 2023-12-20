"use client";

import CommonListing from "@/components/CommonListing";
import { getAllProduct, productByCategory } from "@/services/product";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
const AllProduct = () => {
  const [data, setData] = useState<any>();
  const pathName = usePathname();
  const apiCalling = async (name: any) => {
    const allProduct =
      name === "all-products"
        ? await getAllProduct()
        : await productByCategory(name);
    setData(allProduct.data);
  };
  useEffect(() => {
    const parts = pathName.split("/");
    const categoryStrings = parts[parts.length - 1];
    apiCalling(categoryStrings);
  }, [pathName]);
  console.log('data',data);
  

  return data?.length ? <CommonListing data={data} />: 
  <SyncLoader color="#000000" className="page-loader" />;
};
export default AllProduct;
