import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, Col, Container, FormGroup, Input, Row } from "reactstrap";
import { getMyResumes } from "../apis/mycvtracker/resume";
import ResumeCard from "../components/ResumeCard";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import styles from "../styles/Account.module.css";
import { Resume } from "../types/resume_types";
import { alerts } from "../utils/alert-utils";

const ResumesList = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const { token } = useUserState();
  const [resumes, setResumes] = useState<Resume[]>([]);

  const getResumeList = useCallback(async () => {
    try {
      const response = await getMyResumes(token);
      if (response) {
        console.log(response);
        setResumes(response);
      }
    } catch (e: any) {
      console.log(e);
      showErrorToast(alerts[e.response.status].message);
    }
  }, [showErrorToast, token]);
  useEffect(() => {
    getResumeList();
  }, [getResumeList]);

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Resumes List</h6>
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
              <BreadcrumbItem active>Resumes List</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <h6 className="fs-3 my-3">Resumes</h6>
      </Row>
      <Container fluid className={styles.resumeContainer}>
        {resumes.map((resume, idx) => {
          return <ResumeCard key={idx} resume={resume} />;
        })}
      </Container>
    </Container>
  );
};

export default ResumesList;
