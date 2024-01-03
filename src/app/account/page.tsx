"use client";

import InputComponents from "@/components/FormElements/InputComponents";
import ComponentLevelLoader from "@/components/Loader/Componentlevel";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControl } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Account = () => {
  const {
    user,
    address,
    setAddress,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [currentEditAddId, setCurrentEditAddId] = useState<any>(null);
  const extractAllAddress = async () => {
    const res = await getAllAddress(user?._id);
    if (res.success) {
      setAddress(res.data);
    }
  };

  const handleAddAndUpdateAddress = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditAddId !== null
        ? await updateAddress({ ...addressFormData, _id: currentEditAddId })
        : await addNewAddress({ ...addressFormData, userID: user?._id });
    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddress();
      setCurrentEditAddId(null);
      setShowAddressForm(false);
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
    setComponentLevelLoader({ loading: false, id: "" });
  };

  const handleUpdateAddress = async (getCurrentAddress: any) => {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditAddId(getCurrentAddress._id);
  };

  const handleDelete = async (id: any) => {
    setComponentLevelLoader({ loading: true, id });
    const res = await deleteAddress(id);
    console.log('sssssss',res);
    
    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
    extractAllAddress();
    setComponentLevelLoader({ loading: false, id: "" });
  };
  useEffect(() => {
    if (user !== null) extractAllAddress();
  }, [user]);
  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button className="mt-1.5 inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black">
              View Your Orders
            </button>

            <div className="mt-6">
              <h1 className="font-bold text-lg">
                Your Address :{" "}
                {address.length > 0 && (
                  <button
                    className="w-7 h-7 bg-black text-white rounded-full focus:outline-none focus:ring focus:border-blue-300 font-mono text-sm"
                    disabled
                  >
                    {address.length}
                  </button>
                )}
              </h1>
              <div className="mt-4 flex flex-col gap-4">
                {address && address.length ? (
                  address.map((item: any) => {
                    return (
                      <div
                        className="border p-6 shadow-lg shadow-custom"
                        key={item._id}
                      >
                        <p>Name : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className="mt-5 mr-5 inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="mt-5 inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.id === item._id &&
                          componentLevelLoader.loading ? (
                            <ComponentLevelLoader
                              text={"Deleting"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p> No address found ! Please add a new address below</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                className="mt-5 inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm && (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControl.map((controlItem: any) => (
                    <InputComponents
                      key={controlItem.id}
                      type={controlItem.type}
                      placeHolder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      id={controlItem.id}
                      onChange={(id: any, value: any) =>
                        setAddressFormData({
                          ...addressFormData,
                          [id]: value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddAndUpdateAddress}
                  className="mt-5 inline-block bg-block text-white px-5 py-3 text-xs font-medium uppercase tracking bg-black"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={currentEditAddId !== null ? "Updating" : "Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : currentEditAddId !== null ? (
                    "Update"
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Account;
