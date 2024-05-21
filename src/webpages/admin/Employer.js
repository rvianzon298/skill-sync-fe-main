import React from "react";
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
} from "../../components/Component";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";

const Employer = ({ ...props }) => {
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Employers</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable
              data={userData}
              columns={dataTableColumns2}
              pagination
              className="nk-tb-list"
              selectableRows
            />
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default Employer;
