import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Interweave } from "interweave";
import MainButton from "../../Buttons/MainButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import EditEventForm from "../../Forms/EditEventForm";
import toast from "react-hot-toast";
import VerificationModal from "../../Modals/VerificationModal";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GiBinoculars } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import OrangeButton from "../../Buttons/EditButton/OrangeButton";
import RedButton from "../../Buttons/EditButton/RedButton";

import { api } from "../../../utils/api";

type NewsCardProps = {
  post: {
    title: string;
    body: string;
    date: Date | null;
    featuredImage: string;
    createdAt: Date;
    slug: string;
    id: string;
  };
};

dayjs.extend(relativeTime);

const AdminNewsPreviewCard = ({ post }: NewsCardProps) => {
  const [warningModalOpen, setwarningModalOpen] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const stringDate = dayjs(post.date).fromNow();

  const deletePost = api.news.deleteNewsPost.useMutation({
    onSuccess: () => {
      setwarningModalOpen(false);
      toast.error(`Deleted Event ${post.title}!`);
    },
  });

  return (
    <div className="flex max-w-[40rem] flex-col rounded-2xl border-2  bg-base-100 shadow-xl">
      <div className="mx-2 my-4 flex  max-w-[40rem] flex-col items-center  md:flex-row ">
        <figure className="relative my-4 mx-2 min-h-[20rem] min-w-[20rem] max-w-[20rem]  rounded-3xl">
          <Image
            src={post.featuredImage}
            className="rounded-3xl"
            style={{ objectFit: "cover" }}
            alt="post image"
            fill
          />
        </figure>
        <div className="mx-4 my-6 flex flex-col ">
          <h2 className="mr-4 flex text-2xl text-gray-700">
            {post.title}

            <div
              onClick={() => setShowEditOptions(!showEditOptions)}
              className="ml-4 cursor-pointer text-gray-500 hover:text-gray-800"
            >
              <FiEdit />
            </div>
          </h2>
          <div className="mt-8 flex flex-col items-start">
            <p className="mb-8 mr-4 text-sm leading-6 text-gray-600 line-clamp-6">
              <Interweave content={post.body} />
            </p>

            <div className="mr-8 text-sm font-light">
              <i>{stringDate}</i>
            </div>
          </div>
        </div>
      </div>
      {/* edit options */}
      {showEditOptions && (
        <div className="m-4 flex justify-around space-x-4 border-t-2 pt-4">
          <div className="flex flex-1 items-center justify-start space-x-8">
            <Link legacyBehavior href={`/news/${post.slug}`}>
              <a target="_blank">
                <GreenButton icon={GiBinoculars} type="submit">
                  View
                </GreenButton>
              </a>
            </Link>
            <OrangeButton onClick={() => setEditEventModalOpen(true)} type="button">
              Edit
            </OrangeButton>
            <RedButton type="button" onClick={() => setwarningModalOpen(true)}>
              Delete
            </RedButton>
          </div>
          <div
            className="cursor-pointer transition-all duration-300"
            onClick={() => setShowEditOptions(false)}
          >
            <AiOutlineClose className="text-xl text-gray-400 hover:text-gray-800" />
          </div>
        </div>
      )}
      <VerificationModal
        isOpen={warningModalOpen}
        setIsOpen={setwarningModalOpen}
        title="WARNING"
        message={`Are you sure you want to delete ${post.title}?`}
      >
        <div className="mt-8 flex space-x-8">
          <RedButton type="button" onClick={() => deletePost.mutate({ id: post.id })}>
            Yes, Delete
          </RedButton>
          <GreenButton type="button" onClick={() => setwarningModalOpen(false)}>
            Heck No!
          </GreenButton>
        </div>
      </VerificationModal>
      <EditEventForm
        isOpen={editEventModalOpen}
        closeModal={setEditEventModalOpen}
        slug={post.slug}
      />
    </div>
  );
};

export default AdminNewsPreviewCard;
