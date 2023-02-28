import { useState } from "react";
import Image from "next/image";
import type { Team } from "@prisma/client";
import { HiOutlineMail } from "react-icons/hi";
import Spinner from "../../Spinners/Spinner";
import MainButton from "../../Buttons/MainButton";

type TeamMemberCardProps = {
  teamMember: Team;
  key: string;
};

const TeamteamMemberCard = ({ teamMember }: TeamMemberCardProps) => {
  const [selectedTab, setSelectedTab] = useState<
    "Name" | "Occupation" | "History"
  >("Name");

  return (
    <div className="card max-h-[40rem] max-w-md border-2 border-gray-900 bg-gray-800 text-white shadow-xl">
      {/* Tabs-Menu */}
      <div className="tabs my-4 flex justify-center">
        <div
          onClick={() => setSelectedTab("Name")}
          className={`tabs-lifted tab tab-lg hover:text-secondary-color/70  ${
            selectedTab === "Name"
              ? " tab-active text-secondary-color/70 "
              : "text-secondary-color/30"
          }`}
        >
          Name
        </div>
        <div
          className={`tabs-lifted tab tab-lg hover:text-secondary-color/70 ${
            selectedTab === "Occupation"
              ? " tab-active text-secondary-color/70 "
              : "text-secondary-color/30"
          }`}
          onClick={() => setSelectedTab("Occupation")}
        >
          Work
        </div>
        <div
          className={`tabs-lifted tab tab-lg hover:text-secondary-color/70 ${
            selectedTab === "History"
              ? " tab-active text-secondary-color/70 "
              : "text-secondary-color/30"
          }`}
          onClick={() => setSelectedTab("History")}
        >
          History
        </div>
      </div>
      {/* Name */}
      {selectedTab === "Name" && (
        <>
          <figure className="relative h-[30rem]">
            {teamMember.imageUrl ? (
              <Image
                src={teamMember.imageUrl}
                alt={teamMember.name}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Spinner />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">{teamMember.name}</h2>
            <p className="text-red-400">{teamMember.title}</p>
            <div className="card-actions h-10 justify-end">
              <MainButton icon={HiOutlineMail} type="button">
                Contact
              </MainButton>
            </div>
          </div>{" "}
        </>
      )}
      {/* Occupation */}
      {selectedTab === "Occupation" && (
        <>
          <div className="card-body overflow-scroll">
            <h2 className="card-title">{teamMember.name}</h2>
            <div className="card-body">
              <p className=" text-red-400">Occupation</p>
              <p className="text-secondary-color/70">{teamMember.occupation}</p>
            </div>
          </div>{" "}
        </>
      )}
      {/* History */}
      {selectedTab === "History" && (
        <>
          <div className="card-body overflow-scroll">
            <h2 className="card-title">{teamMember.name}</h2>
            <div className="card-body">
              <p className="text-red-400">Irish Connection</p>
              <p className="pt-0 text-secondary-color/70">
                {teamMember.irishConnection}
              </p>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default TeamteamMemberCard;
