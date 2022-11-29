import Link from "next/link";
import React, { useState, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Col,
} from "reactstrap";
import { sendGetCandidateResult } from "../apis/mycvtracker";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { CandidateResultRequest } from "../types/assignInterview_types";
import { alerts } from "../utils/alert-utils";

type InputValuesError = {
  candidateName: string;
  candidate: string;
  jobLink: string;
  token: string;
};

const GetResults = () => {
  const { token } = useUserState();
  const { showErrorToast, showSuccessToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<CandidateResultRequest>({
    candidate: "",
    candidateEmail: "",
    candidateList: "",
    candidateName: "",
    interviewType: "",
    invite: "",
    jobLink: "",
    resultOwners: "",
    token: "",
  });

  const [errors, setErrors] = useState<InputValuesError>({
    candidateName: "",
    candidate: "",
    token: "",
    jobLink: "",
  });

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }, []);

  const handleFormSubmit = useCallback(
    async (values: CandidateResultRequest, e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      let hasError = false;
      if (values.candidate.length <= 5) {
        setErrors((prev) => ({ ...prev, candidate: "Invalid Candidate Email" }));
        hasError = true;
      }
      //   if (values.candidateName.length <= 0) {
      //     setErrors((prev) => ({ ...prev, candidateName: "Candidate Name cannot be empty" }));
      //     hasError = true;
      //   }

      if (values.token.length <= 4) {
        setErrors((prev) => ({ ...prev, token: "Invalid Token" }));
        hasError = true;
      }

      if (hasError) return;
      try {
        setIsLoading(true);
        await sendGetCandidateResult(values, token);
        showSuccessToast("Your Request has been submitted");
      } catch (e: any) {
        console.log(e);
        if (alerts[e.response.status]) showErrorToast(alerts[e.response.status].message);
        else showErrorToast("Encountered Some Error");
      } finally {
        setIsLoading(false);
      }
    },
    [token, showErrorToast, showSuccessToast]
  );

  return (
    <Container className="py-5">
      <Row>
        <p className="fs-1 my-3">Get Interview Results</p>
      </Row>
      <Row className="fs-4">
        <Col>
          <Card>
            <CardBody>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Get Results</BreadcrumbItem>
              </Breadcrumb>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Form onSubmit={(e) => handleFormSubmit(values, e)}>
        <FormGroup className="my-3">
          <Label for="candidate">Candidate Email</Label>
          <Input
            name="candidate"
            id="candidate"
            type="email"
            onChange={handleChangeInput}
            value={values.candidate}
            invalid={errors.candidate.length > 2}
          />
          <FormFeedback>{errors.candidate}</FormFeedback>
        </FormGroup>
        <FormGroup className="my-3">
          <Label for="token">Token</Label>
          <Input
            name="token"
            id="token"
            type="text"
            onChange={handleChangeInput}
            value={values.token}
            invalid={errors.token.length > 2}
          />
          <FormFeedback>{errors.token}</FormFeedback>
        </FormGroup>

        <FormGroup className="my-3">
          <Label for="candidateName">Candidate Name</Label>
          <Input
            name="candidateName"
            id="candidateName"
            type="text"
            onChange={handleChangeInput}
            value={values.candidateName}
            invalid={errors.candidateName.length > 2}
          />
          <FormFeedback>{errors.candidateName}</FormFeedback>
        </FormGroup>

        <FormGroup className="my-3">
          <Label for="jobLink">job Link</Label>
          <Input
            name="jobLink"
            id="jobLink"
            type="text"
            onChange={handleChangeInput}
            value={values.jobLink}
            invalid={errors.jobLink.length > 2}
          />
          <FormFeedback>{errors.jobLink}</FormFeedback>
        </FormGroup>

        <Button type="submit" color="primary" disabled={isLoading}>
          Get Interview Results
        </Button>
      </Form>
    </Container>
  );
};

export default GetResults;
