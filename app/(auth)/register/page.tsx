'use client'
import { Suspense, useEffect, useState } from "react";
import { registerType } from '@/app/Utils/authInterface';
import { registerUser } from '@/app/api/auth/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import ErrorPage from './404';
import { useSearchParams } from 'next/navigation';

function RegisterComponent() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isPasswordNotMatch, setPasswordNotMatch] = useState(false);
    const [isCourseIdPresent, setIsCourseIdPresent] = useState(true);

    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");

    useEffect(() => {
        if (!courseId) {
            setIsCourseIdPresent(false);
        }
    }, [courseId]);

    const cookies = new Cookies();
    const router = useRouter();

    async function handleRegister(e: any) {
        e.preventDefault();
        setIsSubmitted(true);

        const payload: registerType = {
            courseId: courseId ?? "",
            email,
            username,
            password,
            confirmPassword,
        };

        const res = await registerUser(payload);
        setIsSubmitted(false);
        if (res?.data.message !== "User exists") {
            cookies.set('userEmail', payload.email);
            router.push('/verify-account');
        } else {
            setErrorMessage(true);
        }
    }

    useEffect(() => {
        setErrorMessage(false);
    }, [username, email, password, confirmPassword]);

    useEffect(() => {
        if (confirmPassword.length >= password.length && password !== confirmPassword) {
            setPasswordNotMatch(true);
        } else {
            setPasswordNotMatch(false);
        }
    }, [password, confirmPassword]);

    if (!isCourseIdPresent) {
        return <ErrorPage />;
    }

    return (
        <div className="register">
            <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <h1 style={{ textAlign: 'center' }}>Create an account</h1>
                <p style={{ textAlign: 'center' }}>Start your journey!</p>
                <form className="max-width-auto" onSubmit={handleRegister}>
                    <div className="form-group">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email *" name="register-email" required />
                        <span className="focus-border" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" name="username *" required />
                        <span className="focus-border" />
                    </div>
                    <div className="form-group">
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password *" name="register_password" required />
                        <span className="focus-border" />
                    </div>
                    <div className="form-group">
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter Password *" name="register_conpassword" required />
                        <span className="focus-border" />
                    </div>
                    {isPasswordNotMatch && <span className={`errorMessage`}>Password do not match</span>}

                    {errorMessage && <span className={`errorMessage`}>User email already exists, please log in</span>}
                    <div className="form-submit-group">
                        <button type="submit" className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100" disabled={isSubmitted}>
                            {isSubmitted ? <div className="spinner-border" role="status" /> : <span className="icon-reverse-wrapper">
                                <span className="btn-text">Register</span>
                                <span className="btn-icon">
                                    <i className="feather-arrow-right" />
                                </span>
                                <span className="btn-icon">
                                    <i className="feather-arrow-right" />
                                </span>
                            </span>}
                        </button>
                    </div>
                </form>
                <div className="terms">
                    <p>Already have an account?</p>
                    <Link href="/login"> Log in</Link>
                </div>
            </div>
        </div>
    );
}

// Wrap RegisterComponent in Suspense for the Suspense boundary
export default function Register() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterComponent />
        </Suspense>
    );
}
