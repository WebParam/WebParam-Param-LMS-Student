import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BootstrapClient from "@/ui/bootstrapclient/bootstrap-client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-quill/dist/quill.snow.css";

// Custom global styles
import "@/app/globals.css";

// Plugin CSS
import "@/public/css/plugins/fontawesome.min.css";
import "@/public/css/plugins/animation.css";
import "@/public/css/plugins/feather.css";
import "@/public/css/plugins/euclid-circulara.css";
import "@/public/scss/styles.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
