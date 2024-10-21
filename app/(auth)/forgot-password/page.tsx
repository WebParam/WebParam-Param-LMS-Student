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
            cookies.set('resetEmail', email);
            console.log(res);
            router.push('/forgot-password/otp')
        }
        
        console.log(res);

    }

    return (
        <div className='reset-password-container'>
            <div className='reset-password-inner'>
                <h5>To reset your password,</h5>
                <p>please insert your details.</p>
                <form onSubmit={handleEmailSubmit}>
                    <div className="input-group">
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your username or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="reset-button"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
