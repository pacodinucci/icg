import React, { useState } from "react";
import type { NextPage } from "next";
import { Col, Container, Card, CardTitle, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import Link from "next/link";

const Register: NextPage = () => {
  const [details, setDetails] = useState({ email: "", password: "", firstName: "", lastName: "" });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Container>
      <Col md={6} className="my-5">
        <Card body className="text-center">
          <CardTitle tag="h2">Sign Up to MyCVTracker</CardTitle>
          <CardBody>
            <Link href="/login">Already have a MyCVTracker account? Sign in!</Link>
            <Form className="my-4">
              <FormGroup row>
                <Label for="firstName" sm={2}>
                  First Name
                </Label>
                <Col sm={10}>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={details.firstName}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="lastName" sm={2}>
                  Last Name
                </Label>
                <Col sm={10}>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="lastName"
                    type="text"
                    value={details.lastName}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="email" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={details.email}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>
                  password
                </Label>
                <Col sm={10}>
                  <Input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    value={details.password}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;
