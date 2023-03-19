import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getMyResumes } from "../apis/mycvtracker/resume";
import ResumeCard from "../components/ResumeCard";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import styles from "../styles/Account.module.css";
import { Resume } from "../types/resume_types";
import { alerts } from "../utils/alert-utils";
import ViewPartySharingModal from "../components/ViewPartySharingModal";
import PagerWithoutNumber from "../components/PagerWithoutNumber";


const DEFAULT_PAGE_SIZE = 10;


const ResumesList = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const { token } = useUserState();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [pagination, setPagination] = useState({
    totalpages: 1,
    currentPage: 1,
  });

  const [openSharingResume, setOpenSharingResume] = useState(false);
  const [choosenResumeId, setChooseResumeId] = useState(0);

  const toggleOpenSharingResume = useCallback((referralId: number) => {
    setChooseResumeId(referralId || 0);
    setOpenSharingResume((prev) => !prev);
  }, []);


  const getResumeList = useCallback(
    async (pageNumber: number, pageSize = DEFAULT_PAGE_SIZE) => {
      if (!token) return;

      try {
        const response = await getMyResumes(pageNumber, pageSize, token);
        if (response) {
          console.log(response);
          setResumes(response);
          setPagination({ totalpages: 10, currentPage: pageNumber });
        }
      } catch (e: any) {
        console.log(e);
        if (e.response?.status)
          showErrorToast(alerts[e?.response.status].message);
        else showErrorToast("Encounted an error, please try again later");
      }
    },
    [showErrorToast, token]
  );
  useEffect(() => {
    getResumeList(1, DEFAULT_PAGE_SIZE);
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
          return (
            <Col key={resume.id} md="6">
              <ResumeCard
                toggleSharingResumeModal={toggleOpenSharingResume}
                key={idx}
                resume={resume}
              />
            </Col>
          );
        })}
        <ViewPartySharingModal
          isOpen={openSharingResume}
          onDismiss={toggleOpenSharingResume}
          selectedId={choosenResumeId}
        />
      </Container>
      <Row>
        <Col className="d-flex justify-content-end mx-3 my-1" >
          <PagerWithoutNumber
            onClickItem={getResumeList}
            current={pagination.currentPage}
            total={pagination.totalpages}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ResumesList;
