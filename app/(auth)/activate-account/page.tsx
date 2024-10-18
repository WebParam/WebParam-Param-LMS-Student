'use client';
import './activate.scss';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import imageCover from "./verify.svg";
import { LoginUser, ResendSMS, verifyUserAccount } from '@/app/api/auth/auth';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { POST } from '@/app/lib/api-client';



export default function VerifyPage() {
  // const imageCover = process.env.NEXT_PUBLIC_LOGIN_IMAGE;
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [resending, setResending] = useState(false);
    const[otp, setOtp] = useState<Number>(0);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    
    const cookies = new Cookies();
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        setErrorMessage(false);
      
        if (/^[0-9]$/.test(value)) {
          const newOtpValues = [...otpValues];
          newOtpValues[index] = value;
          setOtpValues(newOtpValues);
      
          if (index <= 5) {
            inputRefs[index + 1]?.current && inputRefs[index + 1].current?.focus();
            const otp = Number(newOtpValues.join(''));
            setOtp(otp);
          }
      
          e.target.classList.remove('incorrect');
        
        } else {
          const newOtpValues = [...otpValues];
          newOtpValues[index] = '';
          setOtpValues(newOtpValues);
      
          if (index > 0 && inputRefs[index - 1].current) {
            inputRefs[index - 1].current?.focus();
          }
      
          e.target.classList.add('incorrect');
        }
      };

      async function resend(){
      setResending(true);
        var contact = cookies.get('userPhone');
        debugger;
        var payload = {
          phoneNumber:contact
        }

        const res = await ResendSMS(payload);
        if(res.status ==200 ){
          setTimeout(()=>{
            setResending(false);
          },10000)
        }else{
          setResending(false)
        }
        
      }

      async function handleVerify(e:any) {
        e.preventDefault();
        setIsSubmitted(true);
        const email = cookies.get('activate-email');
        const payload = {
            email,
            otp: String(otp)
        }

        const res = await verifyUserAccount(payload);
        
        if (res) {
            console.log(res);
            setIsSubmitted(false);
            // const user = await 
            cookies.set("loggedInUser", res?.data);
            localStorage.setItem("loggedInUser", res?.data)
            const redirectPath = process.env.NEXT_PUBLIC_FREEMIUM === 'true' ? "/student/projects?tab=enrolled" : "/student/student-profile";

            router.push(redirectPath)
        } else {
            setIsSubmitted(false);
            setErrorMessage(true)
        }
      }
    return (
        <div className="login-container">
            <div 
                  className="left-container"
                data-aos="zoom-out-right"
                style={{
                  backgroundImage: !isMobile? `url(${imageCover.src})`:"none",
                  backgroundSize: '60%',                
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter:"none !important",
                //   backgroundColor:"#24345C;",
                  boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
              }}
                >
                    {/* <div className='verify-card'>
                        <Image src={imageCover.src} alt="verify" width={200} height={200}/>
                        <p className='text-center'>We sent an OTP to the phone number you provided.
                        Check your inbox and enter the 5 digit code.</p>
                    </div> */}
            </div>
           <div className="login-inner" style={{filter:"none !important"}} data-aos="zoom-out-left">
           <div className="verify">
            <h1 style={{color:"white"}}>Confirm  your Phone Number</h1>
            {/* <p className='text-center'>We sent an OTP to the phone number you provided.
            Check your inbox and enter the 5 digit code.</p> */}
           <small>We sent an OTP to the phone number you provided.
           Check your inbox and enter the 5 digit code.</small><br/>
            <form onSubmit={handleVerify}>
           
                <div className="otpContainer">
               
                    {inputRefs.map((ref, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`input${index + 1}`}
                      maxLength={1}
                      ref={ref}
                      value={otpValues[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  ))}
                </div>
                {errorMessage && <span className={`errorMessage`} style={{marginBottom:'3px'}}>Incorrect OTP, please check and try again</span>}
                <div className="form-submit-group w-100">
                    <button type="submit" className="btn w-100 position-relative" style={{height:'50px', fontSize:'18px'}}>
                        {isSubmitted ? <div className="spinner-grow text-light" role="status" /> : 'Confirm'}
                    </button>
                </div>
                <div className="auth-footer">
            <p style={{marginRight:"10px"}}> <small>Didn&#39;t receive a message?</small></p>
           
              <p style={{cursor: resending?"none":"pointer", color:resending?"grey":"", pointerEvents:resending?"none":"all"}}  onClick={()=>resend()}><b> {resending?"Sending SMS..": "Resend SMS"} </b></p>
          
          </div>
            </form>
        </div>
            </div>
        </div>
    );
}