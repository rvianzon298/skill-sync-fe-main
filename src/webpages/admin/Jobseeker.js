import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
} from "../../components/Component";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
import JobSeekerModal from "./JobSeekerModal";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
  } from "reactstrap";

const Jobseeker = ({ ...props }) => {
  // State to hold the job seekers data
  const [jobSeekers, setJobSeekers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  // State to hold the currently selected job seeker
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);

  // Function to handle opening the modal
  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedJobSeeker(null);
    setModalOpen(false);
  };

  // Effect hook to fetch job seekers data when the component mounts
  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Function to fetch job seekers data from the server
  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobseekers`);
      setJobSeekers(response.data.data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
    }
  };

  return (
    <>
      <Head title="Job Seekers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Job Seekers</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Middle Name</th>
                  <th>Action</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {jobSeekers.map(jobSeeker => (
                  <tr key={jobSeeker.id}>
                    <td>{jobSeeker.id}</td>
                    <td>{jobSeeker.first_name}</td>
                    <td>{jobSeeker.last_name}</td>
                    <td>{jobSeeker.middle_name}</td>
                    <td>
                        <Button color="primary" onClick={() => openModal(jobSeeker)}>View</Button>
                    </td>
                    {/* Add more columns if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
            <ModalHeader toggle={() => setModalOpen(false)}>Job Seeker Details</ModalHeader>
            <ModalBody>
                {/* Display job seeker details here */}
                {selectedJobSeeker && (
                <>
                    <p>User ID: {selectedJobSeeker.id}</p>
                    <p>First Name: {selectedJobSeeker.first_name}</p>
                    <p>Last Name: {selectedJobSeeker.last_name}</p>
                    <p>Middle Name: {selectedJobSeeker.middle_name}</p>
                    <p>Extension Name:
                        {selectedJobSeeker.extension_name}
                    </p>
                    <p>
                        Sex: {selectedJobSeeker.sex}
                    </p>
                    <p>
                    Birthdate: {selectedJobSeeker.birthdate}
                    </p>
                    <p>
                    Address: {selectedJobSeeker.address}
                    </p>
                    <p>
                    Contact Number: {selectedJobSeeker.contact_number}
                    </p>

                    <br/>

                    <a href={`http://skill-sync-be.test/${selectedJobSeeker.resume}`} target="_blank" rel="noreferrer noopener">View Resume</a>

                </>
                )}
                {/* Add more details if needed */}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
            </ModalFooter>
            </Modal>
        </Block>
      </Content>
    </>
  );
};

export default Jobseeker;
