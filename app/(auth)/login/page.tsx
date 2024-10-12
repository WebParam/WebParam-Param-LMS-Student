"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { LoginUser, ResendSMS } from "@/app/api/auth/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Modal from "react-responsive-modal";
import styles from './login.module.scss';

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
    <div className={styles.loginPage} style={{backgroundImage: `url(${imageCover})`}}>
      <div className={styles.loginContainer}>
        <div className={styles.loginFormWrapper}>
          <div>
            <h1 className={styles.title}>
              Hello <span className={styles.titleUnderline}>Again</span>
            </h1>
            <p className={styles.subtitle}>
              Welcome back! Please fill in your details.
            </p>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`${styles.input} ${styles.requiredField} ${hasError.email ? styles.error : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles.asterisk}>*</span>
              </div>
              <div className={styles.formGroup}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`${styles.input} ${styles.requiredField} ${hasError.password ? styles.error : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={styles.asterisk}>*</span>
                <i 
                  onClick={() => setShowPassword(!showPassword)} 
                  className={`feather-eye ${styles.passwordToggle}`}
                />
              </div>
              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}
              <div className={styles.buttonGroup}>
                <button 
                  type="submit" 
                  className={styles.signUpButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-grow text-light" role="status" />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className={styles.recoverPassword}>
                  <Link href="/forgot-password">Recover Password</Link>
                </div>
              </div>
            </form>
          </div>
          {!isFreemium && (
            <div className={styles.signUpPrompt}>
              Don&apos;t have an account yet? <Link href="/register">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
