import Image from "next/image";

const Carousel = () => {
  return (
    <>
      <div className="carousel sticky min-w-min max-w-5xl">
        {/* slide 1 */}
        <div className="carousel-item relative w-full">
          <h2 className="ld:text-3xl hidden text-4xl text-red-400 lg:block">Welcome</h2>
          <Image
            src="https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Group.png"
            alt="group photo"
            height={700}
            width={700}
          />
          {/*   <a href="#slide4" className="btn-circle btn"> */}
          {/*     ❮ */}
          {/*   </a> */}
          {/*   <a href="#slide2" className="btn-circle btn"> */}
          {/*     ❯ */}
          {/*   </a> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Carousel;
