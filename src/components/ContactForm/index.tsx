import { type NextPage } from "next";

const ContactForm: NextPage = () => {
  return (
    <form
      className="flex w-[75%] flex-col items-center space-y-8 rounded-3xl border-2  p-8 shadow-xl transition-all duration-300 hover:border-gray-400 lg:w-[50%]"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="mr-8" htmlFor="name">
          Name
        </label>
        <input
          className="w-64 rounded-lg border-2 border-gray-300 p-2 text-sm outline-none placeholder:text-gray-300 focus:border-gray-600"
          type="text"
          name="name"
          id="name"
          placeholder="Search..."
        />
      </div>
      <div>
        <label className="mr-8" htmlFor="email">
          Email
        </label>
        <input
          className="w-64 rounded-lg border-2 border-gray-300 p-2 text-sm outline-none placeholder:text-gray-300 focus:border-gray-600"
          type="email"
          name="email"
          id="email"
          placeholder="@example.com"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className="h-full w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-600"
          placeholder="Write your message here"
          cols={40}
          rows={10}
        />
      </div>
      <div>
        <button className="rounded-lg border-2 border-gray-300 px-5 py-3 text-lg shadow-sm transition-all duration-300 hover:border-gray-400">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
