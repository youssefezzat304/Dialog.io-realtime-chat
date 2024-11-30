"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SignupSchema,
  signupValidation,
} from "../../../../services/validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios";
import { BiMessageSquareError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { ButtonIcon } from "@/_components";

import styles from "./index.module.css";
import { LinearProgress } from "@mui/material";

const SignUp = ({ logIn }: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignupSchema>({ resolver: zodResolver(signupValidation) });
  const clearAllErrors = () => {
    clearErrors();
  };

  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message:
          "The passwords do not match. Please ensure that the 'Password' and 'Confirm Password' fields are identical.",
      });
      return;
    }
    const userData = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      await api.post("/users/signup", userData, {
        withCredentials: true,
      });
      return router.replace("/dashboard");
    } catch (error: any) {
      if (error.response.data.title === "email used") {
        setError("email", {
          message: error.response.data.message,
        });
      }
    }
  };
  return (
    <div className={styles.signUp}>
      <form className={styles.signUpForm} onSubmit={handleSubmit(handleSignup)}>
        <h1>
          Hello,<br></br> Nice to meet you
        </h1>
        <input
          className={styles.input}
          type="text"
          title="User name"
          placeholder="Display name."
          {...register("displayName")}
        />
        <input
          className={styles.input}
          type="email"
          title="Email"
          placeholder="Enter your E-mail."
          {...register("email")}
        />
        <input
          className={styles.input}
          type="password"
          title="Password"
          placeholder="Enter your Password."
          {...register("password")}
        />
        <input
          className={styles.input}
          type="password"
          title="Password confirmation"
          placeholder="Confrim your password"
          {...register("confirmPassword")}
        />
        {isSubmitting ? (
          <LinearProgress color="secondary" />
        ) : (
          <input
            className={styles.signUpBtn}
            title="Confirm sign-up"
            type="submit"
            name="signUp"
            value="SignUp"
          />
        )}
        <input
          className={styles.loginBtn}
          title="Go to login page"
          type="button"
          name="login"
          value="Login"
          onClick={logIn}
        />
      </form>
      {errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.displayName ? (
        <div className={styles.errorContainer}>
          <BiMessageSquareError className={styles.errorIcon} />
          <strong className="">
            {errors.email?.message ||
              errors.password?.message ||
              errors.confirmPassword?.message ||
              errors.displayName?.message}
          </strong>
          <ButtonIcon
            title="Close"
            icon={<MdClose />}
            onClick={clearAllErrors}
            className={styles.errorClose}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignUp;
