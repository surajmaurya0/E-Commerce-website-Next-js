"use client";

import {
  AvailbleSize,
  firebaseConfig,
  firebaseStorageURL,
  AdminAddProductFormControls as productControl,
} from "@/utils";
import Image from "next/image";
import { useRef, useState, useCallback, useMemo, useContext } from "react";
import TileComponents from "@/components/TileComponent";
import InputComponents from "@/components/FormElements/InputComponents";
import SelectComponents from "@/components/FormElements/SelectComponents";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addNewProduct } from "@/services/product";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStorageURL);

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AddProducts = () => {
  const [formData, setFormData] = useState<any>(initialFormData);
  const { setIsLoading } = useContext(GlobalContext);
  const [imgLoader, setImgLoader] = useState<boolean>(false);
  const [imgBlur, setImgBlur] = useState<string>();
  const router = useRouter();
  const { imageUrl } = formData;
  const fileInputRef = useRef<any>(null);
  const formDataNotEmpty = useMemo(() => {
    const btnClick = Object.values(formData).every((data: any) => data !== "");
    return !btnClick;
  }, [formData]);
  //getting image url from firebase
  const extractImageUrl = useCallback((fileData: any) => {
    const createUniquFileName = `${Date.now()}${Math.random()
      .toString(36)
      .substring(2, 12)}`;
    const storageReference = ref(storage, `ecommerce/${createUniquFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, fileData);
    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }, []);

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImgLoader(true);
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        setImgBlur(`${reader.result}`);
        const getUrl = await extractImageUrl(file);
        if (getUrl !== "") {
          setFormData({ ...formData, imageUrl: getUrl });
          setTimeout(() => {
            setImgLoader(false);
          }, 2000);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  console.log("formData", formData);

  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImgLoader(true);
      const reader = await new FileReader();
      reader.onload = async (e: any) => {
        setImgBlur(`${reader.result}`);
        const getUrl = await extractImageUrl(file);
        if (getUrl !== "") {
          setFormData({ ...formData, imageUrl: getUrl });
          setTimeout(() => {
            setImgLoader(false);
          }, 2000);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleTileClick = (getCurrentSize: any) => {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentSize.id);
    if (index === -1) {
      cpySizes.push(getCurrentSize);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentSize.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  };

  const handleAddProduct = async () => {
    setIsLoading(true);
    const res = await addNewProduct(formData);
    if (res.success === true) {
      router.push("/");
      toast.success(res.message);
      setFormData(initialFormData);
      setIsLoading(false);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <div className="w-full mt-5 mr-0 ml-0 relative px-2 mb-2">
        <div className="felx felx-col items-start justify-start bg-white rounded-xl relative">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 justify-center items-center flex flex-col">
            <div className="md:w-2/4">
              {imgLoader ? (
                <div className=" w-500 m-auto border-3 border-dashed rounded-lg overflow-hidden text-center cursor-pointer max-w-md h-72 flex justify-center p-20">
                  <div
                    className="w-12 h-12 rounded-full animate-spin absolute
                  border-8 border-purple-500 border-t-transparent z-10 cursor-wait"
                  ></div>
                  <p className=" text-gray-300">
                    Drag `n` drop an image here, or click to select an image
                  </p>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  //   style={dropzoneStyle}
                  className="m-auto border-3 w-500 border-dashed rounded-lg overflow-hidden text-center cursor-pointer max-w-md h-72"
                  onClick={
                    imageUrl ? () => { } : () => fileInputRef.current.click()
                  }
                >
                  {imageUrl && (
                    <div
                      className="absolute h-[25px] w-[25px] bg-red-500 text-gray-800 rounded-full"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
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
                  {imageUrl ? (
                    <div>
                      {/* <h2>Selected Image</h2> */}
                      <Image
                        src={imageUrl}
                        alt="Selected Image"
                        // style={imageStyle}
                        width={500}
                        height={288}
                        // loading="lazy"
                        placeholder="blur"
                        blurDataURL={imgBlur}
                      />
                    </div>
                  ) : (
                    <p className=" p-20 text-gray-400">
                      Drag `n` drop an image here, or click to select an image
                    </p>
                  )}
                </div>
              )}
              <div className="flex gap-2 mt-3 flex-col items-start">
                <label className="font-semibold">Available size</label>
                <TileComponents
                  selected={formData.sizes}
                  data={AvailbleSize}
                  onClick={handleTileClick}
                />
              </div>
              {productControl.map(
                ({
                  type,
                  placeholder,
                  id,
                  componentType,
                  options,
                  label,
                }: any) =>
                  componentType === "input" ? (
                    <>
                      <InputComponents
                        type={type}
                        placeHolder={placeholder}
                        id={id}
                        label={label}
                        onChange={(id, value) =>
                          setFormData({ ...formData, [id]: value })
                        }
                      />
                    </>
                  ) : componentType === "select" ? (
                    <SelectComponents
                      options={options}
                      label={label}
                      id={id}
                      onChange={(id, value) =>
                        setFormData({ ...formData, [id]: value })
                      }
                    />
                  ) : null
              )}
              <button
                className={`mt-5 inline-flex w-full items-center justify-center  ${formDataNotEmpty ? "bg-zinc-700" : "bg-black"
                  } px-2 py-2 text-lg text-white font-medium uppercase tracking-wide`}
                disabled={formDataNotEmpty}
                onClick={handleAddProduct}
              >
                add product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProducts;
