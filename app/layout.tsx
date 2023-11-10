import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import Navar from "./components/Navbar";
import TanstackProvider from "./components/provider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <TanstackProvider>
          <Navar />
          <AuthProvider>{children}</AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
