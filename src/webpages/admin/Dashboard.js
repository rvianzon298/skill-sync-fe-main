import React , { useState,useEffect  }from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    BlockDes,
    BackTo,
    PreviewCard,
    ReactDataTable,
    Row,
    Col,
    PreviewAltCard,
    TooltipComponent,
  } from "../../components/Component";
  import Icon from "../../components/icon/Icon";
  import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../../components/partials/charts/invest/InvestChart";
  import InvestOverview from "../../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../../components/partials/default/recent-activity/Activity";
import Notifications from "../../components/partials/default/notification/Notification";

import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL  } from "../axios/auth";

const Dashboard = ({ ...props }) => {
    const [jobCount, setJobCount] = useState(0);
    const [jobSeekerCount, setJobSeekerCount] = useState(0);
    useEffect(() => {
        // Fetch jobs data when the component mounts
        // fetchJobs();

        var data = axios.get(`${BASE_URL}/metrics`).then((response) => {
            console.log(response.data);
            setJobCount(response.data.data.job_count);
            setJobSeekerCount(response.data.data.jobseeker_count);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
  return (
    <>
      <Head title="Blank Page" />
      <Content>
      <Block>
          <Row className="g-gs">
            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">No. of Job seekers</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-deposit"
                      text="No. of Job seekers"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{"font-size": '50px'}}>
                    {jobSeekerCount}
                    <Icon name="users" className="mx-2"></Icon>
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">No. of Jobs</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-deposit"
                      text="No. of Jobs"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{"font-size": '50px'}}>
                    {jobCount}
                    <Icon name="briefcase" className="mx-2"></Icon>
                  </span>
                </div>
              </PreviewAltCard>
            </Col>
          </Row>
          </Block>
      </Content>
    </>
  );
};

export default Dashboard;
