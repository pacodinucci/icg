import Link from "next/link";
import React from "react";
import { Container, Row, Card, Breadcrumb, BreadcrumbItem, CardBody } from "reactstrap";
import { useUserState } from "../hooks/useUserState";
import styles from "../styles/Account.module.css";

const Account = () => {
  const { user } = useUserState();

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Profile</h6>
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
              <BreadcrumbItem active>Profile</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <p className="text-center fs-2 my-3">
          Welcome <strong>{user?.email}</strong>
          <strong>
            <span className="fs-4">
              [ <i>{user?.userRole === "ADMIN" ? user?.userRole : ""}</i> ]
            </span>
          </strong>
        </p>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link className={styles.link} href="/notes">
              My Notes
            </Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link className={styles.link} href="/resumes">
              Resume Management
            </Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link className={styles.link} href="/referral">
              Referral
            </Link>
          </CardBody>
        </Card>
      </Row>
      {user?.userRole === "ADMIN" && (
        <>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/resumes-list">
                  Resume List
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/bulk-folder-resume">
                  Resume Folder
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/groupData">
                  Group Data
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/user-management">
                  User Management
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/CampaignNotes">
                  CV Marketing Notes
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/CvMarketing">
                  CV Marketing
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/CampaignNotifications">
                  CV Marketing Notifications
                </Link>
              </CardBody>
            </Card>
          </Row>
          <Row className="my-2">
            <Card>
              <CardBody>
                <Link className={styles.link} href="/skill-category-list">
                  Categories & skills
                </Link>
              </CardBody>
            </Card>
          </Row>
        </>
      )}
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link className={styles.link} href="/notifications">
              Notifications
            </Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link className={styles.link} href="/settings">
              Settings
            </Link>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default Account;
