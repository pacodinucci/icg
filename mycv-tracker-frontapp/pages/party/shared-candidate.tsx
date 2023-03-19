import Link from "next/link";
import React, {  useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
} from "reactstrap";

import { useToast } from "../../hooks/useToast";
import styles from "../../styles/Account.module.css";

import { useUserState } from "../../hooks/useUserState";
import { Referral } from "../../types/referral_types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useRouter } from "next/router";

const JobResumePreview = () => {
  const { showErrorToast } = useToast();
  const { token } = useUserState();
  const { query } = useRouter();
  const { height } = useWindowDimensions();




  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Resume Preview</h6>
      </Row>
      <Row>
        <Card>
          <CardBody>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link className={styles.link} href="/account">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Resume Preview</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>{/* <h6 className="fs-3 my-3">List of Referrals</h6> */}</Row>

      <Container fluid>

        <Row>
          <Card className="my-3">
          <Row className="my-4">
            <Col>
            <div className="d-flex justify-content-end mx-3">
            <Button color="primary" className="me-2" size="lg">Request Interview</Button>
              <Button color="danger" size="lg">Reject</Button>
            </div>
            </Col>
          </Row>
            <CardBody>
              <div
                style={{ height: `${height > 500 ? height - 300 : height}px` }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://mycvtracker.com/pdf-viewer.html?pdf=https://mycvtracker.com:8080/user/previewResume?token=5f69f350d771ed41731a2784d0f7ff63%26cdt=1679127862340"
                ></iframe>
              </div>
            </CardBody>
          </Card>
        </Row>




      </Container>
    </Container>
  );
};

export default JobResumePreview;
