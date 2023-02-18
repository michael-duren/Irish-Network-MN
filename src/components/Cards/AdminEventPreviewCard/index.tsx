import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GiBinoculars } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import DeleteWarningModal from "../../Modals/DeleteWarningModal";
import { api } from "../../../utils/api";
import toast from "react-hot-toast";

import GreenButton from "../../Buttons/EditButton/GreenButton";
import OrangeButton from "../../Buttons/EditButton/OrangeButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import { Interweave } from "interweave";

type EventPreviewCardProps = {
  event: {
    title: string;
    date: Date;
    location: string;
    excerpt: string;
    featuredImage: string | null;
    slug: string;
    address: string;
    id: string;
  };
  invalidate: () => Promise<void>;
};

const AdminEventPreviewCard = ({
  event: { title, date, location, excerpt, featuredImage, slug, address, id },
  invalidate,
}: EventPreviewCardProps) => {
  const [warningModalOpen, setwarningModalOpen] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);

  dayjs.extend(LocalizedFormat);

  const deleteEvent = api.event.deleteEvent.useMutation({
    onSuccess: () => {
      console.log("Event Deleted :(");
      setwarningModalOpen(false);
      toast.error(`Deleted Event ${title}!`);
      async () => {
        await invalidate();
      };
    },
  });

  return (
    <div className="m-8 flex flex-col rounded-md border-2 border-gray-300 p-8 shadow-xl transition-all duration-500 ease-in-out hover:border-gray-400 hover:shadow-gray-400">
      <div className=" flex min-w-[40rem] max-w-[70vw] flex-1 items-center justify-center space-x-4 rounded-lg ">
        <div className="mr-8 flex flex-1 flex-col flex-wrap items-start justify-center border-r-2  pr-12 text-gray-600 hover:text-gray-900">
          <h2 className="m-4 flex w-fit pb-4 text-3xl ">
            <Link legacyBehavior href={`/events/${slug}`}>
              <a
                className="text-gray-500 hover:text-gray-800 hover:underline"
                target="_blank"
              >
                {title}
              </a>
            </Link>
            <div
              onClick={() => setShowEditOptions(!showEditOptions)}
              className="ml-4 cursor-pointer text-gray-500 hover:text-gray-800"
            >
              <FiEdit />
            </div>
          </h2>

          <div className="flex">
            <div className="pr-2 text-xl">
              <IoCalendarNumberOutline />
            </div>
            {date.toLocaleDateString()} @ {dayjs(date).format("LT")}
          </div>
          <address className=" my-4 flex">
            <IoLocationOutline className="text-lg" />
            <div className="flex flex-col">
              <div>{location}</div>

              <div className="prose">
                <Interweave content={address} />
              </div>
            </div>
          </address>
          <p className="prose">
            <Interweave content={excerpt} />
          </p>
        </div>
        <div className="relative flex h-64 w-60 flex-col items-center  ">
          {featuredImage && (
            <Image
              className="rounded-lg"
              src={featuredImage}
              fill
              style={{ objectFit: "cover" }}
              alt={`Event Image for ${title}`}
            />
          )}
        </div>
      </div>
      {/* edit options */}
      {showEditOptions && (
        <div className="mt-4 flex justify-around space-x-4 border-t-2 pt-4">
          <div className="flex flex-1 items-center justify-start space-x-8">
            <Link legacyBehavior href={`/events/${slug}`}>
              <a target="_blank">
                <GreenButton icon={GiBinoculars} type="submit">
                  View
                </GreenButton>
              </a>
            </Link>
            <OrangeButton type="button">Edit</OrangeButton>
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
      <DeleteWarningModal
        isOpen={warningModalOpen}
        setIsOpen={setwarningModalOpen}
        warning={`Are you sure you want to delete the event ${title}?`}
        title="WARNING"
      >
        <div className="mt-8 flex space-x-8">
          <RedButton type="button" onClick={() => deleteEvent.mutate({ id })}>
            Yes, Delete
          </RedButton>
          <GreenButton type="button" onClick={() => setwarningModalOpen(false)}>
            Heck No!
          </GreenButton>
        </div>
      </DeleteWarningModal>
    </div>
  );
};

export default AdminEventPreviewCard;
