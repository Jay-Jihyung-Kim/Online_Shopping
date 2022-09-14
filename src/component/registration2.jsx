import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import styled, { css } from "styled-components";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Icon } from "@iconify/react";
import { mobile } from "../util/responsive";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 35% 65%;
  height: 100%;
  margin-bottom: 70px;
  ${mobile({ display: "flex", flexDirection: "column" })}
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 150px;
  ${mobile({
    display: "flex",
    flexDirection: "row",
    paddingTop: "20px",
    justifyContent: "center",
    textAlign: "center",
    border: "none",
  })}
`;
const listbasestyle = css`
  font-size: 25px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-left: 50px;
  padding: 15px 0px 15px 50px;
  background-color: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    color: white;
  }
  ${mobile({
    margin: "0",
    padding: "10px 30px",
  })}
`;

const Sign = styled.span`
  ${listbasestyle}
  background-color: ${(props) =>
    props.status === "sign" ? "rgba(0, 0, 0, 0.7)" : "none"};
  color: ${(props) =>
    props.status === "sign" ? "white" : "rgba(0, 0, 0, 0.5)"};
`;
const Register = styled.span`
  ${listbasestyle}
  background-color: ${(props) =>
    props.status === "register" ? "rgba(0, 0, 0, 0.7)" : "none"};
  color: ${(props) =>
    props.status === "register" ? "white" : "rgba(0, 0, 0, 0.5)"};
`;

const formBasicStyle = css`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 0 auto;
  ${mobile({
    width: "70%",
  })}
`;

//Sign in
const SigninForm = styled.form`
  ${formBasicStyle}
  display: ${(props) => (props.display === "sign" ? "block" : "none")};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 30px;
`;
const Label = styled.label``;
const Input = styled.input`
  font-size: 20px;
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  border-bottom: 1px solid black;
  margin-top: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 20px;
  }
`;
const InputTagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const RememberTag = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
`;

const ForgotPassword = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  font-weight: 100;
  font-size: 20px;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 0;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//Register

const RegisterForm = styled.form`
  ${formBasicStyle}
  display: ${(props) => (props.display === "register" ? "block" : "none")};
  position: relative;
`;
const Error = styled.span`
  font-size: 20px;
  color: red;
  font-weight: 200;
`;

const Validation = styled.span`
  font-size: 20px;
  color: red;
  font-weight: 200;
  display: ${(props) => props.display};
  flex-direction: column;
  right: 60px;
  top: 200px;
  border: 3px solid rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 30px;
  margin-top: 20px;
`;

const RegisterText = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 20px;
  & > u {
    font-size: 12px;
  }
`;

const ThankyouContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  top: 0;
  display: ${(props) => (props.status === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const ThankyouMessage = styled.span`
  color: white;
  font-size: 36px;
  background-color: #253746;
  padding: 30px;
  text-align: center;
