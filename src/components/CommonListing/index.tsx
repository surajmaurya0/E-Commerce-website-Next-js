"use client";

// import { useEffect } from "react";
import ProductButtons from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useRouter } from "next/navigation";

const CommonListing = ({ data }: any) => {
  const router = useRouter()
  // getting error
  // useEffect(()=>{
  //   router.refresh()
  // },[])
  console.log("product", data);
  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {data && data.length
              ? data?.map((item: any) => {
                  return (
                    <>
                      <article
                        key={item._id}
                        className="relative flex flex-col overflow-hidden border cursor-pointer"
                       
                      >
                        <ProductTile item={item} />
                        <ProductButtons item={item} />
                      </article>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </section>
    </>
  );
};
export default CommonListing;
