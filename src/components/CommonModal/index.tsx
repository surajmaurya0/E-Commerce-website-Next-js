import { Fragment } from "react";

import { Transition, Dialog } from "@headlessui/react";
import {  CommonModalInterfaceI } from "@/Interface";
const CommonModal = ({
  modalTitle,
  mainContent,
  showbutton,
  buttonComponents,
  show,
  setShow,
  showModalTitle,
}: CommonModalInterfaceI) => {
  return (
    <>
      <Transition.Root as={Fragment} show={show}>
        <Dialog as="div" className={"relative z-10"} onClose={setShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-900"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-900"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className={"w-screen"}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white  ">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {showModalTitle && (
                        <div className="flex iten-start justify-between">
                          <Dialog.Title>{modalTitle}</Dialog.Title>
                        </div>
                      )}
                      <div className="mt-8">{mainContent}</div>
                    </div>
                    {showbutton && (
                      <div className="border-t border-gray-300 px-4 py-6 sm:px-6">
                        {" "}
                        {buttonComponents}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default CommonModal;
