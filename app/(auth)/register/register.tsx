import { useState } from "react";
import styles from "./register.module.scss";
import LoginNav from "../../../ui/login/login-nav";
import RegisterForm from "./registerform";
import Image from "next/image";

export default function Register() {
  return (
    <div className={styles.registerPage}>
      <LoginNav />
      <div className={styles.registerContainer}>
        <div className={styles.vectorContainer}>
          <Image
            src="/svg/Vector.svg"
            alt="Vector"
            width={150}
            height={300}
            className={styles.vectorImage}
          />
        </div>
        <div className={styles.registerContent}>
          <h1 className={styles.title}>
            Hi There,
            <br />
            Welcome to{" "}
            <span className={styles.highlight}>
              Ramalo
              <Image
                src="/svg/blue.svg"
                alt="Underline"
                className={styles.underline}
                width={100}
                height={20}
              />
            </span>
          </h1>
          <p className={styles.subtitle}>Please fill in your details.</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
