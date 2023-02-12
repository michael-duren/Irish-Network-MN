import type { Dispatch, ReactNode, SetStateAction } from "react";
import Modal from "../Modal";

type DeleteWarningModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  warning: string;
  title: string;
  children?: ReactNode;
};

const DeleteWarningModal = ({
  isOpen,
  setIsOpen,
  warning,
  title,
  children,
}: DeleteWarningModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen} title={title}>
      <p>{warning}</p>
      {children}
    </Modal>
  );
};

export default DeleteWarningModal;
