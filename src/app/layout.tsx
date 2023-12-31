import "./styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ComponentsLayout from "@/components/layout";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Educat Assessment",
  description: "Rizky saputra",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <ComponentsLayout>{children}</ComponentsLayout>
    </html>
  );
}
