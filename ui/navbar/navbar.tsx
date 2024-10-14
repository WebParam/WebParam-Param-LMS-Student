"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (
    [
      "/register",
      "/login",
      "/verify-account",
      "/forgot-password",
      "/forgot-password/otp",
      "/testing",
      "/activate-account",
    ].includes(pathname)
  ) {
    return null;
  }

  return null;
};

export default Navbar;
