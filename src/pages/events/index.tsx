import { useState } from "react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps } from "next";
import type { Event } from "@prisma/client";
import Banner from "../../components/Banner";
import { appRouter } from "../../server/api/root";
import superjson from "superjson";
import EventPreviewCard from "../../components/Cards/EventPreviewCard/";
import { createInnerTRPCContext } from "../../server/api/trpc";

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  // get Events
  const pastEvents: Event[] = await ssg.event.getPastEvents.fetch();
  const futureEvents: Event[] = await ssg.event.getFutureEvents.fetch();

  const parsedFutureEvents: unknown = JSON.parse(JSON.stringify(pastEvents));
  const parsedPastEvents: unknown = JSON.parse(JSON.stringify(futureEvents));

  return {
    props: {
      futureEvents: parsedFutureEvents,
      pastEvents: parsedPastEvents,
    },
    revalidate: 10,
  };
};

const EventsPage = ({
  pastEvents,
  futureEvents,
}: {
  pastEvents: Event[];
  futureEvents: Event[];
}) => {
  const [eventMenu, setEventMenu] = useState<"upcomming" | "past" | "gallery">("upcomming");

  return (
    <section>
      <Banner imagePath="/images/events.jpeg.webp" title="Events" />
      <div className="my-8">
        <div className="m-16 flex flex-col">
          <div className="mb-8 flex items-center justify-center">
            <div className="tabs flex-nowrap md:mb-8">
              <h2
                className={`tab-lifted tab  tab-lg ${
                  eventMenu === "upcomming" ? "tab-active" : ""
                } text-sm md:text-base`}
                onClick={() => {
                  setEventMenu("upcomming");
                }}
              >
                Upcomming Events
              </h2>
              <h2
                className={`tab-lifted tab  tab-lg ${
                  eventMenu === "past" ? "tab-active" : ""
                } text-sm md:text-base`}
                onClick={() => {
                  setEventMenu("past");
                }}
              >
                Past Events
              </h2>
            </div>
          </div>
          {/* past Events  */}
          <div className=" flex flex-col items-center xl:grid xl:grid-cols-4">
            {eventMenu === "past" &&
              pastEvents.map((event) => {
                // return <div>{event.title}</div>;
                return (
                  <div key={event.id} className="lg:col-span-2">
                    <EventPreviewCard key={event.title} event={event} />
                  </div>
                );
              })}
          </div>

          {/* future Events  */}
          <div className=" flex flex-col items-center xl:grid xl:grid-cols-4">
            {eventMenu === "upcomming" &&
              futureEvents.map((event) => {
                // return <div>{event.title}</div>;
                return (
                  <div key={event.id} className="lg:col-span-2">
                    <EventPreviewCard key={event.title} event={event} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
