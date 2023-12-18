'use client'

import ProductButtons from "./ProductButtons";
import ProductTile from "./ProductTile";

const CommonListing = ({data}:any) => {
  console.log("product",data)
  // const dummyData = [
  //   {
  //     name: "aaaa",
  //     description: "5695",
  //     price: 1222,
  //     category: "women",
  //     sizes: [],
  //     deliveryInfo: "588",
  //     onSale: "yes",
  //     priceDrop: 10,
  //     imageUrl:'https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-375d5.appspot.com/o/ecommerce%2F1701841930631qzmnf9wyp2?alt=media&token=13ca77e2-e032-4df9-a5bb-1916e38f8d8f',
  //     createdAt: "2023-11-06T11:43:28.530+00:00",
  //     updatedAt: "2023-11-06T11:43:28.530+00:00",
  //     __v: 0,
  //   },
  // ];
  return (
    <>
<section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {data && data.length
              ? data?.map((item:any) => {
                  return (
                    <>
                    <article key={item.id} className="relative flex flex-col overflow-hidden border cursor-pointer">
                    <ProductTile item={item} />
                    <ProductButtons  />
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
