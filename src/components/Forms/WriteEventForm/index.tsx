import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import WideModal from "../../Modals/WideModal";
import { api } from "../../../utils/api";

import UploadImageButton from "../../Buttons/UploadImageButton";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import Required from "../Required";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export const writeEventSchema = z.object({
  title: z.string().min(6, { message: "Title must be at least 6 character(s)" }),
  excerpt: z.string().min(40, { message: "Summary must be at least 40 characters" }),
  description: z.string().min(200, { message: "Description must be at least 200 character(s)" }),
  date: z.string().min(4, { message: "Date and Time cannot be empty" }),
  address: z.string().min(6, { message: "Address cannot be empty" }),
  location: z.string().min(6, { message: "Location cannot be empty" }),
  additionalInformation: z.string().or(z.undefined()),
  featuredImage: z
    .string()
    .default(
      "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/events/Irish-Network-Logo.jpeg"
    ),
  price: z.string().min(2, {
    message: "Price cannot be empty, if event is free write 'Free'",
  }),
  ticketLink: z.string().or(z.undefined()),
  register: z.boolean(),
});

type WriteEventFormProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
};

export type WriteEventFormData = z.infer<typeof writeEventSchema>;

const WriteEventForm = ({ isOpen, closeModal }: WriteEventFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
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
    createEvent.mutate({ ...data, featuredImage: imageUrl });
    console.log(data.description);
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
              <label htmlFor="title">
                <Required /> Title
              </label>
              <input
                type="text"
                id="title"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="Title"
                {...register("title")}
              />
              <p className="text-red-500">{errors.title?.message}</p>
            </div>
            <div className="ml-4 flex flex-1 flex-col items-start justify-center space-y-4">
              <label htmlFor="date">
                <Required /> Date
              </label>
              <input
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                id="date"
                type={"datetime-local"}
                placeholder="YY/MM/DD"
                {...register("date")}
              />
              <p className="text-red-500">{errors.date?.message}</p>
            </div>
          </div>
          {/* Location Address */}
          <div className="flex flex-col items-center justify-around space-x-4 md:flex-row">
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="location">
                <Required /> Location
              </label>
              <input
                type="text"
                id="location"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="Dunn Bros"
                {...register("location")}
              />
              <p className="text-red-500">{errors.location?.message}</p>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="address">
                <Required /> Address
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <div>
                    <ReactQuill
                      {...field}
                      placeholder="Event summary"
                      onChange={(value) => field.onChange(value)}
                      theme="snow"
                      value={field.value}
                    />
                  </div>
                )}
              />{" "}
              <p className="text-red-500">{errors.address?.message}</p>
            </div>
          </div>
          {/* price, ticket link */}
          <div className="flex flex-col items-center justify-around space-x-8 md:flex-row">
            <div className="flex w-full flex-1 flex-col items-start justify-center space-x-4 space-y-4">
              <label htmlFor="price">
                <Required /> Price
              </label>
              <input
                type="text"
                id="price"
                className=" w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                placeholder="$20.00"
                {...register("price")}
              />
              <p className="text-red-500">{errors.price?.message}</p>
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
              <label id="event-image" htmlFor="event-image" className="block">
                <span className="">Event Image</span>
              </label>
              <UploadImageButton setImageUrl={setImageUrl} directory={"events"} />
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
            <label htmlFor="excerpt">
              <Required /> Event Summary
            </label>

            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <ReactQuill
                    style={{
                      height: "5rem",
                      marginBottom: "2rem",
                      borderRadius: "50%",
                    }}
                    {...field}
                    placeholder="Event summary"
                    onChange={(value) => field.onChange(value)}
                    theme="snow"
                    value={field.value}
                  />
                </div>
              )}
            />
            <p className="text-red-500">{errors.excerpt?.message}</p>
          </div>
          {/* Description */}
          <div className="space-y-4">
            <label htmlFor="description">
              <Required /> Description
            </label>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <ReactQuill
                    style={{
                      height: "10rem",
                      marginBottom: "2rem",
                      borderRadius: "50%",
                    }}
                    {...field}
                    placeholder="Event description"
                    onChange={(value) => field.onChange(value)}
                    theme="snow"
                    value={field.value}
                  />
                </div>
              )}
            ></Controller>
            <p className="mt-4 text-red-500">{errors.description?.message}</p>
          </div>
          {/* additionalInformation */}
          <div className="space-y-4">
            <label htmlFor="additionalInformation">Addiontal Information</label>
            <Controller
              name="additionalInformation"
              control={control}
              render={({ field }) => (
                <div>
                  <ReactQuill
                    style={{
                      width: "100%",
                      marginBottom: "2rem",
                      borderRadius: "50%",
                    }}
                    {...field}
                    placeholder="Additional information, i.e. links, registering details, etc."
                    onChange={(value) => field.onChange(value)}
                    theme="snow"
                    value={field.value}
                  />
                </div>
              )}
            ></Controller>
            <div className="text-xs">
              <Required /> <span className="text-gray-400">denotes required fields</span>
            </div>
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
