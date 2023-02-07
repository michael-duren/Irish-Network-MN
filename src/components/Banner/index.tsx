import Image from "next/image";

type BannerProps = {
  imagePath: string;
  title: string;
};

export default function Banner({ imagePath, title }: BannerProps) {
  return (
    <div className="max-md: relative z-0 min-h-[20rem]  overflow-hidden bg-opacity-70 bg-gradient-to-r from-gray-300  to-gray-900">
      <div className="">
        <Image
          className="h-auto max-w-[100%] opacity-50"
          src={imagePath}
          alt={`${title} background image`}
          fill
          objectFit="cover"
          priority
        />
      </div>
      {title && (
        <h1 className="absolute top-[50%] left-[50%] p-6 text-2xl text-gray-100 md:text-3xl ">
          {title}
        </h1>
      )}
    </div>
  );
}