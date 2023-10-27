"use client";
import { useState, useMemo, useContext } from "react";
import InputComponents from "@/components/FormElements/InputComponents";
import SelectComponents from "@/components/FormElements/SelectComponents";
import { registrationFormControls } from "@/utils";
import Link from "next/link";
import { registerUser } from "@/services/register";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { FormDataI } from "@/Interface";
// let isRegistered = false;
const intialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};
const Register = () => {
  const [formData, setFormData] = useState<FormDataI>(intialFormData);
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const { setIsLoading } = useContext(GlobalContext);
  const onChangeFormData = (label: string, value: string) => {
    setFormData({ ...formData, [label]: value });
  };

  const formDataNotEmpty = useMemo(() => {
    const allValuesAreNonEmpty = Object.values(formData).every(
      (value) => value !== null && value !== ""
    );
    return !allValuesAreNonEmpty;
  }, [formData]);
  const handleRegisterSubmit = async () => {
    setIsLoading(true);
    const response = await registerUser(formData);
    console.log(response);
    if (response.success === false) {
    setIsLoading(false);
      return toast.dismiss(response.message);
    }
    setIsRegistered(true);
    toast.success(response.message);
    setIsLoading(false);
    setFormData(intialFormData);
  };

  return (
    <>
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-full xl:px-5 lg:flex-row max-[500px]:w-full max-[500px]:p-1">
          <div className="flex flex-xol justify-center items-center w-full pr-10 pl-10 lg:flex-row max-[375px]:w-full max-[500px]:p-1">
            <div className="w-full mt-10 mr-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 max-[500px]:shadow-[0px] max-[500px]:p-2">
                <p className="w-full text-4xl font-medium text-center font-serif max-[500px]:text-2xl">
                  {isRegistered
                    ? "Registration Successfull "
                    : " Sign up for an account"}
                </p>
                {isRegistered ? (
                  <Link href="/login">
                    <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3">
                      Log in
                    </button>
                  </Link>
                ) : (
                  <>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                      {registrationFormControls.map(
                        ({
                          id,
                          type,
                          placeholder,
                          label,
                          componentType,
                          options,
                        }: any) =>
                          componentType === "input" ? (
                            <>
                              <InputComponents
                                id={id}
                                type={type}
                                placeHolder={placeholder}
                                label={label}
                                onChange={onChangeFormData}
                                value={formData[id]} //this not necessry
                              />
                            </>
                          ) : componentType === "select" ? (
                            <SelectComponents
                              label={label}
                              options={options}
                              onChange={onChangeFormData}
                              value={formData.role}
                              id={id}
                            />
                          ) : null
                      )}
                      <button
                        className={`inline-flex w-full items-center justify-center ${
                          formDataNotEmpty ? "bg-zinc-700" : "bg-black"
                        } px-6 py-4  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3`}
                        disabled={formDataNotEmpty}
                        onClick={handleRegisterSubmit}
                      >
                        Register
                      </button>
                    </div>
                    <div className="w-full mt-6">
                      <p>Already have a account ?</p>
                      <Link href="/login">
                        <button className="mt-[3px] inline-flex w-full items-center justify-center bg-black px-5 py-3  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3">
                          Login
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
