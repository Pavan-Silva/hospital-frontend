import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GoTasklist } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoPersonOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Searchbox from "./Searchbox";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();

  return (
    <div className="w-full bg-purple text-white text-opacity-60 h-[60px] p-3 flex items-center gap-2">
      <div className="flex gap-2 pointer-events-none mr-2">
        <MdOutlineHealthAndSafety className="size-8 text-white" />
        <span className="font-semibold text-xl text-white">Medicare</span>

        <div className="flex gap-2 ml-0.5 items-center">
          <Separator orientation="vertical" className="opacity-60 h-6" />
          <span>Admin</span>
        </div>
      </div>

      <Searchbox />

      <div className="flex ml-auto items-center">
        <Button variant="ghost" size="icon">
          <IoIosNotificationsOutline className="size-6" />
        </Button>

        <Button variant="ghost" size="icon">
          <GoTasklist className="size-6" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-pointer ml-2">
              <Avatar className="size-9">
                <AvatarImage src="http://123.cl" alt="profile-image" />
                <AvatarFallback className="text-black font-semibold">
                  PS
                </AvatarFallback>
              </Avatar>

              <HiOutlineDotsVertical className="size-6" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mx-1 my-4">
            <DropdownMenuLabel>Pavan Silva</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex gap-2 items-center">
                  <IoPersonOutline />
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => auth?.logOut()}>
                <div className="flex gap-2 items-center">
                  <GoSignOut />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
