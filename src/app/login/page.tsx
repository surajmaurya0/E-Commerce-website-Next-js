import InputComponents from "@/components/FormElements/InputComponents";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-full xl:px-5 lg:flex-row max-[500px]:w-full max-[500px]:p-1">
          <div className="flex flex-xol justify-center items-center w-full pr-10 pl-10 lg:flex-row max-[375px]:w-full max-[500px]:p-1">
            <div className="w-full mt-10 mr-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 max-[500px]:shadow-[0px] max-[500px]:p-2">
                <p className="w-full text-4xl font-medium text-center font-serif max-[500px]:text-2xl">
                  Login
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <InputComponents
                    type={"email"}
                    placeHolder={"Enter your email"}
                    label={"Email"}
                  />
                  <InputComponents
                    type={"password"}
                    placeHolder={"Enter your password"}
                    label={"Password"}
                  />
                  <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3">
                    Login
                  </button>
                </div>
                <div className="w-full mt-6">
                  <p>Don't have a account ?</p>
                  <button className="mt-[3px] inline-flex w-full items-center justify-center bg-black px-5 py-3  text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide max-[500px]:text-base max-[500px]:p-3">
                    <Link href="/register">Register</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
