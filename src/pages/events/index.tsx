import { type NextPage } from "next";

import Banner from "../../components/Banner";
import EventPreviewCard from "../../components/Cards/EventPreviewCard";
import Spinner from "../../components/Spinners";

import { api } from "../../utils/api";

const Events: NextPage = () => {
  const getEvents = api.event.getEvents.useQuery();

  return (
    <section>
      <Banner imagePath="/images/events.jpeg.webp" title="Events" />
      <div className="m-8 flex flex-col items-center">
        {getEvents.isLoading && <Spinner />}

        {getEvents.isSuccess &&
          getEvents.data.map((event) => {
            return <EventPreviewCard key={event.title} event={event} />;
          })}
      </div>
    </section>
  );
};

export default Events;
