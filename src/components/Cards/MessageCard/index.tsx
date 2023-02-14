import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RedButton from "../../Buttons/EditButton/RedButton";

type MessageCardProps = {
  message: {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    title: string;
  };
};

const MessageCard = ({
  message: { name, email, message, createdAt, title },
}: MessageCardProps) => {
  dayjs.extend(relativeTime);

  return (
    <div className="m-8 flex flex-col border-2 border-gray-300 bg-white p-8">
      <h2 className="text-lg">{title}</h2>
      <p>
        from: {name} at {email}
      </p>
      <p>{message}</p>
      <p>{dayjs(createdAt).fromNow()}</p>
      <div className="mt-8 flex items-center justify-end">
        <RedButton type="button">Delete</RedButton>
      </div>
    </div>
  );
};

export default MessageCard;
