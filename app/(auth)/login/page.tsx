"use client";
import "./login.scss";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { LoginUser } from "@/app/api/auth/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

export default function LoginPage() {
    const imageCover = process.env.NEXT_PUBLIC_LOGIN_IMAGE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState<any>({ email: false, password: false });

  const cookies = new Cookies();
  const router = useRouter();
  var isFreemium = process.env.NEXT_PUBLIC_ACCESS === 'FREEMIUM';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const newHasError = {
      email: email === "",
      password: password === "",
    };

    setHasError(newHasError);

    if (newHasError.email || newHasError.password) {
      setIsLoading(false);
      return;
    }

    const payload = {
      email,
      password,
    };

      try {
        const res = await LoginUser(payload);
            setIsLoading(false);
            
            if (res == undefined) {
                setErrorMessage('Incorrect User details');
                return;
            }
            
            if (res) {
                
                cookies.set("loggedInUser", res.data);
                
                const redirectPath = "/student/enrolled-courses?tab=enrolled";
                router.push(redirectPath)
            }
        } catch (error: any) {
            setErrorMessage('Network Error please try again');
            setIsLoading(false);
        }
      

      console.log('Form submitted successfully');
      setIsLoading(false);
    }
  
    useEffect(() => {
      if (email !== '' || password !== '') {
        setHasError({ email: false, password: false });
        setErrorMessage('')
      }
    }, [email, password]);

  return (
    <div className="login-container">
      <div
        className="left-container d-md-block d-none"
        data-aos="zoom-out-right"
        style={{
          backgroundImage: `url(${imageCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
        }}
      ></div>
      <div className="login-inner" data-aos="zoom-out-left">
        <h1>Sign in</h1>
        <p>Welcome back! Please enter your details</p>
        <form className="col-12" onSubmit={handleSubmit}>
          <div>
            <div className="rbt-form-group mb-5">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
                className={hasError.email ? "error" : ""}
              />
            </div>
          </div>
          <div>
            <div className="rbt-form-group mb-5">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                id="password"
                // required
                className={hasError.password ? "error" : ""}
              />
            </div>
          </div>
          <div className="mb--30 remember-me">
            <div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="formSwitch1"
                  checked={true}
                />
                <label className="form-check-label" htmlFor="formSwitch1">
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <div className="">
                <Link className="rbt-btn-link" href="/forgot-password">
                  Lost your password?
                </Link>
              </div>
            </div>
          </div>
          {errorMessage && (
            <span className="errorMessage">Incorrect User details</span>
          )}
          <div className="form-submit-group">
            <button
              type="submit"
              className="btn w-100 text-light"
              style={{
                height: "50px",
                fontSize: "18px",
                backgroundColor: "#24345C",
              }}
            >
              {isLoading ? (
                <div className="spinner-grow text-light" role="status" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          {!isFreemium && (
          <div className="auth-footer">
            <p>Don&apos;t have an account? </p>
            <Link style={{ color: "#2597ac" }} href="/register">
              Register
            </Link>
          </div>
          )}
        </form>
      </div>
    </div>
  );
}