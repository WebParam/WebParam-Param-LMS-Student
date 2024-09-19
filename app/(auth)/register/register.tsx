"use client";
import "./register.scss";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/api/auth/auth";
import Cookies from "universal-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Testimonies from "./testimonies";
import ErrorPage from "./404";
import { readUserData } from "@/app/lib/endpoints";
// import flagsmith from "flagsmith/isomorphic";
// import { useFlags, useFlagsmith } from "flagsmith/react";

export default function Register() {
  const [isExploding, setIsExploding] = React.useState(false);
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<any>({
    email: false,
    password: false,
    username: false,
    phone: false,
    confirmPassword: false,
  });

  const cookies = new Cookies();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";

  const hasConstantCourseId = process.env.NEXT_PUBLIC_COURSE_ID ?? "";
  // const flags = useFlags(["FREEMIUM", "banner_size"]); // only causes re-render if specified flag values / traits change
  // console.log("Flags: ", flags);
  // const isFreemium = flags.FREEMIUM.enabled && flags.FREEMIUM.value == true;

  const isFreemium =
    process.env.NEXT_PUBLIC_FREEMIUM &&
    process.env.NEXT_PUBLIC_FREEMIUM == "true"
      ? true
      : false;
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setIsLoading(true);

    const newHasError = {
      email: email === "",
      password: password === "",
      username: username === "",
      phone: phone === "",
      confirmPassword: confirmPassword === "",
    };

    setHasError(newHasError);

    if (
      newHasError.email ||
      newHasError.password ||
      newHasError.username ||
      newHasError.phone ||
      newHasError.confirmPassword
    ) {
      setIsLoading(false);
      return;
    }

    let courseId = hasConstantCourseId ?? "6669f0ff8759b480859c10a7";
    let studentRegistrationType = 0;
    if (isFreemium && projectId !== "") {
      courseId = projectId;
      studentRegistrationType = 1;
    }

    const payload = {
      courseId,
      email,
      phoneNumber: phone,
      username,
      password,
      confirmPassword,
      studentRegistrationType,
    };

    try {
      const res = await registerUser(payload);
      setIsLoading(false);
      

      if (res) {
        if (res?.data.message !== "User exists") {
          setIsExploding(true);
          cookies.set("userEmail", payload.email);

          if (hasConstantCourseId != "") {
            cookies.set("courseId", payload.courseId);
          }

          setTimeout(() => {
            router.push("/verify-account");
            setIsExploding(false);
          }, 2000);
        } else {
          setErrorMessage(res?.data?.message);
        }
      }
    } catch (error: any) {
      setErrorMessage("Network Error please try again");
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (
      email !== "" ||
      password !== "" ||
      username !== "" ||
      phone !== "" ||
      confirmPassword !== ""
    ) {
      setHasError({
        email: false,
        password: false,
        username: false,
        phone: false,
        confirmPassword: false,
      });
      setErrorMessage("");
    }
  }, [email, password, username, phone, confirmPassword]);

  useEffect(() => {
    if (phone && !phone.startsWith("+27")) {
      setPhone(`+27${phone}`);
    }
  }, [phone]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch(
          `${readUserData}/api/v1/OrganizationProgram/GetOrganizationProgram/${projectId}`,
          {
            method: "GET",
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response data:", data);
        setProjectName(data.data.programTitle);
      } catch (error) {
        console.error(error);
      }
    };

    if (isFreemium && projectId !== "") {
      getProject();
    }
  }, []);

  if (isFreemium && projectId == "") {
    return <ErrorPage />;
  }

  return (
    <div className="register-container">
      <div
        className="left-container d-md-block d-none"
        data-aos="zoom-out-right"
        style={{
          backgroundColor: "#24345C",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
        }}
      >
        <Testimonies />
      </div>
      <div className="login-inner" data-aos="zoom-out-left">
        {projectName ? (
          <>
            <h1>{projectName}</h1>
            <p>Create an account</p>
          </>
        ) : (
          <>
            <h2 style={{marginTop:"15%"}}>Create an account</h2>
            <p>Start your journey!</p>
          </>
        )}

        <form className="col-12" onSubmit={handleSubmit}>
          <div>
            <div className="rbt-form-group mb-5">
              <input
                type="email"
                name="email"
                placeholder="Enter Email *"
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
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username *"
                id="username"
                // required
                className={hasError.username ? "error" : ""}
              />
            </div>
          </div>
          <div>
            <div className="rbt-form-group mb-5">
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number *"
                id="phone"
                // required
                className={hasError.phone ? "error" : ""}
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
                placeholder="Enter Password *"
                id="password"
                // required
                className={hasError.password ? "error" : ""}
              />
            </div>
          </div>
          <div>
            <div className="rbt-form-group mb-5">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter Password *"
                id="confirmPassword"
                className={hasError.confirmPassword ? "error" : ""}
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
                  Accept Terms & Conditions
                </label>
              </div>
            </div>
          </div>

          {errorMessage && (
            <span className="errorMessage">Incorrect User details</span>
          )}
          <div className="form-submit-group">
            <button
              type="submit"
              className="btn w-100 text-light position-relative"
              style={{
                height: "50px",
                fontSize: "18px",
                backgroundColor: "#24345C",
              }}
            >
              {isLoading ? (
                <div className="spinner-grow text-light" role="status" />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="auth-footer">
            <p>Already have an account? </p>
            <Link style={{ color: "#2597ac" }} href="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
