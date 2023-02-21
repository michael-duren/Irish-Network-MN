import type { Dispatch, ReactNode, SetStateAction } from "react";
import Modal from "../Modal";

type DeleteWarningModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message?: string;
  title: string;
  children?: ReactNode;
};

const VerificationModal = ({
  isOpen,
  setIsOpen,
  message,
  title,
  children,
}: DeleteWarningModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen} title={title}>
      {message && <p className="font-bold">{message}</p>}
      {children}
    </Modal>
  );
};

export default VerificationModal;
