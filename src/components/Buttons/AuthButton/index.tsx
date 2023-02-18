import { useSession, signIn, signOut } from "next-auth/react";
import MainButton from "../MainButton";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <MainButton
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        type="button"
      >
        Logout
      </MainButton>
    );
  }

  return (
    <div>
      <MainButton
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn()}
        type="button"
      >
        Sign In
      </MainButton>
    </div>
  );
};

export default AuthButton;
