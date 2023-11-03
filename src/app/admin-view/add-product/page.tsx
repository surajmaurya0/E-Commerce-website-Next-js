"use client";

import {
  AvailbleSize,
  AdminAddProductFormControls as productControl,
} from "@/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import TileComponents from "@/components/TileComponent";
import InputComponents from "@/components/FormElements/InputComponents";
import SelectComponents from "@/components/FormElements/SelectComponents";

const AddProducts = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onload = (e: any) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (selectedImage) {
      // Handle image upload action here (e.g., send it to a server)
      alert("Image Uploaded!");
    }
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  console.log("selectedImage", selectedImage);

  return (
    <>
      <div className="w-full mt-5 mr-0 mb-0 ml-0 relative px-2">
        <div className="felx felx-col items-start justify-start bg-white rounded-xl relative">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 justify-center items-center flex flex-col">
            <div className="">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                //   style={dropzoneStyle}
                className="border-2 border-dashed rounded-lg overflow-hidden text-center cursor-pointer max-w-md h-72"
                onClick={
                  selectedImage ? () => {} : () => fileInputRef.current.click()
                }
              >
                {selectedImage && (
                  <div
                    className="absolute h-[25px] w-[25px] bg-red-500 text-white rounded-full"
                    onClick={() => setSelectedImage(null)}
                  >
                    <button className="">x</button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  // style={inputStyle}
                  className="hidden"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                />
                {selectedImage ? (
                  <div>
                    {/* <h2>Selected Image</h2> */}
                    <Image
                      src={selectedImage}
                      alt="Selected Image"
                      // style={imageStyle}
                      width={500}
                      height={288}
                      loading="lazy"
                      //   className="w-full h-72"
                      onClick={handleImageClick}
                    />
                  </div>
                ) : (
                  <p className=" p-20 text-gray-400">
                    Drag `n` drop an image here, or click to select an image
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-3 flex-col items-start">
                <label className="font-semibold">Available size</label>
                <TileComponents data={AvailbleSize} />
              </div>
              {productControl.map(
                ({ type, placeholder, id, componentType, options,label }: any) =>
                  componentType === "input" ? (
                    <>
                      <InputComponents
                        type={type}
                        placeHolder={placeholder}
                        id={id}
                        label={label}
                        onClick={() => {}}
                      />
                    </>
                  ) : componentType === "select" ? (
                    <SelectComponents
                    options={options}
                      id={id}
                      onClick={() => {}}
                    />
                  ) : null
              )}
            </div>
            0
          </div>
        </div>
      </div>
    </>
  );
};
// const dropzoneStyle = {
//     border: "2px dashed #ccc",
//     borderRadius: "4px",
//     padding: "20px",
//     textAlign: "center",
//     cursor: "pointer"
//   };
//   const inputStyle = {
//     display: "none"
//   };
const imageStyle = {
  minWidth: "100%",
  cursor: "pointer",
  height: "100%",
};
export default AddProducts;
