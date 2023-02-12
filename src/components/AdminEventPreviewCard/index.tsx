import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import DeleteWarningModal from "../DeleteWarningModal";

type EventPreviewCardProps = {
  event: {
    title: string;
    date: Date;
    location: string;
    excerpt: string;
    featuredImage: string | null;
    slug: string;
    address: string;
  };
};

const AdminEventPreviewCard = ({
  event: { title, date, location, excerpt, featuredImage, slug, address },
}: EventPreviewCardProps) => {
  const [warningModalOpen, setwarningModalOpen] = useState(false);
  dayjs.extend(LocalizedFormat);

  return (
    <div className="m-8 flex flex-col rounded-md border-2 border-gray-300 p-8 shadow-xl transition-all ease-in-out hover:border-gray-400 hover:shadow-gray-400">
      <div className="group  flex min-w-[40rem] max-w-[70vw] flex-1 cursor-pointer items-center justify-center space-x-4 rounded-lg ">
        <div className="mr-8 flex flex-1 flex-col flex-wrap items-start justify-center border-r-2  pr-12 text-gray-600 hover:text-gray-900">
          <Link legacyBehavior href={`/events/${slug}`}>
            <a target="_blank">
              <h2 className="m-4 w-fit pb-4 text-3xl group-hover:underline">
                {title}
              </h2>
            </a>
          </Link>
          <div className="flex">
            <div className="pr-2 text-xl">
              <IoCalendarNumberOutline />
            </div>
            {date.toLocaleDateString()} @ {dayjs(date).format("LT")}
          </div>
          <address className="my-4 flex">
            <IoLocationOutline className="text-lg" />
            {location} {address}
          </address>
          <p>{excerpt}</p>
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
      <div className="justify flex items-center space-x-4">
        <Link legacyBehavior href={`/events/${slug}`}>
          <a target="_blank">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              View
            </button>
          </a>
        </Link>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Edit
        </button>
        <button
          type="button"
          className="mx-8 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={() => setwarningModalOpen(true)}
        >
          Delete
        </button>
      </div>
      <DeleteWarningModal
        isOpen={warningModalOpen}
        setIsOpen={setwarningModalOpen}
        warning="Are you sure you want to delete this event?"
        title="WARNING"
      />
    </div>
  );
};

export default AdminEventPreviewCard;
