import React, { useState,useEffect  }  from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
  NioIconCard,
  BlockBetween
} from "../../components/Component";
import { useForm } from "react-hook-form";
// import {  NioIconCard } from "../../../components/Component";
import Icon from "../../components/icon/Icon";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink,
    // Button,

    Nav,
    NavLink,
    NavItem,
    TabContent,
    TabPane,
    DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge,Spinner,Alert
  } from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL  } from "../axios/auth";
import ApiService from '../base/axios';
const Profile = ({ ...props }) => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const token = localStorage.getItem('accessToken');
    const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorVal, setError] = useState("");
    const profile = JSON.parse(localStorage.getItem('contact'));
    const user = JSON.parse(localStorage.getItem('user'));
    const handlePasswordChange = async (formData) => {
        setLoading2(true);
        apiService.updatePassword(formData)
            .then(response => {
                setTimeout(() => {
                    setLoading2(false);
                }, 1000);
            })
            .catch(error => {
                setTimeout(() => {
                    console.log(error.response.data.data);
                    var errors = error.response.data.data;
                    var errorString = errors[0];
                    setError(errorString);
                    setLoading2(false);
                }, 1000);
            });

    }
    const handleFormSubmit = async (formData) => {
        var role = localStorage.getItem('role');
        setLoading(true);
        if (role == 'Employer') {
            apiService.updateProfileEmployer(formData)
                .then(response => {
                    localStorage.setItem('contact', JSON.stringify(response.data.contact));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setLoading(false);
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
         }  else {
            apiService.updateProfileJobseeker(formData)
                .then(response => {
                    localStorage.setItem('contact', JSON.stringify(response.data.contact));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setLoading(false);
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
         }
    }
       
   
    console.log(profile);
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle>Profile</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" />{errorVal}
              </Alert>
            </div>
          )}
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="row">
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <Card className="card-bordered">
                        <CardBody className="card-inner">
                            <div className="row">
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="first_name">
                                        First Name
                                    </label>
                                    <div className="form-control-wrap">
                                        
                                        <input
                                        type="text"
                                        defaultValue={profile.first_name}
                                        id="first_name"
                                        {...register('first_name', { required: true })}
                                        placeholder="Enter your name"
                                        className="form-control-lg form-control" />
                                        {errors.first_name && <p className="invalid">This field is required</p>}
                                    </div>
                                </div>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="last_name">
                                        Last Name
                                    </label>
                                    <div className="form-control-wrap">
                                        <input
                                        type="text"
                                        id="last_name"
                                        defaultValue={profile.last_name}
                                        {...register('last_name', { required: true })}
                                        placeholder="Enter your name"
                                        className="form-control-lg form-control" />
                                        {errors.last_name && <p className="invalid">This field is required</p>}
                                    </div>
                                    </div>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="sex">
                                        Sex
                                    </label>
                                    <div className="form-control-wrap">
                                    <select
                                        defaultValue={profile.sex}
                                        id="sex"
                                        {...register('sex', { required: true })}
                                        className="form-control-lg form-control"
                                        >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    </div>
                                </div>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
              <label className="form-label" htmlFor="contact_number">
                Contact #
              </label>
              <div className="form-control-wrap">
                <input
                defaultValue={profile.contact_number}
                  type="text"
                  id="contact_number"
                  {...register('contact_number', { required: true })}
                  placeholder="Enter your #"
                  className="form-control-lg form-control" />
                {errors.contact_number && <p className="invalid">This field is required</p>}
              </div>
            </div>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                    
            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <div className="form-control-wrap">
                <input
                defaultValue={profile.address}
                  type="text"
                  id="address"
                  {...register('address', { required: true })}
                  placeholder="Enter your sex"
                  className="form-control-lg form-control" />
                {errors.address && <p className="invalid">This field is required</p>}
              </div>
            </div>

                                </Col>
            
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
              <label className="form-label" htmlFor="company">
                Company
              </label>
              <div className="form-control-wrap">
                <input
                defaultValue={profile.company}
                  type="text"
                  id="company"
                  {...register('company', { required: true })}
                  placeholder="Enter your company"
                  className="form-control-lg form-control" />
                {errors.company && <p className="invalid">This field is required</p>}
              </div>
            </div>

                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
              <label className="form-label" htmlFor="position">
                Position
              </label>
              <div className="form-control-wrap">
                <input
                defaultValue={profile.position}
                  type="text"
                  id="position"
                  {...register('position', { required: true })}
                  placeholder="Enter your position"
                  className="form-control-lg form-control" />
                {errors.position && <p className="invalid">This field is required</p>}
              </div>
            </div>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
              <label className="form-label" htmlFor="birthdate">
                Birthdate
              </label>
              <div className="form-control-wrap">
                <input
                defaultValue={profile.birthdate}
                  type="date"
                  id="birthdate"
                  {...register('birthdate', { required: true })}
                  placeholder="Enter your birthdate"
                  className="form-control-lg form-control" />
                {errors.birthdate && <p className="invalid">This field is required</p>}
              </div>
            </div> 
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email or Username
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                defaultValue={user.email}
                  type="email"
                  bssize="lg"
                  id="default-01"
                  {...register('email', { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address or username" />
                {errors.email && <p className="invalid">This field is required</p>}
              </div>
            </div>
                                </Col>

                            </div>
                            <Col xs="3" sm="3" md="3" lg="3" xl="3">
                <div className="form-group mt-2">
                    <Button type="submit" color="primary" size="sm" >
                        {loading ? <Spinner size="sm" color="light" /> : "Update"}
                    </Button>
                </div>
                </Col>
                        </CardBody>
                    </Card>
                </Col>
                </div>
             
           </form>
           

<Row className="mt-2">
    <Col xs="12" sm="12" md="12" lg="12" xl="12">
        <Card className="card-bordered">
            <CardBody className="card-inner">
                <h5 className="mb-3">Change Password</h5>
                {errorVal && (
                    <div className="mb-3">
                        <Alert color="danger" className="alert-icon">
                            <Icon name="alert-circle" />
                            {errorVal}
                        </Alert>
                    </div>
                )}
                <form onSubmit={handleSubmit(handlePasswordChange)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="old_password">
                            Old Password
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="password"
                                id="old_password"
                                {...register('old_password', { required: true })}
                                placeholder="Enter your old password"
                                className="form-control-lg form-control"
                            />
                            {errors.old_password && <p className="invalid">This field is required</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="new_password">
                            New Password
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="password"
                                id="new_password"
                                {...register('new_password', { required: true })}
                                placeholder="Enter your new password"
                                className="form-control-lg form-control"
                            />
                            {errors.new_password && <p className="invalid">This field is required</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirm_new_password">
                            Confirm New Password
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="password"
                                id="confirm_new_password"
                                {...register('confirm_new_password', { required: true })}
                                placeholder="Confirm your new password"
                                className="form-control-lg form-control"
                            />
                            {errors.confirm_new_password && <p className="invalid">This field is required</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <Button type="submit" color="primary" size="sm">
                            {loading2 ? <Spinner size="sm" color="light" /> : "Change Password"}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    </Col>
</Row>


        </Block>
      </Content>
    </>
  );
};

export default Profile;
