import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import Navar from "./components/Navbar";
import TanstackProvider from "./components/provider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ICAPPS",
  description: "A digital agency specialized in developing business software. Developed as stand-alone apps, or as applications that are integrated with business software.",
};
// Subscription popup script
{
  /* <script defer src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>;

<script
  src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
  defer
></script>; */
}
<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
{
  /* <script
  src="https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js"
  defer
></script>; */
}

/* <script src="https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js"></script> */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Navar />
          <AuthProvider>{children}</AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
