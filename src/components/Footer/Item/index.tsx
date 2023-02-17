import Link from "next/link";
import { createElement } from "react";

import type { IconType } from "react-icons";

type Link = {
  name: string;
  link: string;
  icon?: IconType;
  internal?: boolean;
  size?: string;
};

type FooterItemProps = {
  links: Link[];
  title: string;
};

const FooterItem = ({ links, title }: FooterItemProps) => {
  return (
    <>
      <ul>
        <h1 className="mb-1 font-semibold">{title}</h1>
        {links.map((link) => {
          switch (title) {
            case "SOCIAL":
              return (
                link.icon && (
                  <li className="mb-2" key={link.name}>
                    <a
                      className="flex cursor-pointer space-x-4 text-sm leading-6 text-gray-400 duration-300 hover:text-red-400"
                      href={link.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div>{createElement(link.icon, { size: "20" })}</div>
                      <div>{link.name}</div>
                    </a>
                  </li>
                )
              );
            case "GO TO":
              return (
                link.icon && (
                  <li key={link.name}>
                    <Link
                      className="flex cursor-pointer text-sm leading-6 text-gray-400 duration-300 hover:text-red-400"
                      href={link.link}
                    >
                      <div className="mb-2 mr-2">
                        {createElement(link.icon, {
                          size: link.size ? link.size : "20",
                        })}
                      </div>
                      <div>{link.name}</div>
                    </Link>
                  </li>
                )
              );
            default:
              return (
                <li key={link.name}>
                  <a
                    className="cursor-pointer text-sm leading-6 text-gray-400 duration-300 hover:text-red-400"
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              );
              break;
          }
        })}
      </ul>
    </>
  );
};

export default FooterItem;
