import React, { useState } from "react";
import type { NextPage } from "next";
import { Col, Container, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, Row } from "reactstrap";
import Link from "next/link";

import styles from "../styles/Register.module.css";

const Register: NextPage = () => {
  const [details, setDetails] = useState({ email: "", password: "", firstName: "", lastName: "", confirmPassword: "" });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Container className="p-5">
      <Col md={7} className="my-5">
        <Card body className={`text-center ${styles.box} fs-6`}>
          <CardTitle tag="h2" className="fs-1">
            Sign Up to MyCVTracker
          </CardTitle>
          <CardBody>
            <Link href="/login" className="text-decoration-none fs-4">
              Already have a MyCVTracker account? Sign in!
            </Link>
            <Form className="my-4 text-end">
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
              <FormGroup row>
                <Label for="confirmPassword" sm={2}>
                  password
                </Label>
                <Col sm={10}>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirm password"
                    type="password"
                    value={details.confirmPassword}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ offset: 2, size: 10 }} className="justify-content-between d-flex">
                  <Button outline>Sign Up</Button>
                </Col>
              </FormGroup>
              <Row>
                <Col sm={{ offset: 2, size: 10 }} className="text-start">
                  <p>
                    By Signing up you agree to our{" "}
                    <Link href="/terms" className="text-decoration-none">
                      Terms & Conditions
                    </Link>
                  </p>
                  <p>
                    After form submission, you will receive an email from info@mycvtracker.com to activate your account.
                    Please check your spam folder if it&apos;s not in your inbox in next few minutes.
                  </p>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;
