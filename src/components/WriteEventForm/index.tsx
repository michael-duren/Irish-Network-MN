import type { Dispatch, SetStateAction } from "react";
import z from "zod";
import Modal from "../Modal";

export const writeEventSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  description: z.string().min(20),
  time: z.string(),
  date: z.date(),
  address: z.string(),
  location: z.string(),
  additionalInformation: z.string().or(z.null()),
  featuredImage: z.string().or(z.null()),
  price: z.number(),
  ticketLink: z.string(),
  register: z.boolean(),
});

type WriteEventFormProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
};

const WriteEventForm = ({ isOpen, closeModal }: WriteEventFormProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form>
        <input
          type="text"
          id="shortDescription"
          className="h-full w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-600"
          placeholder="Short Description"
        />
      </form>
    </Modal>
  );
};

export default WriteEventForm;
