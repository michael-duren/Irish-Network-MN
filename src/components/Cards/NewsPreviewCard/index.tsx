import Image from "next/image";
import { Interweave } from "interweave";
import MainButton from "../../Buttons/MainButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type NewsCardProps = {
  post: {
    title: string;
    body: string;
    date: Date | null;
    featuredImage: string;
    createdAt: Date;
  };
};

dayjs.extend(relativeTime);

const NewsPreviewCard = ({ post }: NewsCardProps) => {
  const stringDate = dayjs(post.date).fromNow();
  console.log(stringDate);

  return (
    <div className="mx-2 my-4 flex  max-w-[40rem] flex-col items-center rounded-2xl border-2  bg-base-100 shadow-xl md:flex-row ">
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
        <h2 className="mr-4 text-2xl text-gray-700">{post.title}</h2>
        <div className="mt-8 flex flex-col items-start">
          <p className="mb-8 mr-4 text-sm leading-6 text-gray-600 line-clamp-6">
            <Interweave content={post.body} />
          </p>

          <div className="mr-8 text-sm font-light">
            <i>{stringDate}</i>
          </div>
          <div className="flex w-full justify-end  space-x-2">
            <MainButton type="button">Read More</MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPreviewCard;
