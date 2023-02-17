import Link from "next/link";
import Image from "next/image";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

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

const EventPreviewCard = ({
  event: { title, date, location, excerpt, featuredImage, slug, address },
}: EventPreviewCardProps) => {
  dayjs.extend(LocalizedFormat);

  return (
    <div className="m-8">
      <Link href={`/events/${slug}`}>
        <div className="group  flex min-w-[40rem] max-w-[70vw] flex-1 cursor-pointer items-center justify-center space-x-4 rounded-lg border-2 border-gray-300 p-8 shadow-xl transition-all ease-in-out hover:border-gray-400 hover:shadow-gray-400">
          <div className="mr-8 flex flex-1 flex-col flex-wrap items-start justify-center border-r-2 border-gray-300 pr-12 text-gray-600 hover:text-gray-900">
            <h2 className="m-4 w-fit pb-4 text-3xl group-hover:underline">
              {title}
            </h2>
            <div className="flex">
              <div className="pr-2 text-xl">
                <IoCalendarNumberOutline />
              </div>
              {date.toLocaleDateString()} @ {dayjs(date).format("LT")}
            </div>
            <address className="my-4 flex">
              <IoLocationOutline className="text-lg" />
              {location} <br /> {address}
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
      </Link>
    </div>
  );
};

export default EventPreviewCard;
