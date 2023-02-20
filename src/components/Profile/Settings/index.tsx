import type { Session } from "next-auth";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import GreenButton from "../../Buttons/EditButton/GreenButton";
import OrangeButton from "../../Buttons/EditButton/OrangeButton";
import RedButton from "../../Buttons/EditButton/RedButton";

type AccountProps = {
  session: Session;
};

const Settings = ({ session }: AccountProps) => {
  return (
    <div className=" flex flex-col rounded-3xl text-gray-900  lg:flex-row">
      <div className="relative  mx-4 flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-start  justify-evenly   rounded-3xl bg-white p-8 shadow-xl transition-all duration-300">
        <h2 className="text-lg">Account Settings</h2>

        <div className="flex w-full items-center justify-start space-x-2">
          <p className="">Sign up for Newsletter?</p>

          <GreenButton additionalStyle=" absolute  left-[60%] " type="button">
            Sign Up
          </GreenButton>
        </div>
        <div className="flex items-center space-x-2">
          <p>Support?</p>
          <GreenButton additionalStyle=" absolute left-[60%] " type="button">
            Contact Us
          </GreenButton>
        </div>
        <div className="flex items-center space-x-2">
          <p>Change Email?</p>
          <OrangeButton additionalStyle=" absolute left-[60%] " type="button">
            Edit
          </OrangeButton>
        </div>
        <div className="flex items-center space-x-2">
          <p>Delete Account?</p>
          <RedButton additionalStyle=" absolute left-[60%] " type="button">
            Delete
          </RedButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;
