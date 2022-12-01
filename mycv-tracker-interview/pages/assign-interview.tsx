import React, { useState, useCallback } from "react";

import { Container, Button, TextInput, NumberInput, MultiSelect, Title } from "@mantine/core";
import { sendAssignInterview } from "../apis/mycvtracker";
import { sendRemiderRequest } from "../apis/mycvtracker/assign-interview";
import { InterviewTopics } from "../data/interview";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { alerts } from "../utils/alert-utils";
import { useForm } from "@mantine/form";

const AssignInterviewPage = () => {
  const { token } = useUserState();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const details = useForm({
    initialValues: {
      candidateName: "",
      invite: "",
      resultOwners: "",
      candidateEmail: "",
      interviewType: [],
      noOfQuestions: "",
      jobLink: "",
      candidateList: "",
    },
    validate: {
      candidateEmail: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Candidate Email"),
      resultOwners: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Owner Email"),
      candidateName: (value) => (value.length <= 1 ? "Candidate name cannot be empty" : null),
      jobLink: (value) => (value.length < 4 ? "Invalid Job Link" : null),
      interviewType: (value) => (value.length < 1 ? "Select atleast 1 topic" : null),
    },
  });

  type FormType = typeof details.values;
  const handleFormSubmit = useCallback(
    async (values: FormType) => {
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

  const handleSendReminder = useCallback(
    async (values: FormType) => {
      try {
        setIsLoading(true);
        await sendRemiderRequest({ ...values, interviewType: values.interviewType.join("_") }, token);
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
    <Container>
      <Title order={1}>Assign Interview</Title>
      <form onSubmit={details.onSubmit(handleFormSubmit)}>
        <TextInput
          placeholder="Candidate Name"
          label="Candidate Name"
          withAsterisk
          {...details.getInputProps("candidateName")}
        />
        <TextInput
          placeholder="Result Owners"
          label="Result Owners"
          withAsterisk
          {...details.getInputProps("resultOwners")}
        />
        <TextInput
          placeholder="Candidate Email"
          label="Candidate Email"
          withAsterisk
          {...details.getInputProps("candidateEmail")}
        />

        <MultiSelect
          data={InterviewTopics}
          label="Interview Topics"
          placeholder="Select atleast 1 topic"
          withAsterisk
          {...details.getInputProps("interviewType")}
        />

        <NumberInput
          defaultValue={10}
          label="Number of Question"
          withAsterisk
          {...details.getInputProps("noOfQuestions")}
        />
        <TextInput placeholder="Job Link" label="Job Link" withAsterisk {...details.getInputProps("jobLink")} />

        <Button type="submit" variant="filled" my="xs" disabled={isLoading} loading={isLoading}>
          Assign Interview
        </Button>
        <Button
          type="button"
          variant="light"
          m="xs"
          onClick={() => details.onSubmit(handleSendReminder)()}
          disabled={isLoading}
          loading={isLoading}
        >
          Send Reminder Interview
        </Button>
      </form>
    </Container>
  );
};

export default AssignInterviewPage;
