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
import { addNewProduct, updateProductData } from "@/services/product";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/Componentlevel";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStorageURL);

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "yes",
  imageUrl: "",
  priceDrop: 0,
};

const AddProducts = () => {
  const {
    // setIsLoading,
    updateProduct,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const [formData, setFormData] = useState<any>(
    updateProduct ? updateProduct : initialFormData
  );
  const [imgLoader, setImgLoader] = useState<boolean>(false);
  const [imgBlur, setImgBlur] = useState<string>(
    "data:image/png;base64,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"
  );
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
        (snapshot) => {},
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

  const addAndUpdateBtnClick = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = updateProduct
      ? await updateProductData(formData)
      : await addNewProduct(formData);
    if (res.success === true) {
      router.push("/admin-view/all-products");
      toast.success(res.message);
      setFormData(initialFormData);
      setComponentLevelLoader({ loading: false, id: "" });
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
                    imageUrl ? () => {} : () => fileInputRef.current.click()
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
                        value={formData[id]}
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
                      value={formData[id]}
                      onChange={(id, value) =>
                        setFormData({ ...formData, [id]: value })
                      }
                    />
                  ) : null
              )}
              <button
                className={`mt-5 inline-flex w-full items-center justify-center  ${
                  formDataNotEmpty ? "bg-zinc-700" : "bg-black"
                } px-2 py-2 text-lg text-white font-medium uppercase tracking-wide`}
                disabled={formDataNotEmpty}
                onClick={addAndUpdateBtnClick}
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={
                      updateProduct 
                        ? "Updating Product"
                        : "Adding Product"
                    }
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : updateProduct  ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProducts;
