import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriNet",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>{children}</body>
      </html>
    </>
  );
}
