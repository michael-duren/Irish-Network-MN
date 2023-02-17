import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        className="mt-4 rounded-md bg-red-400 px-5 py-2.5 text-white duration-300 hover:bg-red-500 active:scale-95 lg:mt-0"
      >
        Logout
      </button>
    );
  }

  return (
    <div>
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn()}
        className="mt-4 rounded-md bg-red-400 px-5 py-2.5 text-white duration-300 hover:bg-red-500 active:scale-95 lg:mt-0"
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthButton;
