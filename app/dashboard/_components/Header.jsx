"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">School Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Image
            src={user?.picture || "/logo.svg"}
            width={35}
            height={35}
            alt="user"
            className="rounded-full border-2 border-blue-500"
          />
          <span className="text-gray-700">{user?.given_name || "User"}</span>
        </div>
        <LogoutLink className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Sign Out
        </LogoutLink>
      </div>
    </div>
  );
};

export default Header;
