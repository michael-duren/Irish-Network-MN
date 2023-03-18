import type { ReactNode } from "react";
import MainButton from "../../../../components/Buttons/MainButton";

type AdminDashboardSmallCardProps = {
  title: string;
  children?: ReactNode;
  buttonTitle: string;
  onClick: () => void | Promise<undefined>;
};

export const AdminDashboardSmallCard = ({
  title,
  children,
  buttonTitle,
  onClick,
}: AdminDashboardSmallCardProps) => {
  return (
    <div className="card h-full border-gray-900 bg-gray-800 shadow-xl">
      <div className="card-body">
        <h2 className="card-title  text-white underline md:text-4xl">{title}</h2>
        <div className="text-secondary-color/70">{children}</div>
        <div className="flex h-full items-end justify-end">
          <MainButton type="button" onClick={onClick}>
            {buttonTitle}
          </MainButton>
        </div>
      </div>
    </div>
  );
};
