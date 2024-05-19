import { Link } from "react-router-dom";
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
    <div className="bg-white h-full w-[270px] p-3 text-black text-opacity-70 font-semibold">
      <Link
        to="/dashboard"
        className="flex items-center w-full justify-start text-[1em] gap-2 p-3 rounded-lg bg-light_gray border hover:bg-purple hover:text-white"
      >
        <MdOutlineSpaceDashboard className="size-7" />
        <span>Dashboard</span>
      </Link>

      <Accordion type="multiple" className="w-full" defaultValue={["modules"]}>
        <AccordionItem value="modules" className="mt-3 border-none">
          <AccordionTrigger className="border-b">
            <span className="text-sm opacity-80 ml-3">Modules</span>
          </AccordionTrigger>

          <AccordionContent className="pt-2">
            {sidebarItems.map((item) => (
              <Link
                to={`/${item.title.toLowerCase()}`}
                key={item.title}
                className="flex items-center w-full justify-start text-[1em] gap-3 p-3 rounded-lg hover:bg-light_gray hover:text-purple"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-full" defaultValue={["admin"]}>
        <AccordionItem value="admin" className="border-none">
          <AccordionTrigger className="border-b">
            <span className="ml-3 text-sm opacity-80">Admin</span>
          </AccordionTrigger>

          <AccordionContent className="pt-2">
            <Link
              to="/users"
              className="flex items-center w-full justify-start text-[1em] gap-3 p-3 rounded-lg hover:bg-light_gray hover:text-purple"
            >
              <FiUsers className="size-5" />
              <span>System Users</span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
