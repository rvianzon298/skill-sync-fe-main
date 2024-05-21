import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import LogoDark from "../images/logo-dark.png";
import NewLogo from "../images/123.png";
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
import { Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL  } from "./axios/auth";
import axios from "axios";
const RegisterJobseeker = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true);

    try {
        const resumeData = new FormData();
        resumeData.append("resume", formData.resume[0]); // Assuming input field name is 'resume'
        resumeData.append("profile_picture", formData.profile_picture[0]); // Assuming input field name is 'profile_picture'

        // Append other form data to formData object
        Object.keys(formData).forEach((key) => {
          if (key !== "resume" && key !== "profile_picture") {
            resumeData.append(key, formData[key]);
          }
        });
      // Make an API request to register employer
      const response = await axios.post(BASE_URL + '/register-jobseeker', resumeData);

      // Check for success based on your API response structure
      if (response.data && response.data.data) {
        navigate(`${process.env.PUBLIC_URL}/auth`);
      } else {
        // Handle registration failure
        setError(response.message);
        console.log('Registration failed:', response.data.error);
      }
    } catch (error) {
      // Handle any other errors during registration
      setError(error.message);
      console.log('Registration error:', error);


    } finally {
      setLoading(false);
    }
  };
  return <>
    <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">

                    <img
                        className="logo-dark logo-img logo-img-lg mx-auto"
                        src={NewLogo}
                        alt="logo-dark"
                        style={{ width: '80px', height: '150px' }} // Adjust the size as needed
                    />
                </Link>
            </div>
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Create New Account Job Seeker</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>

          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" />{errorVal}
              </Alert>
            </div>
          )}
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">
                First Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name', { required: true })}
                  placeholder="Enter your name"
                  className="form-control-lg form-control" />
                {errors.first_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">
                Last Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name', { required: true })}
                  placeholder="Enter your name"
                  className="form-control-lg form-control" />
                {errors.last_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="extension_name">
                Extension Name
              </label>
              <select
                  id="extension_name"
                  {...register('extension_name', { required: true })}
                  className="form-control-lg form-control"
                >
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sex">
                Sex
              </label>
              <select
                  id="sex"
                  {...register('sex', { required: true })}
                  className="form-control-lg form-control"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact_number">
                Contact #
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="contact_number"
                  {...register('contact_number', { required: true })}
                  placeholder="Enter your #"
                  className="form-control-lg form-control" />
                {errors.contact_number && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="address"
                  {...register('address', { required: true })}
                  placeholder="Enter your address"
                  className="form-control-lg form-control" />
                {errors.address && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="street">
              Street
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="street"
                  {...register('street', { required: true })}
                  placeholder="Enter your street"
                  className="form-control-lg form-control" />
                {errors.street && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="barangay">
              Barangay
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="barangay"
                  {...register('barangay', { required: true })}
                  placeholder="Enter your barangay"
                  className="form-control-lg form-control" />
                {errors.barangay && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="province">
              Province
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="province"
                  {...register('province', { required: true })}
                  placeholder="Enter your province"
                  className="form-control-lg form-control" />
                {errors.province && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="region">
              Region
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="region"
                  {...register('region', { required: true })}
                  placeholder="Enter your region"
                  className="form-control-lg form-control" />
                {errors.region && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="country">
              Country
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="country"
                  {...register('country', { required: true })}
                  placeholder="Enter your country"
                  className="form-control-lg form-control" />
                {errors.country && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="zipcode">
              Zipcode
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="zipcode"
                  {...register('zipcode', { required: true })}
                  placeholder="Enter your zipcode"
                  className="form-control-lg form-control" />
                {errors.zipcode && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="educational_attainment">
                Educational Attainment
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="educational_attainment"
                  {...register('educational_attainment', { required: true })}
                  placeholder="Enter your education"
                  className="form-control-lg form-control" />
                {errors.educational_attainment && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="experience">
              Experience
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="experience"
                  {...register('experience', { required: true })}
                  placeholder="Enter your experience"
                  className="form-control-lg form-control" />
                {errors.experience && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="birthdate">
                Birthdate
              </label>
              <div className="form-control-wrap">
                <input
                  type="date"
                  id="birthdate"
                  {...register('birthdate', { required: true })}
                  placeholder="Enter your birthdate"
                  className="form-control-lg form-control" />
                {errors.birthdate && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email or Username
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="email"
                  bssize="lg"
                  id="default-01"
                  {...register('email', { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address or username" />
                {errors.email && <p className="invalid">This field is required</p>}
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
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Confirm Passcode
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password_confirmation"
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
                  id="password_confirmation"
                  {...register('password_confirmation', { required: "This field is required" })}
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password_confirmation && <span className="invalid">{errors.password_confirmation.message}</span>}
              </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="job_category">
                    Job Category
                </label>
                <select
                    id="job_category"
                    {...register('job_category', { required: true })}
                    className="form-control-lg form-control"
                    defaultValue="" // Set default value to an empty string
                >
                    <option value="" disabled>Select job category</option>
                    {/* Map through the list of job categories and render options */}
                    {[
                    { id: 1, name: 'Office Work' },
                    { id: 2, name: 'Production' },
                    { id: 3, name: 'Skilled' },
                    { id: 4, name: 'Hospitality' }
                    ].map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.job_category && <p className="invalid">Please select a job category</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="resume">
                Resume
              </label>
              <div className="form-control-wrap">
                <input
                  type="file"
                  id="resume"
                  {...register('resume', { required: true })}
                  className="form-control-lg form-control"
                  onChange={(e) => setValue("resume", e.target.files)} // Set value for resume input field
                />
                {errors.resume && <p className="invalid">Please upload your resume</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="profile_picture">
                Profile Picture
              </label>
              <div className="form-control-wrap">
                <input
                  type="file"
                  id="profile_picture"
                  {...register('profile_picture', { required: true })}
                  className="form-control-lg form-control"
                  onChange={(e) => setValue("profile_picture", e.target.files)} // Set value for resume input field
                />
                {errors.profile_picture && <p className="invalid">Please upload your profile picture</p>}
              </div>
            </div>
            <div className="form-group">
              <Button type="submit" color="primary" size="lg" className="btn-block">
                {loading ? <Spinner size="sm" color="light" /> : "Register"}
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/auth`}>
              <strong>Sign in instead</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
  </>;
};
export default RegisterJobseeker;
