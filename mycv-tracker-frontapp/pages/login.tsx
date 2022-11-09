import React, { useState } from "react";
import type { NextPage } from "next";
import { Col, Row, Container, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Link from "next/link";

import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  const [details, setDetails] = useState({ email: "", password: "" });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Container className="p-5">
      <Col md={7} className="my-5">
        <Card body className={`text-center ${styles.box} fs-6`}>
          <CardTitle tag="h2" className="fs-1">
            Sign In to MyCVTracker
          </CardTitle>
          <CardBody>
            <Link href="/register" className="text-decoration-none fs-4">
              New to MyCVTracker? Sign up!
            </Link>
            <Form className="my-4 text-end">
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
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={details.password}
                    onChange={handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row className="my-4">
                <Col sm={{ offset: 2, size: 10 }}>
                  <Input type="checkbox" id="rememberMe" name="rememberMe" />
                  <Label for="rememberMe" className=" float-start" check>
                    Remember Me
                  </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ offset: 2, size: 10 }} className="justify-content-between d-flex">
                  <Button outline>Sign In</Button>
                  <Button outline color="link">
                    Forgot password?
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
