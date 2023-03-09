import Image from "next/image";
import type { Session } from "next-auth";

type AdminDashboardLongCardProps = {
  session: Session | null;
};

const AdminDashboardLongCard = ({ session }: AdminDashboardLongCardProps) => {
  return (
    <div className="card border-2  border-gray-900 bg-gray-800 lg:h-full">
      <figure className="px-10 pt-10">
        <div className="avator">
          <div className="mask mask-squircle w-24">
            {session?.user.image && (
              <Image
                src={session?.user.image}
                alt={`admin profile picture`}
                width={96}
                height={96}
              />
            )}
          </div>
        </div>
      </figure>
      <div className="card-title"></div>
      <div className="card-body items-center text-center ">
        <h2 className="card-title mb-4 text-2xl text-white lg:text-4xl">{session?.user.name}</h2>
        <div className="space-y-8">
          <p className="text-secondary-color/70 lg:text-2xl">{session?.user.role}</p>
          <div className="space-y-4 pt-16 ">
            <p className="text-secondary-color/70 lg:text-xl">Irish Network MN </p>
            <p className="text-secondary-color/70 lg:text-xl">{session?.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLongCard;
