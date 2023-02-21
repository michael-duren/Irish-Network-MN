import type { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VerificationModal from "../../Modals/VerificationModal";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import Required from "../../Forms/Required";
import { useForm } from "react-hook-form";

type SettingsModalProps = {
  warningModalOpen: boolean;
  setWarningModalOpen: Dispatch<SetStateAction<boolean>>;
  editEmailModalOpen: boolean;
  setEditEmailModalOpen: Dispatch<SetStateAction<boolean>>;
  signUpModalOpen: boolean;
  setSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
  session: Session;
  onDeleteAccount: () => void;
  updateEmail: (newEmail: string, userId: string) => void;
};

const updateEmailSchema = z.object({
  newEmail: z.string().email({ message: "Please enter a valid email address" }),
});
export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;

const SettingsModals = ({
  warningModalOpen,
  setWarningModalOpen,
  editEmailModalOpen,
  setEditEmailModalOpen,
  signUpModalOpen,
  setSignUpModalOpen,
  session,
  onDeleteAccount,
  updateEmail,
}: SettingsModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
  });

  const onSubmit = (data: UpdateEmailSchema) => {
    updateEmail(data.newEmail, session.user.id);
    console.log("UPDATED");
    setEditEmailModalOpen(false);
  };

  return (
    <>
      {/* Newsletter Sign Up */}
      <VerificationModal
        isOpen={signUpModalOpen}
        setIsOpen={setSignUpModalOpen}
        message={`${session.user.name ?? ""}, click to sign up!`}
        title="Sign up for the Newsletter!"
      >
        {session.user.email && (
          <div className="mt-2 flex space-x-2 text-sm text-gray-500">
            <h3>Current Email:</h3>
            <p>{session.user.email}</p>
          </div>
        )}

        <div className="mb-4 mt-4 flex items-center justify-around rounded-3xl bg-slate-100 py-2 shadow-xl">
          <div className="flex">
            {" "}
            <label className="mr-4 text-sm" htmlFor="newsletter">
              Sign Up
            </label>
            <div className="flex space-x-2">
              <input
                className="rounded-lg border-2 border-gray-300 p-2 text-sm outline-none placeholder:text-gray-300 focus:border-gray-600"
                type="checkbox"
                id="newsletter"
              />
            </div>
          </div>
          <div className="">
            <GreenButton
              type="button"
              onClick={() => setWarningModalOpen(false)}
            >
              Subscribe
            </GreenButton>
          </div>
        </div>
        <div className="mt-4 flex w-80">
          <p className="rounded-3xl bg-slate-100 py-2 px-4 text-xs text-gray-400 shadow-xl">
            Sign up for our newsletter and get updates on events and
            announcements. Our newsletters are only once a month sharing things
            about your local Irish Community!{" "}
          </p>
        </div>
      </VerificationModal>
      {/* Edit email */}
      <VerificationModal
        isOpen={editEmailModalOpen}
        setIsOpen={setEditEmailModalOpen}
        title="Edit Email"
        message="Enter your new email address below"
      >
        {session.user.email && (
          <div className="mt-2 flex space-x-2 text-sm text-gray-500">
            <h3>Current Email:</h3>
            <p>{session.user.email}</p>
          </div>
        )}
        <form
          className="mt-16 flex w-auto flex-col items-center justify-center space-x-4 rounded-3xl bg-slate-100 py-2 px-4 shadow-xl"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex flex-col items-start justify-center">
            <label className="mr-4 text-sm text-gray-700" htmlFor="email">
              <Required /> Email
            </label>
            <div className="flex space-x-2">
              <input
                className="w-64 rounded-lg border-2 border-gray-300 p-2 text-sm outline-none placeholder:text-gray-300 focus:border-gray-600"
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                {...register("newEmail")}
              />
              <div className="flex justify-start">
                <GreenButton type="submit">Update</GreenButton>
              </div>
            </div>
            <p className="mt-2 font-light text-red-500">
              {errors.newEmail?.message}
            </p>
          </div>
        </form>
      </VerificationModal>
      {/* Delete account */}
      <VerificationModal
        isOpen={warningModalOpen}
        setIsOpen={setWarningModalOpen}
        message={`Account for ${session.user.name ?? ""} will be Deleted`}
        title="WARNING"
      >
        <div className="mt-16 flex justify-center space-x-8 rounded-3xl bg-slate-100 py-2 px-3 shadow-xl">
          <RedButton type="button" onClick={onDeleteAccount}>
            Yes, Delete
          </RedButton>
          <GreenButton type="button" onClick={() => setWarningModalOpen(false)}>
            Heck No!
          </GreenButton>
        </div>
      </VerificationModal>
    </>
  );
};

export default SettingsModals;
