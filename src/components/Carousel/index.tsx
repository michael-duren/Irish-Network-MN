const Carousel = () => {
  return (
    <>
      <div className="carousel sticky min-w-min max-w-5xl">
        {/* slide 1 */}
        <div className="carousel-item relative w-full">
          <h2 className="hidden text-4xl text-red-400 md:block md:text-3xl">Welcome</h2>
          <img
            src="https://gpncezkvubukxrrsxtnt.supabase.co/storage/v1/object/public/public/team/Group.png?t=2023-03-07T18%3A54%3A50.880Z"
            alt="group photo"
            className="w-full"
          />
          {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"> */}
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
