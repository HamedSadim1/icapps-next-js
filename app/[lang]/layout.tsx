import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import Navar from "./components/Navbar";
import TanstackProvider from "./components/provider/TanstackProvider";
import { Locale } from "@/i18n-config";
import { LanguageProvider } from "./components/provider/LanguageProvider";
import { useRouter } from "next/navigation";

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
  children, lang
}: {
  children: React.ReactNode;
  lang: Locale
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <LanguageProvider>
          <TanstackProvider>
            <Navar />
            <AuthProvider>{children}</AuthProvider>
          </TanstackProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
