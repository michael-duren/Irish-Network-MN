import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import WideModal from "../../Modals/WideModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";

import GreenButton from "../../Buttons/EditButton/GreenButton";
import RedButton from "../../Buttons/EditButton/RedButton";

export const writeEventSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(5),
  description: z.string().min(5),

  date: z.string(),
  address: z.string(),
  location: z.string(),
  additionalInformation: z.string().or(z.undefined()),
  featuredImage: z.string().or(z.undefined()),
  price: z.string(),
  ticketLink: z.string(),
  register: z.boolean(),
});

type WriteEventFormProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
};

export type WriteEventFormData = z.infer<typeof writeEventSchema>;

const WriteEventForm = ({ isOpen, closeModal }: WriteEventFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WriteEventFormData>({
    resolver: zodResolver(writeEventSchema),
  });

  const eventRoute = api.useContext().event;

  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      toast.success("Created Event!");
      closeModal(false);
      reset();
      void eventRoute.getEvents.invalidate();
    },
    onError: (error) => {
      toast.error("Oh No! We ran into a problem");
      console.log(error);
    },
  });

  const onSubmit = (data: WriteEventFormData) => {
    createEvent.mutate(data);
  };
  return (
    <div>
      <WideModal isOpen={isOpen} title={"Add Event"} closeModal={closeModal}>
        <form
          className="my-8 mx-4 flex flex-col justify-center space-y-8"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title Date */}
          <div className=" flex items-center justify-around space-x-4">
            <div className="mr-8 flex flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col items-start justify-center space-y-4">
              <label htmlFor="date">Date</label>
              <input
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                id="date"
                type={"datetime-local"}
                placeholder="YY/MM/DD"
                {...register("date")}
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
                {...register("location")}
              />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="date">Address</label>
              <input
                className="w-full rounded-xl  border border-gray-300 p-3 text-xs outline-none focus:border-gray-600 md:text-base"
                id="address"
                type={"text"}
                placeholder="1569 Grand Ave, St Paul, MN 55105"
                {...register("address")}
              />
            </div>
          </div>
          {/* price, ticket link */}
          <div className="flex flex-col items-center justify-around space-x-8 md:flex-row">
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="0.00"
                {...register("price")}
              />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="ticketLink">Ticket Link</label>
              <input
                className="w-full rounded-xl  border border-gray-300 p-3 text-xs outline-none focus:border-gray-600 md:text-base"
                id="ticketLink"
                type={"text"}
                placeholder="https://www.eventbrite.com/"
                {...register("ticketLink")}
              />
            </div>
          </div>
          {/* image and register */}
          <div className="flex flex-col items-center justify-around space-x-8 md:flex-row">
            <div className="flex w-full flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder=""
                {...register("featuredImage")}
              />
            </div>
            <div className="flex flex-col items-start justify-start space-x-4 space-y-4">
              <label htmlFor="register">Attendees must register?</label>
              <input
                className="h-4 w-4 rounded  border  border-gray-300 p-4 text-lg outline-none focus:border-gray-600 md:text-base"
                id="register"
                type={"checkbox"}
                {...register("register")}
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
              {...register("excerpt")}
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
              {...register("description")}
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
              {...register("additionalInformation")}
            />
          </div>
          {/* Buttons */}
          <div className="space-x-8">
            <GreenButton type="submit" onClick={() => console.log(errors)}>
              Add Event
            </GreenButton>
            <RedButton type="button" onClick={() => closeModal(false)}>
              Cancel
            </RedButton>
          </div>
        </form>
      </WideModal>
    </div>
  );
};

export default WriteEventForm;
