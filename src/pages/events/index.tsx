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
  const res: Event[] = await ssg.event.getEvents.fetch();

  return {
    props: {
      events: JSON.parse(JSON.stringify(res)),
    },
    revalidate: 10,
  };
};

const EventsPage = ({ events }: { events: Event[] }) => {
  return (
    <section>
      <Banner imagePath="/images/events.jpeg.webp" title="Events" />
      <div className="m-8 flex flex-col items-center">
        {events.map((event) => {
          // return <div>{event.title}</div>;
          return <EventPreviewCard key={event.title} event={event} />;
        })}
      </div>
    </section>
  );
};

export default EventsPage;
