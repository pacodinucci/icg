import Link from "next/link";
import React from "react";
import { Container, Row, Card, Breadcrumb, BreadcrumbItem, CardBody, Col } from "reactstrap";
import { useUserState } from "../hooks/useUserState";

const Account = () => {
  const { user } = useUserState();

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Profile</h6>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <p className="text-center fs-2 my-3">
          Welcome <strong>{user?.email}</strong>
        </p>
      </Row>
      <Row className="my-2">
        <Col>
          <Card>
            <CardBody>
              <Link href="/assign-interview">Assign Interview</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Card>
            <CardBody>
              <Link href="/get-results">Get Results</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Card>
            <CardBody>
              <Link href="/responses">Responses</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