`;

const Registration = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  const [status, setStatus] = useState("sign");
  const [passwordGuide, setPasswordGuide] = useState("none");
  const [registerComplete, setRegisterComplete] = useState(false);

  const register = useFormik({
    initialValues: {
      registerEmail: "",
      firstName: "",
      lastName: "",
      registerPassword: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      registerEmail: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      firstName: Yup.string().required("Name is Required"),
      lastName: Yup.string().required("Name is Required"),
      registerPassword: Yup.string()
        .required("Password is Required")
        .matches(/[A-Z]+/, "One Uppercase required")
        .matches(/[@$!%*#?&]+/, "One special character required")
        .matches(/\d+/, "One number required"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("registerPassword")], "Your passwords do not match."),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:3001/users", {
          firstName:
            values.firstName.charAt(0).toUpperCase() +
            values.firstName.slice(1).toLowerCase(),
          lastName:
            values.lastName.charAt(0).toUpperCase() +
            values.lastName.slice(1).toLowerCase(),
          email: values.registerEmail.toLowerCase(),
          password: values.registerPassword,
        });
        resetForm();
        setRegisterComplete(true);
        setTimeout(() => {
          navigate("/");
          toTop();
          setRegisterComplete(false);
        }, 3000);
        console.log("register form filled");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    ValidationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3001/auth", {
          email: values.email.toLowerCase(),
          password: values.password,
        });
        // const user = {
        //   token: response.data.token,
        //   email: values.email.toLowerCase(),
        //   userId: response.data.user_id,
        // };

        console.log("login form filled");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  });

  function handleClick(list) {
    setStatus(list);
  }

  function isUpper(str) {
    return str.toLowerCase() != str;
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  function handleFocus() {
    setPasswordGuide("flex");
  }

  function handleBlur() {
    setPasswordGuide("none");
  }

  function toTop() {
    window.scrollTo(0, 0);
  }

  return (
    <React.Fragment>
      <Container>
        <ListContainer>
          <Sign onClick={() => handleClick("sign")} status={status}>
            Sign In
          </Sign>
          <Register onClick={() => handleClick("register")} status={status}>
            Register
          </Register>
        </ListContainer>
        <SigninForm onSubmit={login.handleSubmit} display={status}>
          <Title>Sign In To Your Account</Title>
          <div>
            <Label htmlFor="email"></Label>
            <Input
              value={login.values.email}
              name="email"
              onChange={login.handleChange}
              id="email"
              type="text"
              placeholder="Email"
              error={login.errors.email}
            />
            <Error>
              {login.errors.email ? <p>{login.errors.email}</p> : null}
            </Error>
          </div>
          <div>
            <Label htmlFor="password"></Label>
            <Input
              value={login.values.password}
              name="password"
              onChange={login.handleChange}
              id="password"
              type="password"
              placeholder="Password"
            />
            <Error>
              {login.errors.password ? <p>{login.errors.password}</p> : null}
            </Error>
          </div>
          <InputTagContainer>
            <RememberTag>
              <input
                type="checkbox"
                id="Remember"
                name="Remember"
                style={{ marginRight: "3px" }}
              />
              <label>Remember me</label>
            </RememberTag>
            <ForgotPassword>
              <LockPersonIcon style={{ fontSize: "20px" }} />
              Forgot Your Password?
            </ForgotPassword>
          </InputTagContainer>
          <Button type="submit">Sign In</Button>
          <Button
            style={{
              background: "white",
              color: "black",
              border: "1px solid rgba(0,0,0,.5)",
              fontWeight: "200",
            }}
            type="submit"
          >
            <Icon
              icon="flat-color-icons:google"
              style={{ fontSize: "20px", marginRight: "5px" }}
            />
            Sign in with Google
          </Button>
          <Button
            style={{
              background: "white",
              color: "black",
              border: "1px solid rgba(0,0,0,.5)",
              fontWeight: "200",
            }}
            type="submit"
          >
            <FacebookIcon
              style={{
                color: "#3B5998",
                fontSize: "20px",
                marginRight: "5px",
              }}
            />
            Sign in with Facebook
          </Button>
        </SigninForm>
        <RegisterForm onSubmit={register.handleSubmit} display={status}>
          <Title>Create a New Account</Title>
          <div>
            <Label htmlFor="firstName"></Label>
            <Input
              value={register.values.firstName}
              name="firstName"
              onChange={register.handleChange}
              id="firstName"
              type="text"
              placeholder="First Name"
              error={register.errors.firstName}
            />
            <Error>
              {register.errors.firstName ? (
                <p>{register.errors.firstName}</p>
              ) : null}
            </Error>
          </div>
          <div>
            <Label htmlFor="lastName"></Label>
            <Input
              value={register.values.lastName}
              name="lastName"
              onChange={register.handleChange}
              id="lastName"
              type="text"
              placeholder="Last Name"
              error={register.errors.lastName}
            />
            <Error>
              {register.errors.lastName ? (
                <p>{register.errors.lastName}</p>
              ) : null}
            </Error>
          </div>
          <div>
            <Label htmlFor="registerEmail"></Label>
            <Input
              value={register.values.registerEmail}
              name="registerEmail"
              onChange={register.handleChange}
              id="registerEmail"
              type="text"
              placeholder="Email"
              error={register.errors.registerEmail}
            />
            <Error>
              {register.errors.registerEmail ? (
                <p>{register.errors.registerEmail}</p>
              ) : null}
            </Error>
          </div>
          <div>
            <Label htmlFor="registerPassword"></Label>
            <Input
              value={register.values.registerPassword}
              name="registerPassword"
              onChange={register.handleChange}
              id="RegisterPassword"
              type="password"
              placeholder="Password"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Error>
              {register.errors.registerPassword ? (
                <p>{register.errors.registerPassword}</p>
              ) : null}
            </Error>
            <Validation display={passwordGuide}>
              <span style={{ color: "rgba(0, 0, 0, 0.8) " }}>
                Your password must...
              </span>
              {register.values.registerPassword.length > 8 ? (
                <span style={{ color: "green" }}>
                  Have minimum of 8 characters
                </span>
              ) : (
                <span>Have minimum of 8 characters</span>
              )}
              {isUpper(register.values.registerPassword) ? (
                <span style={{ color: "green" }}>
                  Have 1 uppercase character
                </span>
              ) : (
                <span>Have 1 uppercase character</span>
              )}
              {hasNumber(register.values.registerPassword) ? (
                <span style={{ color: "green" }}>Have 1 number</span>
              ) : (
                <span>Have 1 number</span>
              )}
              {containsSpecialChars(register.values.registerPassword) ? (
                <span style={{ color: "green" }}>Have 1 special character</span>
              ) : (
                <span>Have 1 special character</span>
              )}
            </Validation>
          </div>
          <div>
            <Label htmlFor="confirmPassword"></Label>
            <Input
              value={register.values.confirmPassword}
              name="confirmPassword"
              onChange={register.handleChange}
              id="ConfirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <Error>
              {register.errors.confirmPassword ? (
                <p>{register.errors.confirmPassword}</p>
              ) : null}
            </Error>
          </div>
          <RegisterText>
            I agree to the Website <u>Terms of Use</u>, and the{" "}
            <u>Privacy Policy</u>.
          </RegisterText>
          <Button type="submit">Create Account</Button>
        </RegisterForm>
      </Container>
      <ThankyouContainer status={registerComplete}>
        <ThankyouMessage>Thank You for Registering With Us!</ThankyouMessage>
      </ThankyouContainer>
    </React.Fragment>
  );
};

export default Registration;
