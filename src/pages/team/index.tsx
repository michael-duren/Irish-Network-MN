import type { GetStaticProps } from "next";
import Banner from "../../components/Banner";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import superjson from "superjson";
import { Team } from "@prisma/client";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  // get team
  const res: Team[] = await ssg.team.getTeam.fetch();

  // seperate teams
  const officers = res.filter((team) => team.position === "OFFICER");
  const directors = res.filter((team) => team.position === "DIRECTOR");

  return {
    props: {
      directors,
      officers,
    },
    revalidate: 10,
  };
};

const Team = ({
  officers,
  directors,
}: {
  officers: Team[];
  directors: Team[];
}) => {
  console.log(directors);
  return (
    <section>
      <Banner imagePath="/images/train.jpg" title="About Us" />
      <div className="m-16 h-full">
        <h2 className="text-lg">Officers</h2>
        <div className="grid gap-10 lg:grid-cols-4">
          {officers.map((member) => {
            return (
              <div
                className="col-span-2 rounded-xl border-2 border-gray-400  shadow-xl"
                key={member.id}
              >
                <div className="m-8 space-y-4">
                  <div className="grid grid-cols-7">
                    <div className="relative col-span-3 h-60 rounded-xl border-2 bg-slate-300">
                      {member.imageUrl && (
                        <Image
                          src={member.imageUrl}
                          alt={`${member.name}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-xl"
                        />
                      )}
                    </div>

                    <div className="col-span-4 flex flex-col justify-evenly rounded-xl rounded-l-none bg-slate-900/90 py-6 text-center text-slate-200">
                      <h3 className="mt-4 mb-2 text-3xl font-light">
                        {member.name}
                      </h3>
                      <h3 className="text-xl text-red-500">{member.title}</h3>
                    </div>
                  </div>
                  <div>{member.occupation}</div>
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="text-lg">Directors</h2>
        <div className="flex items-center justify-center">
          <div className="grid gap-10 lg:grid-cols-4">
            {directors.map((member) => {
              return (
                <div className=" border-2 border-gray-400" key={member.id}>
                  <div className="m-8 space-y-4">
                    <div className="relative h-60  rounded-xl">
                      {member.imageUrl && (
                        <Image
                          src={member.imageUrl}
                          alt={`${member.name}`}
                          fill
                          className="rounded-xl"
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>

                    <h3 className="h-10 bg-slate-900/50 text-slate-200">
                      {member.name}
                    </h3>
                    <div>{member.occupation}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
