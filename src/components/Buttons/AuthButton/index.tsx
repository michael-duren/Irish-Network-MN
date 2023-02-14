import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        className="rounded-lg border-2 border-gray-400  px-3 py-1 text-lg text-gray-700 shadow-sm transition-all duration-300 hover:border-lime-600 hover:text-green-900"
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
        className="rounded-lg border-2 border-gray-400  px-3 py-1 text-lg text-gray-700 shadow-sm transition-all duration-300 hover:border-lime-600 hover:text-green-900"
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthButton;
