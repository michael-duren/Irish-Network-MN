import Image from "next/image";

type BannerProps = {
  imagePath: string;
  title: string;
  top?: string;
  left?: string;
};

export default function Banner({ imagePath, title, top, left }: BannerProps) {
  return (
    <div className="max-md: relative z-0 min-h-[20rem]  overflow-hidden bg-opacity-70 bg-gradient-to-r from-gray-300  to-gray-900">
      <Image
        className="h-auto max-w-[100%] opacity-50"
        src={imagePath}
        alt={`${title} background image`}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      {title && (
        <h1
          className={`absolute ${top ? top : "top-[50%]"} ${
            left ? left : "left-[50%]"
          } p-6 text-4xl text-gray-100 md:text-3xl `}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
