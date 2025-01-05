import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogComponent from "./reusables/Dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import LocationSelector from "./reusables/LocationSelector";
import TagsInput from "./reusables/TagsInput";

import Logo from "../assets/images/logo.png";
import bgNav from "../assets/images/bg-nav.png";
import bgNavDark from "../assets/images/bg-nav-dark.png";
import LogoDark from "../assets/images/logo-dark.png";
import PictureInput from "./reusables/PictureInput";
import { Button } from "./ui/button";

const DialogForm = (
  <>
    <ScrollArea>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="name" className="text-right">
            Item Name
          </Label>
          <Input id="name" className="col-span-3" />
        </div>

        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="username" className="text-right">
            Item Description
          </Label>
          <Textarea id="description" className="col-span-3" />
        </div>

        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="username" className="text-right">
            Item Label
          </Label>
          <Select defaultValue="giveaway">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="giveaway">Giveaway</SelectItem>
              <SelectItem value="exchange">Exchange</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="username" className="text-right">
            Item Tags
          </Label>
          <TagsInput />
        </div>

        <div className="flex gap-1">
          <LocationSelector />
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="username" className="text-right">
            Item Pictures
          </Label>
          <PictureInput />
        </div>
      </div>
    </ScrollArea>
    <Button>Place Item</Button>
  </>
);

const Navbar = () => {
  const theme = localStorage.getItem("vite-ui-theme");
  const logo =
    theme === "dark"
      ? Logo
      : theme === "light"
      ? LogoDark
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Logo
      : LogoDark;

  const navBackground =
    theme === "dark"
      ? bgNavDark
      : theme === "light"
      ? bgNav
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? bgNavDark
      : bgNav;

  const getNavLinkClass = ({ isActive }) =>
    `transition-colors duration-200 px-1 hover:border-b hover:border-b-primary  ${
      isActive ? "border-b-2 border-b-primary" : ""
    }`;

  return (
    <nav
      className="fixed top-0 z-10 w-full flex justify-between items-center p-4 font-semibold bg-cover bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `url(${navBackground})`,
      }}
    >
      <ul className="flex items-center gap-8">
        <li></li>
        <li>
          <NavLink className={getNavLinkClass} to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="/explore">
            Explore
          </NavLink>
        </li>
        <li>
          <DialogComponent
            title="Post an Item"
            subtitle="Post an Item"
            description="Post something that you don't need and you want to give it to others who are in need."
            form={DialogForm}
          />
        </li>
      </ul>
      <Link to="/" className="flex items-center justify-center">
        <img src={logo} alt="BNN" className="w-16 h-16 object-cover" />
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <NavLink className={getNavLinkClass} to="/requests">
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="/my-account">
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <img
                src="https://i.pinimg.com/736x/12/bd/fa/12bdfa75f34df29f54e25393570df0a9.jpg"
                alt="user's pfp"
                className="w-8 h-8 rounded-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Listings</DropdownMenuItem>
              <DropdownMenuItem>My Requests</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
