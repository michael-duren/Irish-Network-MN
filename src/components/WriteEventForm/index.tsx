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
    <div>
      <Modal isOpen={isOpen} title={"Add Event"} closeModal={closeModal}>
        <form className="my-8 mx-4 flex flex-col justify-center space-y-8">
          {/* Title Date */}
          <div className=" flex items-center justify-around space-x-4">
            <div className="flex flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="Title"
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="date">Date</label>
              <input
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                id="date"
                type={"text"}
                placeholder="DD/MM/YY"
              />
            </div>
          </div>
          {/* Location Address */}
          <div className="flex flex-col items-center justify-around space-x-4 md:flex-row">
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="Dunn Bros"
              />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="date">Address</label>
              <input
                className="w-full rounded-xl  border border-gray-300 p-3 text-xs outline-none focus:border-gray-600 md:text-base"
                id="date"
                type={"text"}
                placeholder="1569 Grand Ave, St Paul, MN 55105"
              />
            </div>
          </div>
          {/* price, ticket link */}
          <div className="flex flex-col items-center justify-around space-x-8 md:flex-row">
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="location">Price</label>
              <input
                type="text"
                id="location"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="25.00"
              />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="date">Ticket Link</label>
              <input
                className="w-full rounded-xl  border border-gray-300 p-3 text-xs outline-none focus:border-gray-600 md:text-base"
                id="date"
                type={"text"}
                placeholder="https://www.eventbrite.com/"
              />
            </div>
          </div>
          {/* image and register */}
          <div className="flex flex-col items-center justify-around space-x-8 md:flex-row">
            <div className="flex w-full flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="location">Image</label>
              <input
                type="text"
                id="location"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder=""
              />
            </div>
            <div className="flex flex-col items-start justify-start space-x-4 space-y-4">
              <label htmlFor="date">Attendees must register?</label>
              <input
                className="h-4 w-4 rounded  border  border-gray-300 p-4 text-lg outline-none focus:border-gray-600 md:text-base"
                id="date"
                type={"checkbox"}
              />
            </div>
          </div>

          {/* Event Summary */}
          <div className="space-y-4">
            <label htmlFor="excerpt">Event Summary</label>
            <textarea
              id="excerpt"
              className="h-full w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-600"
              placeholder="Event Summary"
            />
          </div>
          {/* Description */}
          <div className="space-y-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="h-full w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-600"
              placeholder="Event Details"
              rows={10}
            />
          </div>
          {/* additionalInformation */}
          <div className="space-y-4">
            <label htmlFor="additionalInformation">Addiontal Information</label>
            <input
              type="text"
              id="additionalInformation"
              className="h-full w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-600"
              placeholder="..."
            />
          </div>
          {/* Buttons */}
          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Add Event
            </button>
            <button
              type="button"
              className="mx-8 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WriteEventForm;
