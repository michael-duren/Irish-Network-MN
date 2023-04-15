import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { api } from "../../../utils/api";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import OrangeButton from "../../Buttons/EditButton/OrangeButton";
import RedButton from "../../Buttons/EditButton/RedButton";
import SettingsModals from "../SettingsModals";

type AccountProps = {
  session: Session;
};

const Settings = ({ session }: AccountProps) => {
  const router = useRouter();
  // Update functions
  const updateEmail = api.user.updateEmail.useMutation({
    onSuccess: () => {
      toast.success("EMAIL UPDATED 🥳");
      setTimeout(() => {
        router.reload();
      }, 2000);
    },
    onError: () => {
      toast.error("OOPS! We hit a snag 😬");
    },
  });

  const onUpdateEmail = (newEmail: string, userId: string) => {
    updateEmail.mutate({ userId, newEmail });
  };

  const deleteAccount = api.user.deleteAccount.useMutation({
    onError: () => {
      toast.error("OOPS! We hit a snag 😬");
    },
  });
  const deleteAccountEmail = api.email.deleteUserAccount.useMutation();
  const onDeleteAccount = () => {
    deleteAccount.mutate({ userId: session.user.id });
    deleteAccountEmail.mutate();
    void signOut({ callbackUrl: "http://localhost:3000/" });
    toast.error("Deleted account 😞");
  };

  const settings = [
    {
      title: "Sign up for Newsletter?",
      buttonTitle: "Sign Up",
      buttonType: GreenButton,
      onClick: () => setsignUpModalOpen(true),
    },
    {
      title: "Account Support?",
      buttonTitle: "Contact Us",
      buttonType: GreenButton,
      onClick: () => void router.push("mailto:info@irishnetworkmn.org"),
      icon: HiOutlineMail,
    },
    {
      title: "Change Email?",
      buttonTitle: "Edit",
      buttonType: OrangeButton,
      onClick: () => setEditEmailModalOpen(true),
    },
    {
      title: "Delete Account?",
      buttonTitle: "Delete",
      buttonType: RedButton,
      onClick: () => setWarningModalOpen(true),
    },
  ];

  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);
  const [signUpModalOpen, setsignUpModalOpen] = useState(false);

  return (
    <div className="relative mx-4 flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-center justify-evenly  rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 lg:items-start">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      {settings.map((setting) => {
        // setting.icon ? ""
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
              icon={setting.icon}
            >
              {setting.buttonTitle}
            </setting.buttonType>
          </div>
        );
      })}
      {/* Modals */}
      <SettingsModals
        editEmailModalOpen={editEmailModalOpen}
        onDeleteAccount={onDeleteAccount}
        session={session}
        setEditEmailModalOpen={setEditEmailModalOpen}
        setSignUpModalOpen={setsignUpModalOpen}
        setWarningModalOpen={setWarningModalOpen}
        signUpModalOpen={signUpModalOpen}
        warningModalOpen={warningModalOpen}
        updateEmail={onUpdateEmail}
      />
    </div>
  );
};

export default Settings;
