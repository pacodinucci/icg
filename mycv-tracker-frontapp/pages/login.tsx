import React, { useState } from "react";
import type { NextPage } from "next";
import { Col, Container, Card, CardTitle, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import Link from "next/link";

const Login: NextPage = () => {
  const [details, setDetails] = useState({ email: "", password: "" });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Container>
      <Col md={6} className="my-5">
        <Card body className="text-center">
          <CardTitle tag="h2">Sign In to MyCVTracker</CardTitle>
          <CardBody>
            <Link href="/register">New to MyCVTracker? Sign up!</Link>
            <Form className="my-4">
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
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
