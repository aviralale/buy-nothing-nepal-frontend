import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera } from "lucide-react";
import { register } from "@/lib/auth/auth";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    password: "",
    re_password: "",
    profile_picture: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Profile picture validation
    if (!formData.profile_picture) {
      newErrors.profile_picture = "Profile picture is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(formData.profile_picture.type)) {
        newErrors.profile_picture =
          "Please upload a valid image file (JPEG, PNG, or GIF)";
      } else if (formData.profile_picture.size > 5 * 1024 * 1024) {
        newErrors.profile_picture = "Image size should be less than 5MB";
      }
    }

    // First Name validation
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username must be 3-20 characters and can only contain letters, numbers, and underscores";
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    // Date of birth validation
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 16) {
        newErrors.date_of_birth =
          "You must be at least 16 years old to register";
      } else if (age > 120) {
        newErrors.date_of_birth = "Invalid date to register";
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Confirm password validation
    if (!formData.re_password) {
      newErrors.re_password = "Please confirm your password";
    } else if (formData.password !== formData.re_password) {
      newErrors.re_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
          if (key !== "profile_picture") {
            formDataToSend.append(key, formData[key]);
          }
        });
        formDataToSend.append("profile_picture", formData.profile_picture);
        const response = await register(formData);
        console.log("User registered successfully:", response);
      } catch (error) {
        console.error("Error registering user:", error);
      }
      console.log("Form submitted:", formData);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_picture: file,
      }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={
                        previewUrl ||
                        "https://i.pinimg.com/1200x/27/6c/5f/276c5faee5ca51ce4678276f5fe7456c.jpg"
                      }
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
              </div>
              {errors.profile_picture && (
                <span className="text-red-500 text-xs text-center">
                  {errors.profile_picture}
                </span>
              )}
              <div className="flex lg:flex-row md:flex-row sm:flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={errors.first_name ? "border-red-500" : ""}
                  />
                  {errors.first_name && (
                    <span className="text-red-500 text-xs">
                      {errors.first_name}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={errors.last_name ? "border-red-500" : ""}
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-xs">
                      {errors.last_name}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>
              <div className="flex lg:flex-row md:flex-row sm:flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="john_doe"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && (
                    <span className="text-red-500 text-xs">
                      {errors.username}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="text"
                    placeholder="9*********"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={errors.phone_number ? "border-red-500" : ""}
                  />
                  {errors.phone_number && (
                    <span className="text-red-500 text-xs">
                      {errors.phone_number}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-row sm:flex-col gap-2">
                <div className="grid w-1/2 sm:w-full gap-2">
                  <Label htmlFor="date_of_birth">Date of birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className={errors.date_of_birth ? "border-red-500" : ""}
                  />
                  {errors.date_of_birth && (
                    <span className="text-red-500 text-xs">
                      {errors.date_of_birth}
                    </span>
                  )}
                </div>
                <div className="grid w-1/2 sm:w-full gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={handleSelectChange}
                    value={formData.gender}
                  >
                    <SelectTrigger
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <span className="text-red-500 text-xs">
                      {errors.gender}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-row sm:flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="re_password">Retype Password</Label>
                  <Input
                    id="re_password"
                    type="password"
                    value={formData.re_password}
                    onChange={handleInputChange}
                    className={errors.re_password ? "border-red-500" : ""}
                  />
                  {errors.re_password && (
                    <span className="text-red-500 text-xs">
                      {errors.re_password}
                    </span>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button variant="outline" className="w-full">
                Register with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
