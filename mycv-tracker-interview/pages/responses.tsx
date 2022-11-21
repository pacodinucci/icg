import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Input, Button, Row, Col, Alert, Form, FormGroup } from "reactstrap";
import { getInterviewResponses } from "../apis/mycvtracker";
import PrevResponse from "../components/PrevResponse";
import { AudioResponse } from "../types/audioResponse_types";

const Responses = () => {
  const router = useRouter();
  const [responses, setResponses] = useState<{ data: AudioResponse[]; loading: boolean }>({ data: [], loading: false });

  const [token, setToken] = useState("");

  const fetchResponse = useCallback(async (_token: string) => {
    try {
      setResponses((prev) => ({ ...prev, loading: true }));
      const response = await getInterviewResponses(_token);
      setResponses({ data: response.data, loading: false });
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (router.query.token) {
      if (!Array.isArray(router.query.token)) {
        setToken(router.query.token);
        fetchResponse(router.query.token);
      }
    }
  }, [router, fetchResponse]);

  return (
    <Container>
      <p className="fs-1">Interview Responses</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetchResponse(token);
        }}
      >
        <FormGroup row>
          <Col sm={10}>
            <Input value={token} onChange={(e) => setToken(e.target.value)} disabled={responses.loading} />
          </Col>
          <Col className="d-grid">
            <Button color="primary" type="submit" disabled={responses.loading} onClick={() => fetchResponse(token)}>
              Search
            </Button>
          </Col>
        </FormGroup>
      </Form>
      {responses.loading && <p>Loading</p>}
      {!responses.loading && responses.data.length === 0 && (
        <Row className="my-3">
          <Alert color="warning">Wrong token or no response</Alert>
        </Row>
      )}
      {!responses.loading &&
        responses.data.length > 0 &&
        responses.data.map((response) => <PrevResponse data={response} key={response.questionId} />)}
    </Container>
  );
};

export default Responses;
