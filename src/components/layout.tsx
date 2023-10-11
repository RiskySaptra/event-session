"use client";
import { ReactNode } from "react";
import Image from "next/image";

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <body>
      <nav className="h-[92px] flex py-[26px] px-[82px] shadow-[0_4px_35px_0px_rgba(39,26,73,0.05)] sticky top-0 bg-white">
        <div className="mr-6 flex item-center">
          <Image
            src="/left.svg"
            alt="back-icon"
            className="dark:invert"
            width={24}
            height={24}
            priority
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="pl-6 border-l-2 border-l-[#BCC0D0]/50">
            <p className="text-[#252A3C] font-[600] text-[18px] leading-[24px]">
              Event
            </p>
          </div>
        </div>
      </nav>
      {children}
    </body>
  );
}
