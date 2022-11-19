import React, { useState } from "react";
import { Button, Input, Row, Col, Container } from "reactstrap";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  return (
    <Row className="bg-info bg-gradient p-5">
      <Col md={8}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Col>
      <Col md={2}>
        <Button color="dark">Submit Query</Button>
      </Col>
    </Row>
  );
};

export default NewsLetter;
