'use client';
import './verify.scss';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import imageCover from "./verify.svg";
import { LoginUser, verifyUserAccount } from '@/app/api/auth/auth';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';



export default function VerifyPage() {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
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

      async function handleVerify(e:any) {
        e.preventDefault();
        setIsSubmitted(true);
        const email = cookies.get('userEmail');
        const payload = {
            email,
            otp: String(otp)
        }

        const res = await verifyUserAccount(payload);
        debugger;
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
                className='left-container'
                data-aos="zoom-out-right"
                style={{
                  backgroundImage: !isMobile? `url(${imageCover.src})`:"none",
                  backgroundSize: 'cover',                
                  backgroundPosition: 'center',
                  backgroundColor:"#f0eee",
                  boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
              }}
                >
                    <div className='verify-card'>
                        <Image src={imageCover.src} alt="verify" width={200} height={200}/>
                        <p className='text-center'>We sent an OTP to the phone number you provided.
                        Check your inbox and enter the 5 digit code.</p>
                    </div>
            </div>
           <div className="login-inner" data-aos="zoom-out-left">
           <div className="verify">
            <h1>Confirm  your Phone Number</h1>
            <p className='text-center para-text'>We sent an OTP to the phone number you provided.
            Check your inbox and enter the 5 digit code.</p>
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
                <div className="account">
                    <p>Already have an account?
                    <Link href='/login'> Log in</Link></p>
                </div>
            </form>
        </div>
            </div>
        </div>
    );
}