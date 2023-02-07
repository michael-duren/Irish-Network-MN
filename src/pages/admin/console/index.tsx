import { type NextPage } from "next";

import { useSession } from "next-auth/react";

const AdminConsole: NextPage = () => {
  const { data: session } = useSession({ required: true });

  return (
    <section>
      <h1>Admin Console</h1>
      <p>Edit events and image galery</p>
      <button>Add event</button>
    </section>
  );
};

export default AdminConsole;
