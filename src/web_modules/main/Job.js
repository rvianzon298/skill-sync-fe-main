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
    DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge
  } from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL  } from "../axios/auth";
import ApiService from '../base/axios';
const Job = ({ ...props }) => {
    // const BASE_URL = "http://skill-sync-api.test/api";
    const [viewModal, setViewModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userCanSubmit, setUserCanSubmit] = useState(false);

    const handleView = (row) => {
        // Set the selected job data
        setSelectedJob(row);

        // Open the view modal
        setViewModal(true);

        // console.log(row.job_already_applied);
        // console.log(localStorage);
        let userApplied = row.job_already_applied;

        setUserCanSubmit(!userApplied);
    };
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const [origJobs, setOrigJobs] = useState([]);
    const [jobs, setJobs] = useState([]); // Set the jobs state to an empty array [
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken');
    const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
        job_category: "",
      });
    const handleSubmitResume = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            formData.append('job_id', selectedJob.id);
            // check if file is empty
            if(selectedFile == null){
                alert('No file selected');
                return;
            }

            apiService.submitApplication(formData) .then((response) => {
                fetchJobs();
              })
              .catch((error) => {
                  // Handle errors
                  console.error('Error deleting job', error);
              });

              setViewModal(false);

            // axios.post(`${BASE_URL}/submit-application`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            // .then((response) => {
            //     console.log('Resume submitted successfully:', response.data);
            //     // Add your logic after successful submission, such as displaying a confirmation message
            // })
            // .catch((error) => {
            //     console.error('Error submitting resume:', error);
            //     // Add your error handling logic here, such as displaying an error message to the user
            // });

        } else {
            console.error('No file selected.');
            // Add your logic for handling the case when no file is selected
        }
    };
  const toggle = () => setModal(!modal);
  var columns = [
    {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
    },
    {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
        hide: 370,
    },
    {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
        hide: "sm",
    },
    {
        name: "Salary",
        selector: (row) => row.salary,
        sortable: true,
        hide: "sm",
    },
    {
        name: "Requirements",
        selector: (row) => row.requirements,
        sortable: true,
        hide: "md",
    },
    {
        name: "Actions",
        cell: (row) => (
            <div>
                 <Button color="info" size="sm" className="me-1" onClick={() => handleEdit(row)}>Edit</Button>
                <Button color="danger" size="sm" onClick={() => handleDelete(row)}>Delete</Button>
            </div>
        ),
    },
];

