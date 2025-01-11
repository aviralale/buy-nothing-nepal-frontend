import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import {
  CheckIcon,
  ChevronRightIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  AlertCircle,
  Send,
  MailIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const currentYear = new Date().getFullYear();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationError = validateEmail(newEmail);
    setError(validationError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubscribed(true);
  };

  const socialIcons = [
    {
      Icon: MailIcon,
      label: "Mail",
      href: "mailto:69aviral@gmail.com",
    },
    {
      Icon: GithubIcon,
      label: "Github",
      href: "https://github.com/aviralale",
    },
    {
      Icon: InstagramIcon,
      label: "Instagram",
      href: "https://instagram.com/aviral.who_",
    },
    {
      Icon: LinkedinIcon,
      label: "LinkedIn",
      href: "https://linkedin.com/in/aviral-ale",
    },
  ];

  const isEmailValid = email && !error;

  return (
    <footer className="bg-background flex flex-col w-full justify-center items-center py-8 border-t border-t-[#1c2338]">
      <div className="container px-4 flex justify-between md:grid-cols-3 gap-8">
        <div className="flex flex-col  gap-2">
          <p className="text-2xl font-semibold mt-4 text-center md:text-left">
            Feel free to get in touch!
          </p>
          <p className="flex gap-2 text-gray-500">
            <MapPin className="text-primary" /> Kathmandu, Nepal
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold flex gap-2">
            <Mail className="text-primary" /> Get in Touch
          </h2>
          <div className="flex flex-col">
            <a
              href="mailto:69aviral@gmail.com"
              className="text-gray-500 transition-all duration-75 hover:text-primary hover:underline mt-2"
            >
              69aviral@gmail.com
            </a>
            <a
              href="tel:+977-9862478661"
              className="text-gray-500 transition-all duration-75 hover:text-primary hover:underline mt-2"
            >
              +977-9862478661
            </a>
          </div>
        </div>

        <div className="flex flex-col  gap-2">
          <h2 className="text-xl font-semibold">Subscribe for updates</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full relative"
          >
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full p-2 rounded-lg `}
              />
              {isEmailValid && (
                <Button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
              {error ? (
                <span className="mt-2 text-red-500 text-xs">{error}</span>
              ) : (
                <span className="mt-2 text-red-500 text-xs">{"  "}</span>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between md:grid-cols-3 gap-8 w-full px-8 items-center mt-8 text-center border-t border-t-[#1c2338] p-4">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-12 object-cover" />
            <h1 className="text-2xl uppercase font-semibold">
              Buy Nothing Nepal
            </h1>
          </div>
        </Link>
        <p>&copy; {currentYear} Buy Nothing Nepal. All Rights Reserved.</p>
        <div className="flex items-center">
          <div className="flex items-center justify-center gap-4">
            {socialIcons.map(({ Icon, label, href }, index) => (
              <a
                key={index}
                href={href}
                aria-label={label}
                className="text-primary transition hover:text-primary/80"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
