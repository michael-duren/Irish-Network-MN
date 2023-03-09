import Image from "next/image";
import { useSession } from "next-auth/react";

const AuthHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-start bg-gray-800 p-8 text-gray-200">
      <h2 className="text-2xl">Admin Console</h2>
      <h2 className="w-[20rem]">Irish Network MN</h2>
      <div className="flex w-full items-center justify-end space-x-8">
        <h2>{session?.user.name}</h2>

        <div className="relative h-20 w-20 rounded-full  bg-slate-300">
          {session?.user.name && session.user.image && (
            <Image
              className="h-auto max-w-[100%] rounded-full"
              src={session?.user.image}
              alt={session?.user.name}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
