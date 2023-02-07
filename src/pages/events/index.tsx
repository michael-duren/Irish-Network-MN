import { type NextPage } from "next";

import Banner from "../../components/Banner";
import EventPreviewCard from "../../components/EventPreviewCard";

const Events: NextPage = () => {
  const DUMMY_DATA = [
    {
      title: "Irish Fair",
      date: "February 3rd, 2023",
      time: "3:00 PM",
      location: "Dunn Bros, 234 Grand Ave, St. Paul, MN",
      excerpt:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eaque, et dicta ratione eveniet mollitia dolor tenetur hic totam ipsa.",
      image: "/images/event-example.jpg",
      slug: "irish-fair",
    },
    {
      title: "Irish Day",
      date: "January 3rd, 2023",
      time: "3:00 PM",
      location: "Dunn Bros, 234 Grand Ave, St. Paul, MN",
      excerpt:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eaque, et dicta ratione eveniet mollitia dolor tenetur hic totam ipsa.",
      image: "/images/bag-pipes.jpg",
      slug: "irish-day",
    },
    {
      title: "Irish Fair",
      date: "March 3rd, 2023",
      time: "3:00 PM",
      location: "Dunn Bros, 234 Grand Ave, St. Paul, MN",
      excerpt:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eaque, et dicta ratione eveniet mollitia dolor tenetur hic totam ipsa.",
      image: "/images/event-example.jpg",
      slug: "irish-fair",
    },
  ];

  return (
    <section>
      <Banner imagePath="/images/balcony2.jpg" title="Events" />
      <div className="m-8 flex flex-col items-center">
        {DUMMY_DATA.map((event) => {
          return <EventPreviewCard key={event.title} event={event} />;
        })}
      </div>
    </section>
  );
};

export default Events;
