import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineSchedule } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { ReactElement } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const sidebarItems = [
  {
    title: "Doctors",
    icon: <FaUserDoctor className="size-6" />,
  },

  {
    title: "Patients",
    icon: <IoPersonOutline className="size-6" />,
  },

  {
    title: "Appointments",
    icon: <MdOutlineSchedule className="size-6" />,
  },
] as { title: string; icon: ReactElement }[];

const Sidebar = () => {
  return (
    <div className="bg-white h-full w-[245px] p-3 text-black text-opacity-70 font-semibold">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center w-full justify-start text-[1em] gap-2 p-3 rounded-lg bg-light_gray border ${
            isActive
              ? "border-purple border-opacity-30 text-purple"
              : "hover:text-purple"
          }`
        }
      >
        <MdOutlineSpaceDashboard className="size-7" />
        <span>Dashboard</span>
      </NavLink>

      <Accordion type="multiple" className="w-full" defaultValue={["modules"]}>
        <AccordionItem value="modules" className="mt-3 border-none">
          <AccordionTrigger className="border-b pb-3">
            <span className="text-sm opacity-80 ml-3">Modules</span>
          </AccordionTrigger>

          <AccordionContent className="py-2">
            {sidebarItems.map((item) => (
              <NavLink
                to={`/${item.title.toLowerCase()}`}
                key={item.title}
                className={({ isActive }) =>
                  `flex items-center w-full justify-start text-[1em] gap-3 p-3 rounded-lg ${
                    isActive ? "bg-light_gray text-purple" : "hover:text-purple"
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-full" defaultValue={["admin"]}>
        <AccordionItem value="admin" className="border-none">
          <AccordionTrigger className="border-b pb-3">
            <span className="ml-3 text-sm opacity-80">Admin</span>
          </AccordionTrigger>

          <AccordionContent className="pt-2">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center w-full justify-start text-[1em] gap-3 p-3 rounded-lg ${
                  isActive ? "bg-light_gray text-purple" : "hover:text-purple"
                }`
              }
            >
              <FiUsers className="size-5" />
              <span>System Users</span>
            </NavLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
