import Link from "next/link";
import React from "react";
import { Container, Row, Card, Breadcrumb, BreadcrumbItem, CardBody } from "reactstrap";
import { useUserState } from "../hooks/useUserState";

const Account = () => {
  const { user } = useUserState();

  return (
    <Container className="fs-4 p-5">
      <Row>
        <h6 className="fs-1 my-3">Profile</h6>
      </Row>
      <Row>
        <Card>
          <CardBody>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/account">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Profile</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <p className="text-center fs-2 my-3">
          Welcome <strong>{user?.email}</strong>
        </p>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link href="/notes">My Notes</Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link href="/resumes">Resume Management</Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link href="/referral">Referral</Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link href="/notifications">Notifications</Link>
          </CardBody>
        </Card>
      </Row>
      <Row className="my-2">
        <Card>
          <CardBody>
            <Link href="/settings">Settings</Link>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default Account;
