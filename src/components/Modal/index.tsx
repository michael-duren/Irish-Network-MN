import { Fragment, type ReactNode } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  title: string;
};

const Modal = ({ isOpen, closeModal, children, title }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 items-center overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-w-[30rem] max-w-[90vw]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div
                  onClick={() => closeModal(false)}
                  className="flex w-full items-center justify-end"
                >
                  <IoMdClose className="cursor-pointer text-2xl text-gray-400 hover:text-gray-700" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-left text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>

                <div className="mt-2 flex flex-col">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
