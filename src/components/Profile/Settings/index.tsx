import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import OrangeButton from "../../Buttons/EditButton/OrangeButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import DeleteWarningModal from "../../Modals/DeleteWarningModal";

type AccountProps = {
  session: Session;
};

const Settings = ({ session }: AccountProps) => {
  const deleteAccount = api.user.deleteAccount.useMutation({
    onError: () => {
      toast.error("OOPS! We hit a snag");
    },
  });
  const onDeleteAccount = () => {
    deleteAccount.mutate({ userId: session.user.id });
    void signOut({ callbackUrl: "http://localhost:3000/" });
    toast.error("Deleted account 😞");
  };

  const settings = [
    {
      title: "Sign up for Newsletter?",
      buttonTitle: "Sign Up",
      buttonType: GreenButton,
      onClick: () => setWarningModalOpen(true),
    },
    {
      title: "Support?",
      buttonTitle: "Contact Us",
      buttonType: GreenButton,
      onClick: () => setWarningModalOpen(true),
    },
    {
      title: "Change Email?",
      buttonTitle: "Edit",
      buttonType: OrangeButton,
      onClick: () => setWarningModalOpen(true),
    },
    {
      title: "Delete Account?",
      buttonTitle: "Delete",
      buttonType: RedButton,
      onClick: () => setWarningModalOpen(true),
    },
  ];

  const [warningModalOpen, setWarningModalOpen] = useState(false);

  return (
    <div className="relative mx-4 flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-center justify-evenly  rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 lg:items-start">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      {settings.map((setting) => {
        return (
          <div
            key={setting.title}
            className="flex w-full flex-col items-center justify-start space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0"
          >
            <p>{setting.title}</p>
            <setting.buttonType
              additionalStyle=" lg:absolute  lg:left-[60%] "
              type="button"
              onClick={setting.onClick}
            >
              {setting.buttonTitle}
            </setting.buttonType>
          </div>
        );
      })}

      <DeleteWarningModal
        isOpen={warningModalOpen}
        setIsOpen={setWarningModalOpen}
        warning={`Account for ${session.user.name ?? ""} will be Deleted`}
        title="WARNING"
      >
        <div className="mt-16 flex justify-center space-x-8">
          <RedButton type="button" onClick={onDeleteAccount}>
            Yes, Delete
          </RedButton>
          <GreenButton type="button" onClick={() => setWarningModalOpen(false)}>
            Heck No!
          </GreenButton>
        </div>
      </DeleteWarningModal>
    </div>
  );
};

export default Settings;
