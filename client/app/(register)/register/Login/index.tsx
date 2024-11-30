"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginSchema,
  loginValidation,
} from "../../../../services/validation/user.validation";
import { ButtonIcon } from "../../../../_components";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiMessageSquareError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios";

import styles from "./index.module.css";
import { LinearProgress } from "@mui/material";

const Login = ({ signUp }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginValidation) });
  const clearAllErrors = () => {
    clearErrors();
  };
  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await api.post("/users/login", userData, {
        withCredentials: true,
      });
      if (response.data === "Invalid Email or password.") {
        setError("email", {
          message: response.data,
        });
        return;
      }
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.userInfo),
      );
      router.push("/dashboard");
    } catch (error: any) {
      console.log("handleLogin in userContext.tsx >>>>>", error.response);
    }
  };
  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
        <h1>
          Hello,<br></br> Welcome Back
        </h1>
        <label>
          <input
            className={styles.input}
            type="email"
            title="Email"
            placeholder="Enter your E-mail."
            {...register("email")}
          />
        </label>
        <label>
          <input
            className={styles.input}
            type="password"
            title="Password"
            placeholder="Enter your Password."
            {...register("password")}
          />
        </label>
        {isSubmitting ? (
          <LinearProgress color="secondary" />
        ) : (
          <input
            className={styles.loginBtn}
            title="Log-In button"
            type="submit"
            name="login"
            value="Login"
          />
        )}
        <input
          className={styles.signUpBtn}
          title="Sign-up button"
          type="button"
          name="signUp"
          value="SignUp"
          onClick={signUp}
        />
        {/* <div className={styles.loginWith}>
          <button title="Google" type="button">
            Google
          </button>
          <button title="Facebook" type="button">
            Facebook
          </button>
        </div> */}
      </form>
      {errors.email || errors.password ? (
        <div className={styles.errorContainer}>
          <BiMessageSquareError className={styles.errorIcon} />
          <strong>{errors.email?.message || errors.password?.message}</strong>
          <ButtonIcon
            title="Close"
            icon={<MdClose />}
            onClick={clearAllErrors}
            className={styles.errorClose}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Login;
