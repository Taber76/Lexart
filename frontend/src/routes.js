
import { BiHomeAlt2 } from "react-icons/bi";
import { FaMobileAlt, FaRecycle } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";

export const routes = [
  {
    title: "Início",
    path: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Produtos",
    path: "/items",
    Icon: FaMobileAlt,
  },
  {
    title: "Produtos (log)",
    path: "/items/log",
    Icon: FaRecycle,
  },
  {
    title: "Instruções",
    path: "/instructions",
    Icon: MdOutlineStorage,
  }

];