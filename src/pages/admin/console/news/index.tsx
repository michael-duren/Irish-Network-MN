import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { api } from "../../../../utils/api";
import { requireAdmin } from "../../../../utils/ssrHelpers";
import WriteNewsPostForm from "../../../../components/Forms/WriteNewsPostForm";
import AdminNewsPreviewCard from "../../../../components/Cards/AdminNewsPreviewCard";

const AdminConsoleNews = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getNewsPosts = api.news.getAllNewsPosts.useQuery();
  const newsRoute = api.useContext().news;
  const invalidateCurrentNewsPosts = async () => {
    await newsRoute.getAllNewsPosts.invalidate();
  };

  return (
    <>
      <section>
        <AuthHeader />
        <div className="flex">
          <AdminConsoleSideNav />
          <div className="m-6 flex w-full flex-col">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl underline">News Posts:</h2>
              <div className="flex w-full flex-1 justify-end">
                <button
                  className="flex items-center rounded-lg border-2 border-gray-500 py-4 px-4 text-gray-500 hover:border-gray-700 hover:text-gray-800"
                  onClick={() => setIsOpen(true)}
                >
                  <div>Add Post</div>
                  <div className="pl-2">
                    <AiOutlinePlusCircle className="text-lg" />
                  </div>
                </button>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col">
              <div className="mt-8">
                {getNewsPosts.isSuccess &&
                  getNewsPosts.data.map((news) => {
                    return (
                      <div className="my-8">
                        <AdminNewsPreviewCard post={news} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <WriteNewsPostForm isOpen={isOpen} closeModal={setIsOpen} />
    </>
  );
};

export default AdminConsoleNews;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAdmin(async () => {
  return { props: {} };
});
