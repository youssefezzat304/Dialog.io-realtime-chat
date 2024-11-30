"use client";
import { useCallback, useState } from "react";
import {
  LightBg,
  LoginIcon,
  SignUpIcon,
  RoutesLoading,
} from "../../../_components";
import Login from "./Login";
import SignUp from "./SignUp";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";

import styles from "./index.module.css";

const Register = () => {
  const { isLoading } = useAuthenticateUser();

  const [loginScreen, setLoginScreen] = useState(true);
  const signUp = useCallback(() => setLoginScreen(false), []);
  const logIn = useCallback(() => setLoginScreen(true), []);

  if (isLoading) return <RoutesLoading />;

  return (
    <main className={styles.registerMain}>
      <div className={styles.registerCard}>
        <div className={styles.registerImage}>
          {loginScreen ? <LoginIcon /> : <SignUpIcon />}
        </div>
        <div className={styles.registerForm}>
          {loginScreen ? <Login signUp={signUp} /> : <SignUp logIn={logIn} />}
        </div>
      </div>
      <div className={styles.glass}></div>
      <LightBg className={styles.bg} />
    </main>
  );
};

export default Register;
