'use client'
import { verifyOtp } from '@/app/api/auth/auth';
import React, { FormEvent, useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import imageCover from './oc-hi-five.svg';
import '../forgot.scss';

export default function Otp(){
    const [otp, setOtp] = useState('');
    const cookies = new Cookies();
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const router = useRouter();

    const resetEmail = cookies.get('resetEmail');


    async function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(otp);

        if (password != retypePassword) {
            return;
        }

        const payload = {
            otp: otp,
            email: resetEmail,
            password: retypePassword
        };

        const res = await verifyOtp(payload);
        console.log(res);

        if (res) {
            router.push('/login');
        }
    }

    return (
    <>
    <div className='reset-otp-container'>
    <div
            className="left-container d-md-block d-none"
            data-aos="zoom-out-right"
            style={{
            backgroundImage: `url(${imageCover.src})`,
            backgroundSize: "60%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.2",
            }}
            >
            
        </div>
      <div className="reset-otp-inner">
        <h3>Forgot Password</h3>
        <div
            className="tab-pane fade active show"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
        >
            <form onSubmit={handleOtpSubmit} className="rbt-profile-row rbt-default-form row row--15">
            <div className="col-12">
                <div className="rbt-form-group">
                <label htmlFor="currentpassword">OTP</label>
                <input
                    id="currentpassword"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                </div>
            </div>
            <div className="col-12">
                <div className="rbt-form-group">
                <label htmlFor="newpassword">New Password</label>
                <input id="newpassword" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="col-12">
                <div className="rbt-form-group">
                <label htmlFor="retypenewpassword">Re-type New Password</label>
                <input
                    id="retypenewpassword"
                    type="password"
                    placeholder="Re-type New Password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                />
                </div>
            </div>
            <div className="col-12 mt--10">
                <div className="rbt-form-group">
                <button
                    type="submit"
                    className="btn w-100 text-light"
                    style={{
                        height: "50px",
                        fontSize: "18px",
                        backgroundColor: "#24345C",
                    }}
                >
                    Update Password
                </button>
                </div>
            </div>
            </form>
        </div>
      </div>
    </div>
    </>
    );
}
