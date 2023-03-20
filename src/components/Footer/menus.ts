import { BsFacebook, BsInstagram, BsCalendarEvent, BsPerson } from "react-icons/bs";
import { AiFillTwitterCircle, AiOutlineHome } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";

export const PARTNERS = [
  { name: "Irish Gazette", link: "https://theirishgazette.com/" },
  {
    name: "Saint Paul St Patrick’s Association",
    link: "https://www.stpatsmn.org/home",
  },
  { name: "Extended Exposure", link: "https://www.extendedexposure.com/" },
  { name: "March Out Hunger", link: "https://www.marchouthunger.org/" },
  { name: "Tom Dunn Photography", link: "https://tomdunnphoto.com/" },
];

export const NAVS = [
  { name: "Home", link: "/", internal: true, icon: AiOutlineHome },
  {
    name: "Team",
    link: "/team",
    icon: RiTeamLine,
    internal: true,
    size: "18",
  },
  {
    name: "News",
    link: "/news",
    icon: IoNewspaperOutline,
    internal: true,
    size: "18",
  },
  {
    name: "Events",
    link: "/events",
    internal: true,
    icon: BsCalendarEvent,
    size: "17",
  },
  { name: "Contact", link: "/contact", internal: true, icon: FiMessageSquare },
  {
    name: "Membership",
    link: "/membership",
    internal: true,
    icon: BsPerson,
  },
];

export const SOCIAL = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/irishnetworkminnesota/",
    icon: BsFacebook,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/IrishNetworkMN",
    icon: AiFillTwitterCircle,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/irishnetworkmn/",
    icon: BsInstagram,
  },
];

export const MOREIN = [
  {
    name: "IN USA",
    link: "https://irishnetwork-usa.org/",
  },
  {
    name: "IN NYC",
    link: "https://in-nyc.clubexpress.com/",
  },
  {
    name: "IN DC",
    link: "https://www.irishnetwork-dc.com/",
  },
  {
    name: "IN SEATTLE",
    link: "https://irishnetworkseattle.org/",
  },
];
