import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import BootstrapClient from "@/ui/bootstrapclient/bootstrap-client";
import Navbar from "@/ui/navbar/navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";
import "@/app/globals.css";

/// Plugin CSS
import "@/public/css/plugins/fontawesome.min.css";
import "@/public/css/plugins/animation.css";
import "@/public/css/plugins/feather.css";
import "@/public/css/plugins/euclid-circulara.css";
import "@/public/scss/styles.scss";
import { UserProvider } from "@/context/user-context/user-context";
import { LessonProvider } from "@/context/lesson-context/lesson-context";
import { Provider } from "./providers";
import { CourseIdProvider } from "@/context/courseId-context/courseId-context";
import { ProgressContextProvider } from "@/context/progress-card-context/progress-context";
// import FlagSmithProvider from "./FlagSmithProvider";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Thooto";
const APP_DESCRIPTION = "Supercharge your learning. 🚀🚀";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <LessonProvider>
            <Provider>
              <CourseIdProvider>
              <ProgressContextProvider>
                  <Navbar />
                  {/* <FlagSmithProvider> */}
                  <>{children}</>
                  {/* </FlagSmithProvider> */}
                </ProgressContextProvider>
                </CourseIdProvider>
            </Provider>
            <BootstrapClient />

            <ToastContainer />
          </LessonProvider>
        </UserProvider>
      </body>
    </html>
  );
}
