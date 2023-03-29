import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";
import SecondaryButton from "../../Buttons/SecondaryButton";

export const writeContactSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  title: z.string().min(4),
  message: z.string().min(5),
});

type WriteContactFormData = z.infer<typeof writeContactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WriteContactFormData>({
    resolver: zodResolver(writeContactSchema),
  });

  const createContact = api.contact.postMessage.useMutation({
    onSuccess: () => {
      toast.success("Message Recieved 😎");
      reset();
    },
    onError: (error) => {
      toast.error("Oh No! Something went wrong 😥");
      console.log(error);
    },
  });

  const onSubmit = (data: WriteContactFormData) => {
    createContact.mutate(data);
  };

  return (
    <form
      className="flex w-[75%] flex-col items-center space-y-8 rounded-3xl border-2  p-8 shadow-xl transition-all duration-300 hover:border-gray-400 lg:w-[50%]"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2">
        <label className="mr-8" htmlFor="name">
          Name
        </label>
        <input
          className="w-56 rounded-lg border-2 border-gray-300 p-2 text-xs outline-none placeholder:text-gray-300 focus:border-gray-600 md:w-80 md:text-sm"
          type="text"
          id="name"
          placeholder="John Doe"
          {...register("name")}
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="mr-8" htmlFor="email">
          Email
        </label>
        <input
          className="w-56 rounded-lg border-2 border-gray-300 p-2 text-xs outline-none placeholder:text-gray-300 focus:border-gray-600 md:w-80 md:text-sm"
          type="email"
          id="email"
          placeholder="johndoe@example.com"
          {...register("email")}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title">Subject</label>
        <input
          className="w-56 rounded-lg border-2 border-gray-300 p-2 text-xs outline-none placeholder:text-gray-300 focus:border-gray-600 md:w-80 md:text-sm"
          type="text"
          id="title"
          placeholder="Message Subject"
          {...register("title")}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </div>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className="h-full w-full rounded-xl border border-gray-300 p-3 text-xs outline-none focus:border-gray-600 md:text-sm lg:text-base"
          placeholder="Write your message here"
          cols={40}
          rows={10}
          {...register("message")}
        />
        <p className="text-red-500">{errors.message?.message}</p>
      </div>
      <div>
        <SecondaryButton type="submit">Send</SecondaryButton>
      </div>
    </form>
  );
};

export default ContactForm;
