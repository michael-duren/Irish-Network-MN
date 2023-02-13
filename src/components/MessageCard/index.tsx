import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditButton from "../Buttons/EditButton";

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
      <p>from: {email}</p>
      <p>{message}</p>
      <p>{dayjs(createdAt).fromNow()}</p>
      <div className="mt-8 flex items-center justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          ⚠️ Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
