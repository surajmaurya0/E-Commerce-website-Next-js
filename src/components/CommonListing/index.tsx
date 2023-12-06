"use client";

import ProductTile from "./ProductTile";

const CommonListing = () => {
  const dummyData = [
    {
      name: "aaaa",
      description: "5695",
      price: 0,
      category: "women",
      sizes: [],
      deliveryInfo: "588",
      onSale: "no",
      priceDrop: 9898,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-375d5.ap…",
      createdAt: "2023-11-06T11:43:28.530+00:00",
      updatedAt: "2023-11-06T11:43:28.530+00:00",
      __v: 0,
    },
  ];
  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className=" mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className=" mt-10 grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16 ">
            {dummyData && dummyData.length
              ? dummyData.map((item:any) => {
                  return (
                    <>
                    <article key={item.id}>
                    <ProductTile item={`${item}`} />

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
