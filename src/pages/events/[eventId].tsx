import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { IoMdArrowRoundBack, IoIosCalendar } from "react-icons/io";
import { HiOutlineTicket } from "react-icons/hi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FiMapPin } from "react-icons/fi";

import { api } from "../../utils/api";
import Spinner from "../../components/Spinners/Spinner";
import GreenButton from "../../components/Buttons/EditButton/GreenButton";
import { Interweave } from "interweave";

dayjs.extend(LocalizedFormat);

const EventPage = () => {
  const { query } = useRouter();
  const { data: event } = api.event.getSingleEvent.useQuery(
    {
      slug: query.eventId as string,
    },
    {
      enabled: !!query.eventId,
    }
  );

  if (!event?.featuredImage) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  return (
    <section className="mb-8">
      <Link
        href="/events"
        className="ml-16 flex cursor-pointer items-center justify-start text-lg text-red-400 hover:text-red-500"
      >
        <IoMdArrowRoundBack className="mr-2" />
        <p>Back</p>
      </Link>
      <div className="mx-16 flex flex-col items-center justify-center text-gray-700">
        {/* Event Banner */}
        <div className=" mb-16 flex flex-col py-8">
          <div className="flex justify-center border-b-2 border-gray-600 pb-4 text-3xl shadow-md">
            <h1>{event?.title}</h1>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row md:space-x-8">
          {/* Event Details Card */}
          <div className="mt-4 flex w-[20rem] flex-col  rounded-lg border-2 border-gray-300 bg-white px-6 py-8 shadow-md md:mt-0 md:w-full">
            <div className="mb-8">
              <h3 className="text-xl">Details:</h3>
            </div>

            <div className="flex w-[40vw] flex-1 flex-col items-start justify-center space-y-4 font-light">
              {/* Date */}
              <div className="flex  space-x-4">
                <IoIosCalendar className="shrink-0" size={20} />
                <p className="font-light">{dayjs(event?.date).format("LLLL")}</p>
              </div>
              {/* Location Address */}
              <div className="prose flex space-x-4">
                <FiMapPin size={20} />
                <div className="flex flex-col">
                  <div className="font-light">{event?.location}</div>
                  <address className="">
                    <Interweave content={event.address} />
                  </address>
                </div>
              </div>
              {/* tickets, price, etc */}
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-around md:space-y-0 md:space-x-10">
                  <div className="flex space-x-2">
                    <HiOutlineTicket size={20} />
                    <div>{event?.price}</div>
                  </div>
                  <div className="hover:font-normal hover:text-gray-800">
                    {event?.ticketLink && (
                      <a target="_blank" rel="noreferrer" href={event?.ticketLink}>
                        Get Tickets
                      </a>
                    )}
                  </div>
                  <div>
                    {event?.register && (
                      <GreenButton size={10} icon={ImCheckboxUnchecked} type="button">
                        Register
                      </GreenButton>
                    )}
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="prose w-[18rem] py-8 px-2 text-sm font-normal leading-6 md:w-full ">
                <Interweave content={event.description} />
              </div>
              {/* additional content for small screens */}
              <div className="w-60 px-6 py-8 shadow-md md:hidden ">
                <div className="prose text-xs">
                  <Interweave content={event.additionalInformation} />
                </div>
              </div>
            </div>
          </div>
          {/* Event Image and Additional Contet */}
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-300 px-6 py-8 shadow-md">
            {/* Image */}
            <div className="relative h-80 min-h-[20rem] w-full flex-1 rounded-lg bg-gradient-to-b  from-gray-300 via-gray-100 to-transparent shadow-sm">
              <Image
                src={event?.featuredImage}
                alt={event.title}
                fill
                className="rounded-lg"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Additional Content */}
            <div className="hidden rounded-lg  border-2 px-6 py-8 shadow-md md:flex md:flex-col ">
              <div>
                <h3>Additional Content</h3>
              </div>
              <div className="prose">
                <Interweave content={event.additionalInformation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPage;
