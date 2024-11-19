"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutIcon, path: "/dashboard" },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    { id: 3, name: "Attendance", icon: Hand, path: "/dashboard/attendance" },
  ];

  const path = usePathname();
  const { user } = useKindeBrowserClient();

  return (
    <div className="border shadow-md h-screen">
      <Image src={"/logo.svg"} width={50} height={25} alt="logo" />
      <hr className="my-5"></hr>
      {menuList.map((menu, index) => (
        <Link href={menu.path} key={index}>
          <h2
            className={`flex items-center gap-4 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${
              path == menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      <div className="flex gap-2 items-center bottom-5 fixed p-4">
        <Image
          src={user?.picture || "/logo.svg"}
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
