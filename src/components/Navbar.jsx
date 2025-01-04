import React from "react";
import { Link } from "react-router-dom";
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
          <Select>
            <SelectTrigger>
              <SelectValue defaultValue="giveaway" />
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
  return (
    <nav className="flex justify-between items-center p-4 font-semibold text-foreground">
      <ul className="flex items-center gap-8">
        <li>
          <img src={Logo} alt="user's pfp" className="w-8 h-8 object-cover" />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Explore</Link>
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
      <ul className="flex items-center gap-8">
        <li>
          <Link to="/">Requests</Link>
        </li>
        <li>
          <Link to="/">My Account</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
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
