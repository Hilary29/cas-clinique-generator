import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo_clin2.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" bg-gradient-to-br from-white-50 to-accent-100 bg-cover bg-center min-h-screen flex flex-col ">
      <Link className="flex items-center gap-2 mx-auto pt-12 pb-8" href={"/"}>
        <Image src={logo} alt="Agrinet logo" className="w-10 h-[36px]" />
        <p className="font-poppins text-heading-desktop-h4 font-semibold text-left text-black-50">
          Cas clinique
        </p>
      </Link>
      <div>
        {children}
      </div>  
    </main>
  );
}