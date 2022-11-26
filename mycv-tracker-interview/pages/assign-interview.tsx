import React, { useState, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { sendAssignInterview } from "../apis/mycvtracker";
import Chip from "../components/Chip";
import { InterviewTopics } from "../data/interview";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { alerts } from "../utils/alert-utils";

type InputValues = {
  candidateName: string;
  invite: string;
  resultOwners: string;
  candidateEmail: string;
  interviewType: string[];
  noOfQuestions: string;
  jobLink: string;
};

type InputValuesError = {
  candidateName: string;
  invite: string;
  resultOwners: string;
  candidateEmail: string;
  interviewType: string;
  noOfQuestions: string;
  jobLink: string;
};

const AssignInterviewPage = () => {
  const { token } = useUserState();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<InputValues>({
    candidateName: "",
    invite: "",
    resultOwners: "",
    candidateEmail: "",
    interviewType: [],
    noOfQuestions: "10",
    jobLink: "",
  });

  const [errors, setErrors] = useState<InputValuesError>({
    candidateName: "",
    invite: "",
    resultOwners: "",
    candidateEmail: "",
    interviewType: "",
    noOfQuestions: "",
    jobLink: "",
  });

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }, []);

  const handleMultiSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      if (prev.interviewType.includes(event.target.value)) {
        return { ...prev, interviewType: prev.interviewType.filter((t) => t !== event.target.value) };
      } else {
        return { ...prev, interviewType: [...prev.interviewType, event.target.value] };
      }
    });
  }, []);

  const removeTypeFromMultiSelect = useCallback((value: string) => {
    return setValues((prev) => ({ ...prev, interviewType: prev.interviewType.filter((t) => t !== value) }));
  }, []);

  const handleFormSubmit = useCallback(
    async (values: InputValues, e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      // if ()
      let hasError = false;
      if (values.candidateEmail.length <= 5) {
        setErrors((prev) => ({ ...prev, candidateEmail: "Invalid Candidate Email" }));
        hasError = true;
      }
      if (values.resultOwners.length <= 5) {
        setErrors((prev) => ({ ...prev, resultOwners: "Invalid Result Owner Email Email" }));
        hasError = true;
      }
      if (values.candidateName.length <= 0) {
        setErrors((prev) => ({ ...prev, candidateName: "Candidate Name cannot be empty" }));
        hasError = true;
      }
      if (isNaN(parseFloat(values.noOfQuestions))) {
        setErrors((prev) => ({ ...prev, noOfQuestions: "Number of Questions should be a number" }));
        hasError = true;
      }

      if (values.jobLink.length <= 5) {
        setErrors((prev) => ({ ...prev, jobLink: "Invalid Job Link" }));
        hasError = true;
      }
      if (values.interviewType.length === 0) {
        setErrors((prev) => ({ ...prev, interviewType: "Please Select atleast 1 interview topic" }));
        hasError = true;
      }

      if (hasError) return;
      try {
        setIsLoading(true);
        await sendAssignInterview({ ...values, interviewType: values.interviewType.join("_") }, token);
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
      <Row className="fs-1">
        <p>Assign Interview</p>
      </Row>
      <Row>
        <Card>
          <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem active>Assign Interview</BreadcrumbItem>
          </Breadcrumb>
        </Card>
      </Row>
      <Form onSubmit={(e) => handleFormSubmit(values, e)}>
        <FormGroup className="my-3">
          <Label for="invite">Invite Message</Label>
          <Input
            name="invite"
            id="invite"
            type="textarea"
            onChange={handleChangeInput}
            value={values.invite}
            invalid={errors.invite.length > 2}
          />
          <FormFeedback>{errors.invite}</FormFeedback>
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
          <Label for="resultOwners">Result Owners</Label>
          <Input
            name="resultOwners"
            id="resultOwners"
            type="email"
            onChange={handleChangeInput}
            value={values.resultOwners}
            invalid={errors.resultOwners.length > 2}
          />
          <FormFeedback>{errors.resultOwners}</FormFeedback>
        </FormGroup>

        <FormGroup className="my-3">
          <Label for="candidateEmail">Candidate Email</Label>
          <Input
            name="candidateEmail"
            id="candidateEmail"
            type="email"
            onChange={handleChangeInput}
            value={values.candidateEmail}
            invalid={errors.candidateEmail.length > 2}
          />
          <FormFeedback>{errors.candidateEmail}</FormFeedback>
        </FormGroup>
        <FormGroup className="my-3">
          <Label for="interviewType">Interview Topics</Label>
          <Input
            name="interviewType"
            id="interviewType"
            type="select"
            onChange={handleMultiSelect}
            invalid={errors.interviewType.length > 2}
          >
            {[{ label: "Select A Topic", value: "select" }, ...InterviewTopics]
              .filter((t) => !values.interviewType.includes(t.value))
              .map((topic) => (
                <option value={topic.value} key={topic.value}>
                  {topic.label}
                </option>
              ))}
          </Input>
          <FormFeedback>{errors.interviewType}</FormFeedback>
          <div className="d-flex flex-row py-2">
            {values.interviewType.map((val) => (
              <Chip
                key={val}
                label={InterviewTopics.find((t) => t.value === val)?.label}
                onDismiss={() => removeTypeFromMultiSelect(val)}
              />
            ))}
          </div>
        </FormGroup>

        <FormGroup className="my-3">
          <Label for="noOfQuestions">Number of Questions</Label>
          <Input
            invalid={errors.noOfQuestions.length > 2}
            name="noOfQuestions"
            id="noOfQuestions"
            type="number"
            min="1"
            onChange={handleChangeInput}
            value={values.noOfQuestions}
          />
          <FormFeedback>{errors.noOfQuestions}</FormFeedback>
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
          Assign Interview
        </Button>
      </Form>
    </Container>
  );
};

export default AssignInterviewPage;
