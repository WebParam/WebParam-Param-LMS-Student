"use client";
import "./login.scss";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { LoginUser, ResendSMS } from "@/app/api/auth/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Modal from "react-responsive-modal";

export default function LoginPage() {
    const imageCover = process.env.NEXT_PUBLIC_LOGIN_IMAGE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState<any>({ email: false, password: false });
    const [modalMessageShow, setModalMessageShow] = useState(false);
    const [resending, setResending] = useState(false);
    const [contact, setContact] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
            debugger;
            if (res == null) {
                setErrorMessage('User not found');
                return;
            }
            debugger;
            
            if (res.data.data) {
                
              console.log("Login response:", res);

              const userId = res.data.data.id;
              console.log("User ID:", userId);
      
              const options = {
                path: '/',
                sameSite: 'strict' as 'strict',
                secure: process.env.NEXT_PUBLIC_API_ENV === 'production',
              };
      
              cookies.set("loggedInUser", res.data, options);
              cookies.set("userID", userId, options);
      
              console.log("Cookies set:", cookies.getAll());
              
              if(process.env.NEXT_PUBLIC_FREEMIUM){
                const redirectPath = "/student/projects";
                router.push(redirectPath)
              }else{
              const redirectPath = "/student/enrolled-courses?tab=enrolled";
              router.push(redirectPath)
              }
                
            } else {
              setErrorMessage(res.data.message);
              if (res.data.message == "User is not verified"){
                setModalMessageShow(true);
              }
            }
        } catch (error: any) {
            setErrorMessage('Network Error please try again');
            setIsLoading(false);
        }
      

      console.log('Form submitted successfully');
      setIsLoading(false);
    }

    async function resend(e:any){
      e.preventDefault();
      setResending(true);
      
       
        var payload = {
          phoneNumber:contact
        }

        const res = await ResendSMS(payload);
        debugger;
        if(res.status ==200 ){
          cookies.set("activate-email", res?.data?.email);
          router.push('/activate-account');
        }else{
          setResending(false)
        }
        
      }
  
    useEffect(() => {
      if (email !== '' || password !== '') {
        setHasError({ email: false, password: false });
        setErrorMessage('')
      }
    }, [email, password]);

    useEffect(() => {
      if (contact && !contact.startsWith("+27")) {
        const _formatted = contact.substring(1,contact.length);
        
        setContact(`+27${_formatted}`);
      }
    }, [contact]);

  return (
    <>
    <Modal 
      open={modalMessageShow} 
      data-aos="zoom-out-right"
      onClose={() => setModalMessageShow(false)} 
      closeOnOverlayClick={false}
      focusTrapped={true}
      styles={{modal: {borderRadius: '10px'}}}

      center>
      <div className="modal-activate-account">
        <h4>User is not verified</h4>
        <p>Please enter your number to activate your account</p>
        <form onSubmit={resend}>
          {resending ? <div className="spinner-grow text-primary" role="status" /> : 
          <input 
            type="text" 
            placeholder="+27-XXX-XXXX" 
            value={contact}
            className="number-input"
            maxLength={12}
            onChange={(e) => setContact(e.target.value)} />}
          <button type="submit">Activate</button>
        </form>
      </div>
    </Modal>
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
            <div className="rbt-form-group mb-5 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                id="password"
                // required
                className={hasError.password ? "error" : ""}
                
              />
              <i onClick={()=>setShowPassword(!showPassword)} className="feather-eye position-absolute" style={{right:"10px", top:"17px", cursor:"pointer"}}  />
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
            <span className="errorMessage">{errorMessage}</span>
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
    </>
  );
}