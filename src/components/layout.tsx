"use client";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <body>
      <Navbar />
      {children}
      <Analytics />
    </body>
  );
}
