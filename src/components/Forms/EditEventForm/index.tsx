import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

import WideModal from "../../Modals/WideModal";
import { api } from "../../../utils/api";

import UploadImageButton from "../../Buttons/UploadImageButton";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import Required from "../Required";
import { writeEventSchema } from "../WriteEventForm";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

type EditEventFormProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  slug: string;
};

export type EditEventFormSchema = z.infer<typeof writeEventSchema>;

const EditEventForm = ({ isOpen, closeModal, slug }: EditEventFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditEventFormSchema>({
    resolver: zodResolver(writeEventSchema),
  });

  const eventRoute = api.useContext().event;

  const currentEvent = api.event.getSingleEvent.useQuery({ slug });

  const createEvent = api.event.updateEvent.useMutation({
    onSuccess: () => {
      toast.success("Updated Event!");
      closeModal(false);
      reset();
      void eventRoute.getEvents.invalidate();
    },
    onError: (error) => {
      toast.error("Oh No! We ran into a problem");
      console.log(error);
    },
  });

  const onSubmit = (data: EditEventFormSchema) => {
    createEvent.mutate({ ...data, featuredImage: imageUrl });
  };

  return (
    <div>
      <WideModal isOpen={isOpen} title={"Edit Event"} closeModal={closeModal}>
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
                defaultValue={currentEvent.data?.title}
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
                defaultValue={currentEvent.data?.date.toLocaleTimeString()}
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
                defaultValue={currentEvent.data?.location}
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
                      onChange={(value) => field.onChange(value)}
                      theme="snow"
                      defaultValue={currentEvent.data?.address}
                      value={currentEvent.data?.address}
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
              <UploadImageButton setImageUrl={setImageUrl} />
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
              <Required />{" "}
              <span className="text-gray-400">denotes required fields</span>
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

export default EditEventForm;