if (localStorage.getItem("role") != "Employer") {
    columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
            hide: 370,
        },
        {
            name: "Location",
            selector: (row) => row.location,
            sortable: true,
            hide: "sm",
        },
        {
            name: "Salary",
            selector: (row) => row.salary,
            sortable: true,
            hide: "sm",
        },
        {
            name: "Requirements",
            selector: (row) => row.requirements,
            sortable: true,
            hide: "md",
        },
    ];
}
    const handleDelete = (row) => {
        // Implement the logic for deleting a job
        console.log('Deleting job:', row);

        // Add your delete logic using the job id, for example
        const jobIdToDelete = row.id;
        apiService.deleteJob(jobIdToDelete)
            .then((response) => {
              fetchJobs();
            })
            .catch((error) => {
                // Handle errors
                console.error('Error deleting job', error);
            });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    // Call the function

    const handleFormSubmit = () => {
        apiService.createJob(formData)
            .then((response) => {
                console.log('Job created successfully', response.data);
                setModal(false);
                fetchJobs();
            })
            .catch((error) => {
                console.error('Error creating job', error);
            });
    };


    const [editModal, setEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        title: '',
        description: '',
        location: '',
        salary: '',
        requirements: '',
        job_category: '',
    });

    const handleEdit = (row) => {
        // Set the edit form data based on the selected job
        setEditFormData({
            id: row.id,
            title: row.title,
            description: row.description,
            location: row.location,
            salary: row.salary,
            requirements: row.requirements,
            job_category: row.category_id,
        });

        // Open the edit modal
        setEditModal(true);
    };

    const handleEditFormSubmit = () => {
        apiService.updateJob(editFormData.id, editFormData)
            .then((response) => {
                console.log('Job edited successfully', response.data);
                setEditModal(false);
                fetchJobs();
            })
            .catch((error) => {
                console.error('Error editing job', error);
            });
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        console.log(e.target.value);
        console.log(e.target.value == '' || e.target.value == null)

        if(e.target.value == '' || e.target.value == null) {
          setJobs(origJobs);
        }else{
          var newData = jobs.filter((job) => {
              return job.title.toLowerCase().includes(e.target.value.toLowerCase());
          });
          setJobs(newData);
        }




    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    useEffect(() => {
        // Fetch jobs data when the component mounts
        fetchJobs();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const fetchJobs = async () => {
        var finalData = [];
        apiService.fetchJobs()
            .then((response) => {
                console.log('Jobs fetched successfully', response.data[0]);
                // for (let i = 0; i < response.data.length; i++) {
                //     finalData.push({
                //         id: response.data.data[i].id,
                //         title: response.data.data[i].title,
                //         description: response.data.data[i].description,
                //         location: response.data.data[i].location,
                //         salary: response.data.data[i].salary,
                //         requirements: response.data.data[i].requirements,
                //     });
                // }
                setJobs(response.data);
                setOrigJobs(response.data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error fetching jobs', error);
            });
    };

    console.log(jobs);
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Job Postings</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <a
                href="#more"
                className="btn btn-icon btn-trigger toggle-expand me-n1"
                onClick={(ev) => {
                  ev.preventDefault();

                }}
              >
                <Icon name="more-v"></Icon>
              </a>
              <div className="toggle-expand-content" style={{ display: "block" }}>
                <ul className="nk-block-tools g-3">
                  <li>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-right">
                        <Icon name="search"></Icon>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="default-04"
                        placeholder="Quick search by Title"
                        onChange={handleSearch}
                      />
                    </div>
                  </li>
                  <li className="nk-block-tools-opt">
                  {localStorage.getItem("role") === "Employer" ? (
                      <>
                        <Button
                          className="toggle btn-icon d-md-none"
                          color="primary"
                          onClick={toggle}
                        >
                          <Icon name="plus"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={toggle}
                        >
                          <Icon name="plus"></Icon>
                          <span>Add Job</span>
                        </Button>
                      </>
                    ) : null}

                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
          </BlockBetween>
          </BlockHead>

          <div className="row">
                {jobs.length === 0 ? <p>There are no jobs.</p> : ""}
                {jobs.map((job) => (
                    <Col key={job.id} xs="12" sm="6" md="6" lg="6" xl="6">
                        <Card className="card-bordered">
                            <CardBody className="card-inner">
                                <CardTitle tag="h5">{job.title}</CardTitle>
                                <CardSubtitle tag="h5" className="mb-2 ff-base">
                                    <Icon name={"building"}></Icon> {job.company}
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 ff-base">
                                    <Icon name={"money"}></Icon> {job.salary}
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 ff-base">
                                    <Icon name={"location"}></Icon> {job.location}
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 ff-base">
                                    <Icon name={"tags-fill"}></Icon> {job.category}
                                </CardSubtitle>
                                <CardText>{job.description}</CardText>
                                <CardLink href="javascript:void(0);" onClick={() => handleView(job)}>View</CardLink>
                                {
                                    localStorage.getItem("role") === "Employer" ? (
                                        <>
                                            <CardLink href="javascript:void(0);" onClick={() => handleEdit(job)}>Edit</CardLink>
                                            <CardLink href="javascript:void(0);" onClick={() => handleDelete(job)}>Delete</CardLink>
                                        </>
                                    ) : null
                                }

                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </div>
        </Block>
      </Content>
        {/* View Modal */}
        <Modal isOpen={viewModal} toggle={() => setViewModal(false)} size="xl">
    <ModalHeader toggle={() => setViewModal(false)}>Job Posting</ModalHeader>
    <ModalBody>
        {/* Display job details here */}
        {selectedJob && (
            <>
                <h3><Icon name={"briefcase"}></Icon>{" " + selectedJob.title}</h3>
                <p className="lead"><Icon name={"building"} style={{ marginRight: '5px' }}></Icon>{selectedJob.company}</p>
                <p className="lead"><Icon name={"tags-fill"} style={{ marginRight: '5px' }}></Icon>{selectedJob.category}</p>
                <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
                <p><strong>Description:</strong> {selectedJob.description}</p>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                   <p style={{ marginRight: '15px' }}><Icon name={"user"} style={{ marginRight: '5px' }}></Icon>{selectedJob.fullname} ({selectedJob.position})</p>
                   <p style={{ marginRight: '15px' }}><Icon name={"money"} style={{ marginRight: '5px' }}></Icon>{selectedJob.salary}</p>
                   <p style={{ marginRight: '15px' }}><Icon name={"location"} style={{ marginRight: '5px' }}></Icon>{selectedJob.location}</p>
                   <p style={{ marginRight: '15px' }}><Icon name={"telegram"} style={{ marginRight: '5px' }}></Icon>{selectedJob.contact_number}</p>
                   <p style={{ marginRight: '15px' }}><Icon name={"mail"} style={{ marginRight: '5px' }}></Icon>{selectedJob.email}</p>
               </div>
                {/* Add more details as needed */}

            </>
        )}
    </ModalBody>
    {localStorage.getItem("role") !== "Employer" ? (
    <ModalFooter>
    {userCanSubmit && (
            <>
                {/* Other job details */}
                <div className="form-group">
                    <label>Submit Resume</label>
                    <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                </div>
            </>
        )}
        {userCanSubmit ? (<Button color="primary" onClick={handleSubmitResume}>Submit Resume</Button>) : <Button color="secondary" disabled={true}> Already Applied </Button>}
        <Button color="secondary" onClick={() => setViewModal(false)}>Close</Button>
    </ModalFooter>) :   (
    <ModalFooter>
        {selectedJob && selectedJob.applications != null && <table className="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Job Seeker</th>
                    <th>Action</th>
                    {/* Add more columns if needed */}
                </tr>
            </thead>
            <tbody>
                {selectedJob.applications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.name}</td>
                        <td>
                            <a href={`http://skill-sync-be.test/${application.resume}`} target="_blank" rel="noreferrer">View Resume</a>
                        </td>
                        {/* Add more columns if needed */}
                    </tr>
                ))}
            </tbody>
        </table>}
    </ModalFooter>)}
</Modal>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              <Icon name="cross" />
            </button>
          }
        >
          Create New
        </ModalHeader>
        <ModalBody>
          {/* FORM HERE */}
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
                <label>
                    Job Category
                </label>
                <select
                    id="job_category"
                    className="form-control"
                    name="job_category"
                    value={formData.job_category} // Set default value to an empty string
                    onChange={handleInputChange}
                >
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
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="primary" onClick={handleFormSubmit}>
            Save
          </Button>
          <span className="sub-text">New Job</span>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
                <ModalHeader toggle={() => setEditModal(false)}>Edit Job</ModalHeader>
                <ModalBody>
                    {/* Edit form goes here */}
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={editFormData.location}
                                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={editFormData.salary}
                                onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Requirements</label>
                            <input
                                type="text"
                                name="requirements"
                                value={editFormData.requirements}
                                onChange={(e) => setEditFormData({ ...editFormData, requirements: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                                <label>
                                    Job Category
                                </label>
                                <select
                                    id="job_category"
                                    className="form-control"
                                    name="job_category"
                                    value={editFormData.job_category} // Set default value to an empty string
                                    onChange={(e) => setEditFormData({ ...editFormData, job_category: e.target.value })}
                                >
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
                            </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditFormSubmit}>Save</Button>
                    <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
    </>
  );
};

export default Job;
