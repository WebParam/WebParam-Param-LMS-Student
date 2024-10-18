"use client";
import { sendOtp } from "@/app/api/auth/auth";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import Link from "next/link";
import "./forgot.scss";
import imageCover from "./oc-lost.svg";

export default function SendResetEmail() {
  const [email, setEmail] = useState("");
  const cookies = new Cookies();
  const router = useRouter();

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(email);

    const payload = {
      email,
    };

    const res = await sendOtp(payload);

    if (res) {
      cookies.set("resetEmail", email);
      console.log(res);
      router.push("/forgot-password/otp");
    }

    console.log(res);
  }

  return (
    <div className="reset-password-container">
      <div
        className="left-container d-md-block d-none"
        data-aos="zoom-out-right"
        style={{
          backgroundImage: `url(${imageCover.src})`,
          backgroundSize: "60%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#24345C",
        }}
      ></div>
      <div
        className="reset-password-inner"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>To reset your password</h3>
        <p>Please insert your details.</p>
        <form
          onSubmit={handleEmailSubmit}
          className="rbt-profile-row rbt-default-form row row--15"
        >
          <div className="col-12">
            <div className="">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12 mt--10">
            <div
              className="button-container"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="forgot-password-button btn text-light  "
                style={{
                  height: "50px",
                  fontSize: "18px",
                  backgroundColor: "#fe457a;",
                }}
              >
                Reset Password
              </button>
              <Link
                href={"/login"}
                className=""
                style={{
                  color: "#24345C",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
