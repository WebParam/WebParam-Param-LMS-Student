"use client";

import { Suspense } from "react";
import Register from "./register";

export default function RegisterPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}
