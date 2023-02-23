import type { GetStaticProps } from "next";
import Image from "next/image";
import Banner from "../../components/Banner";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import superjson from "superjson";
import { Team as TeamPage } from "@prisma/client";
import TeamteamMemberCard from "../../components/Cards/TeamMemberCard";
import MainButton from "../../components/Buttons/MainButton";

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  // get team
  const res: TeamPage[] = await ssg.team.getTeam.fetch();

  // seperate teams
  const officers = res.filter((team) => team.position === "OFFICER");
  const directors = res.filter((team) => team.position === "DIRECTOR");
  const advisors = res.filter((team) => team.position === "ADVISORY");
  const volunteers = res.filter((team) => team.position === "VOLUNTEER");

  return {
    props: {
      directors,
      officers,
      advisors,
      volunteers,
    },
    revalidate: 10,
  };
};

const TeamPage = ({
  officers,
  directors,
  advisors,
  volunteers,
}: {
  officers: TeamPage[];
  directors: TeamPage[];
  advisors: TeamPage[];
  volunteers: TeamPage[];
}) => {
  return (
    <section>
      <Banner imagePath="/images/train.jpg" title="Meet the Team!" />
      {/* Officers */}
      <div className="m-16 h-full">
        <h2 className="mb-16 text-4xl text-red-400">Officers</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {officers.map((teamMember) => {
            return (
              <TeamteamMemberCard key={teamMember.id} teamMember={teamMember} />
            );
          })}
        </div>
      </div>
      {/* Directors & Advisory & Volunteers */}
      <div className="m-16 h-full">
        <h2 className="mb-8 text-4xl text-red-400">Directors</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {directors.map((teamMember) => {
            return (
              <TeamteamMemberCard key={teamMember.id} teamMember={teamMember} />
            );
          })}
          {/* Advisory & Volunteers */}
          <div className="card h-[50rem] border-2 border-gray-900 bg-gray-900 text-white shadow-xl md:col-span-2 md:max-h-[30rem] md:min-h-max">
            <figure className="relative h-40">
              <Image
                src={"/images/balcony2.jpg"}
                alt={"volunteer"}
                fill
                style={{ objectFit: "cover" }}
              />
            </figure>
            <div>
              <div className="pb:4 flex flex-col md:flex-row">
                <div className="card-body ">
                  <h2 className="card-title">Advisory Board of Directors</h2>
                  <p className="text-secondary-color/70">
                    <ul>
                      {advisors.map((advisor) => {
                        return (
                          <li className="my-4 font-light" key={advisor.id}>
                            {advisor.name}
                          </li>
                        );
                      })}
                    </ul>
                  </p>
                </div>
                <div className="card-body">
                  <div>
                    <h2 className="card-title">Our Essential Volunteers</h2>
                    <p className="text-secondary-color/70">
                      <ul>
                        {volunteers.map((volunteer) => {
                          return (
                            <li className="my-4 font-light" key={volunteer.id}>
                              {volunteer.name}
                            </li>
                          );
                        })}
                      </ul>
                    </p>
                  </div>
                </div>

                <div className="card-body">
                  <div className="h-10 space-y-4 pb-4">
                    <h2 className="card-title">Interested in Volunteering?</h2>
                    <p className="text-secondary-color/70">
                      Join the fun and sign up to become a volunteer! We&apos;ll
                      let you know when another event comes up.
                    </p>
                    <MainButton type="button">Sign Up</MainButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
