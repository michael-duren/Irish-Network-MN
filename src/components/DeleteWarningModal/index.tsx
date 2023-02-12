import type { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";

type DeleteWarningModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  warning: string;
  title: string;
};

const DeleteWarningModal = ({
  isOpen,
  setIsOpen,
  warning,
  title,
}: DeleteWarningModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen} title={title}>
      <p>{warning}</p>
    </Modal>
  );
};

export default DeleteWarningModal;
