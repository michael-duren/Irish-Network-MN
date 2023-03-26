import Link from "next/link";
import Image from "next/image";
import { polyfill } from "interweave-ssr";
import { Interweave } from "interweave";
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
  const dateObj = new Date(date);

  polyfill();

  return (
    <div className="m-8">
      <Link href={`/events/${slug}`}>
        <div
          className="group flex min-h-[20rem]  flex-1 cursor-pointer flex-col items-center
          justify-center space-x-4 rounded-lg border-2 border-gray-300 p-4 shadow-xl
          transition-all ease-in-out hover:border-gray-400 hover:shadow-gray-400 md:max-h-[30rem] md:min-w-[35rem] md:max-w-[40rem] md:flex-row md:p-8"
        >
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
          <div className="mr-8 flex flex-1 flex-col flex-wrap items-start justify-center border-gray-300 pl-4  text-gray-600 hover:text-gray-900 lg:border-l-2">
            <h2 className="m-4 w-fit pb-4 text-3xl group-hover:underline">{title}</h2>
            <div className="flex">
              <div className="pr-2 text-xl">
                <IoCalendarNumberOutline />
              </div>
              {dateObj.toLocaleDateString()} @ {dayjs(dateObj).format("LT")}
            </div>
            <address className=" my-4 flex ">
              <IoLocationOutline className="text-lg" />
              <div>
                <div>{location}</div>
                <Interweave noHtml content={address} />
              </div>
            </address>

            <Interweave content={excerpt} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventPreviewCard;
