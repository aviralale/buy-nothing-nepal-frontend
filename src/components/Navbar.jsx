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
import { useAuth } from "@/lib/context/AuthContext";
import { Lock } from "lucide-react";

const DialogForm = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <ScrollArea>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Item Name</Label>
          <Input id="name" placeholder="Enter item name" />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="description">Item Description</Label>
          <Textarea id="description" placeholder="Enter item description" />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="label">Item Label</Label>
          <Select defaultValue="giveaway">
            <SelectTrigger>
              <SelectValue placeholder="Select label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="giveaway">Giveaway</SelectItem>
              <SelectItem value="exchange">Exchange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="tags">Item Tags</Label>
          <TagsInput />
        </div>

        <LocationSelector />

        <div className="flex flex-col gap-1">
          <Label htmlFor="pictures">Item Pictures</Label>
          <PictureInput />
        </div>
      </div>
      <Button className="mt-4">Place Item</Button>
    </ScrollArea>
  ) : (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <Lock className="w-48 h-48" />
        <p>You need to be authenticated to place an item.</p>
      </div>
      <Link to="/auth" className="text-primary hover:underline">
        Login Now
      </Link>
    </div>
  );
};

const Navbar = () => {
  const { isLoggedIn } = useAuth();
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
      className="fixed top-0 z-10 w-full flex justify-between items-center p-4 bg-background/95 rounded-b-sm border-b dark:border-b-[#1c2338] bg-cover bg-bottom"
      style={{ backgroundImage: `url(${navBackground})` }}
    >
      <ul className="flex items-center gap-8">
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
            description="Post something you no longer need to help others."
            form={<DialogForm />}
          />
        </li>
      </ul>
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Buy Nothing Nepal Logo"
          className="w-16 h-16 object-cover"
        />
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          {isLoggedIn ? (
            <NavLink className={getNavLinkClass} to="/search">
              Search
            </NavLink>
          ) : (
            <NavLink className={getNavLinkClass} to="/auth">
              Login/Register
            </NavLink>
          )}
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="/requests">
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="/contact">
            Contact
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src="https://i.pinimg.com/736x/12/bd/fa/12bdfa75f34df29f54e25393570df0a9.jpg"
                  alt="User Profile"
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
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
