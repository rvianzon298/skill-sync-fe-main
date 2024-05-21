import React, { useState } from "react";
import Logo from "../images/logo.png";
import LogoDark from "../images/logo-dark.png";
import NewLogo from "../images/skillsync.png";
import Head from "../layout/head/Head";
import AuthFooter from "../pages/auth/AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL  } from "./axios/auth";
import axios from "axios";
import ApiService from './base/axios';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    setLoading(true);
    var apiService = new ApiService(BASE_URL);

    apiService.authenticate(formData.email, formData.password)
        .then(response => {
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('contact', JSON.stringify(response.data.contact));
            localStorage.setItem('fullname', response.data.fullname);
            localStorage.setItem('profile', response.data.profile);
            setTimeout(() => {
                window.history.pushState(
                  `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/jobs"}`,
                  "auth-login",
                  `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/jobs"}`
                );
                window.location.reload();
            }, 1000);
            console.log(localStorage.getItem('fullname')   );
        })
        .catch(error => {
            setTimeout(() => {
                console.log(error.response.data.data);
                var errors = error.response.data.data;
                var errorString = errors[0];
                setError(errorString);
                setLoading(false);
            }, 1000);
        });


  };


  const {  register, handleSubmit, formState: { errors } } = useForm();

  return <>
    <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">

                    <img
                        className="logo-dark logo-img logo-img-lg mx-auto"
                        src={NewLogo}
                        alt="logo-dark"
                        style={{ width: '150px', height: '250px' }} // Adjust the size as needed
                    />
                </Link>
            </div>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
              <BlockDes>
                <p>Access account using your email and passcode.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorVal}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email or Username
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="email"
                  id="default-01"
                  {...register('email', { required: "This field is required" })}
                  defaultValue=""
                  placeholder="Enter your email address or username"
                  className="form-control-lg form-control" />
                {errors.email && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('password', { required: "This field is required" })}
                  defaultValue=""
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Don't have an account?{" "} <br/>
            <Link to={`${process.env.PUBLIC_URL}/reg-job`}>
              <strong>Sign Up as Job Seeker</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
  </>;
};
export default Auth;
