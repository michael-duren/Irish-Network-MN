import { useState } from "react";
import Image from "next/image";
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

export const writeNewsPostSchema = z.object({
  title: z.string().min(4, { message: "Title must be at least 4 character(s)" }).max(24),
  body: z.string().min(200, { message: "Description must be at least 200 character(s)" }),
  date: z.string().or(z.undefined()),
  featuredImage: z
    .string()
    .default(
      "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/events/Irish-Network-Logo.jpeg"
    ),
});

type WriteNewsPostFormProps = {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
};

export type WriteNewsPostFormData = z.infer<typeof writeNewsPostSchema>;

const WriteNewsPostForm = ({ isOpen, closeModal }: WriteNewsPostFormProps) => {
  const [imageUrl, setImageUrl] = useState(
    "https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/events/Irish-Network-Logo.jpeg"
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<WriteNewsPostFormData>({
    resolver: zodResolver(writeNewsPostSchema),
  });

  const newsRoute = api.useContext().news;

  const createnews = api.news.createNewsPost.useMutation({
    onSuccess: () => {
      toast.success("Created news!");
      closeModal(false);
      reset();
      void newsRoute.getAllNewsPosts.invalidate();
    },
    onError: (error) => {
      toast.error("Oh No! We ran into a problem");
      console.log(error);
    },
  });

  const onSubmit = (data: WriteNewsPostFormData) => {
    createnews.mutate({ ...data, featuredImage: imageUrl });
  };
  return (
    <div>
      <WideModal isOpen={isOpen} title={"Add Post"} closeModal={closeModal}>
        <form
          className="my-8 mx-4 flex flex-col justify-center space-y-8"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title Date */}
          <div className=" flex items-center justify-around space-x-4">
            <div className="mr-8 flex flex-1 flex-col items-start justify-center  space-y-4">
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
                className="w-full rounded-xl  border border-gray-300 p-3 outline-none focus:border-gray-600"
                id="date"
                type={"datetime-local"}
                placeholder="YY/MM/DD"
                {...register("date")}
              />
              <p className="text-red-500">{errors.date?.message}</p>
            </div>
          </div>
          {/* Image */}
          <div className="flex items-center justify-around">
            <div className="flex w-full flex-col items-start justify-center  space-y-4">
              <label id="news-image" className="flex flex-col" htmlFor="news-image">
                <span className="">Post Image</span>
                <span className="font-thin">Defaults to logo</span>
              </label>
              <div className="flex items-center justify-center">
                <UploadImageButton directory={"news"} setImageUrl={setImageUrl} />
                <div className="relative h-20 w-20">
                  <Image
                    src={imageUrl}
                    alt={"Post Image"}
                    sizes="(max-width: 768px) 40vw,
              (max-width: 1200px) 50vw,
              33vw"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="space-y-4">
            <label htmlFor="description">
              <Required /> Description
            </label>

            <Controller
              name="body"
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
                    placeholder="Post..."
                    onChange={(value) => field.onChange(value)}
                    theme="snow"
                    value={field.value}
                  />
                </div>
              )}
            ></Controller>
            <p className="mt-4 text-red-500">{errors.body?.message}</p>
          </div>
          {/* Buttons */}
          <div className="space-x-8">
            <GreenButton type="submit" onClick={() => console.log(errors)}>
              Post
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

export default WriteNewsPostForm;
