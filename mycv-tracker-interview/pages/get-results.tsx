import Link from "next/link";
import React, { useState, useCallback } from "react";

import { Container, Button, TextInput, Paper, Title } from "@mantine/core";

import { sendGetCandidateResult } from "../apis/mycvtracker";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { CandidateResultRequest } from "../types/assignInterview_types";
import { alerts } from "../utils/alert-utils";
import { useForm } from "@mantine/form";

type InputValuesError = {
  candidateName: string;
  candidate: string;
  jobLink: string;
  token: string;
};

const GetResults = () => {
  const details = useForm({
    initialValues: {
      candidate: "",
      candidateEmail: "",
      candidateList: "",
      candidateName: "",
      interviewType: "",
      invite: "",
      jobLink: "",
      resultOwners: "",
      token: "",
    },
    validate: {
      candidate: (value) => (value.length < 5 ? "Invalid Candidate Email" : null),
      token: (value) => (value.length < 5 ? "Invalid Token" : null),
    },
  });

  const { token } = useUserState();
  const { showErrorToast, showSuccessToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback(
    async (values: CandidateResultRequest) => {
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
    <Container>
      <Title order={1}>Get Interview Results</Title>

      <Paper p="md" my="md">
        <form onSubmit={details.onSubmit(handleFormSubmit)}>
          <TextInput
            placeholder="johndoe@email.com"
            label="Candidate Email"
            withAsterisk
            {...details.getInputProps("candidate")}
          />
          <TextInput placeholder="token" label="Token" {...details.getInputProps("token")} withAsterisk />
          <TextInput placeholder="John Doe" label="Candidate Name" {...details.getInputProps("candidateName")} />
          <TextInput placeholder="https://mycvtracker.com" label="Job Link" {...details.getInputProps("lobLink")} />
          <Button type="submit" disabled={isLoading} mt="lg">
            Get Interview Results
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default GetResults;
