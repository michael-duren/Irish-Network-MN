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

const NewsCard = ({ post }: NewsCardProps) => {
  const stringDate = post.date ? dayjs(post.date).fromNow() : dayjs(post.createdAt).fromNow();
  console.log(stringDate);

  return (
    <div className="card card-side mx-2 flex h-[20rem] border-2 bg-base-100 shadow-xl">
      <figure className="relative h-[20rem] min-w-[10rem]">
        <Image src={post.featuredImage} alt="post image" fill />
      </figure>
      <div className=" card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="max-w-20 max-h-[10rem] overflow-hidden overflow-ellipsis">
          <Interweave noHtml content={post.body} />
        </p>
        <div className="card-actions flex items-center justify-start space-x-2">
          <div className="mr-8 text-sm font-light">
            <i>{stringDate}</i>
          </div>
          <MainButton type="button">Read More</MainButton>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
