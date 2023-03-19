import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack, IoIosCalendar } from "react-icons/io";
import { RiPencilRuler2Line } from "react-icons/ri";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Spinner from "../../components/Spinners/Spinner";
import { api } from "../../utils/api";

dayjs.extend(LocalizedFormat);

export const NewsPostPage = () => {
  const { query } = useRouter();
  const { data: post } = api.news.getNewsPost.useQuery(
    {
      slug: query.postId as string,
    },
    {
      enabled: !!query.postId,
    }
  );

  if (!post?.featuredImage) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  return (
    <section className="mx-16 mb-16 flex flex-col">
      <Link
        href="/news"
        className="mb-8 flex cursor-pointer items-center justify-start text-lg text-red-400 hover:text-red-500"
      >
        <IoMdArrowRoundBack className="mr-2" />
        <p>Back</p>
      </Link>
      {/* post information and picture */}
      <div className="mb-8 flex flex-col items-center  rounded-3xl bg-gray-100/10 md:flex-row md:items-start md:justify-evenly">
        <div className="mt-8 flex h-full flex-col items-start justify-end border-gray-400 pt-8 pb-8 md:border-l-2 md:pl-8">
          <h2 className="mb-16 text-2xl">{post.title}</h2>
          <div>
            <h3 className="mb-4 font-normal">
              <div className="flex">
                <RiPencilRuler2Line size={20} />
                <p className="ml-2">{post.author}</p>
              </div>
            </h3>
            <h3 className="text-sm font-light">
              <div className="flex">
                <IoIosCalendar size={20} />
                <p className="ml-2">
                  <i>{dayjs(post.date).format("LL")}</i>
                </p>
              </div>
            </h3>
          </div>
          {/* <div className="mt-16 grid grid-cols-8"> */}
          {/*   {Array.from({ length: 4 }).map((_, i) => { */}
          {/*     return ( */}
          {/*       <div className="col-span-2 mr-4 rounded-3xl bg-gray-200/50 px-4 py-3" key={i}> */}
          {/*         tag {i} */}
          {/*       </div> */}
          {/*     ); */}
          {/*   })} */}
          {/* </div> */}
        </div>
        <div className="relative mt-8 h-60 w-60 rounded-3xl md:mt-0 md:h-80 md:w-80 xl:h-96 xl:w-96">
          <Image
            src={post.featuredImage}
            className="rounded-3xl"
            style={{ objectFit: "cover" }}
            alt={post.title}
            fill
          />
        </div>
      </div>
      {/* description */}
      <div className="mt-16 md:px-20 lg:px-56">
        <p>{post.body}</p>
      </div>
    </section>
  );
};

export default NewsPostPage;
