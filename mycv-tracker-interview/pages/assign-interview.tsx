import React, { useState, useCallback } from "react";

import {
  Container,
  Button,
  TextInput,
  NumberInput,
  MultiSelect,
  Title,
  Paper,
  RangeSlider,
  Stack,
  Box,
  Text,
  Flex,
} from "@mantine/core";
import { sendAssignInterview } from "../apis/mycvtracker";
import { sendRemiderRequest } from "../apis/mycvtracker/assign-interview";
import { InterviewTopics } from "../data/interview";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { alerts } from "../utils/alert-utils";
import { useForm } from "@mantine/form";

type InterviewType = {
  value: string;
  level: [number, number];
};

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
      interviewType: [] as InterviewType[],
      noOfQuestions: "10",
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

  const handleMultiSelect = (e: string[]) => {
    let curr = details.values.interviewType;
    let currValues = curr.map((t) => t.value);
    curr = curr.filter((type) => e.includes(type.value));

    let newTypes = e.filter((t) => !currValues.includes(t));
    details.setFieldValue("interviewType", [
      ...curr,
      ...newTypes.map((t) => ({ value: t, level: [0, 1] as [number, number] })),
    ]);
  };

  const handleFormSubmit = useCallback(
    async (values: FormType) => {
      // return console.log(values.interviewType.map((t) => `${t.value}${t.level[0]}${t.level[1]}`).join("_"));
      try {
        setIsLoading(true);
        await sendAssignInterview(
          {
            ...values,
            interviewType: values.interviewType.map((t) => `${t.value}${t.level[0]}${t.level[1]}`).join("_"),
          },
          token
        );
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
      <Paper p="md" my="md">
        <form onSubmit={details.onSubmit(handleFormSubmit)}>
          <>
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
              value={details.values.interviewType.map((type) => type.value)}
              onChange={handleMultiSelect}
            />
            <Box my="md">
              <Text fz="sm">Difficulty Levels</Text>
              <Stack px="md">
                {details.values.interviewType.map((type, index) => (
                  <Flex
                    key={type.value + "range"}
                    align={{ base: "start", md: "center" }}
                    my="sm"
                    gap={{ base: "xs", md: "md" }}
                    direction={{ base: "column", md: "row" }}
                  >
                    <Text fz="xs" style={{ width: "40%" }}>
                      {InterviewTopics.find((t) => t.value === type.value)?.label || type.value}
                    </Text>
                    <RangeSlider
                      value={details.values.interviewType[index].level}
                      step={1}
                      minRange={1}
                      size="lg"
                      style={{ width: "100%" }}
                      max={5}
                      onChange={(e) => details.setFieldValue(`interviewType.${index}.level`, e)}
                      marks={[
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" },
                        { value: 4, label: "4" },
                        { value: 5, label: "5" },
                      ]}
                    />
                  </Flex>
                ))}
              </Stack>
            </Box>
            <NumberInput label="Number of Question" withAsterisk {...details.getInputProps("noOfQuestions")} />
            <TextInput placeholder="Job Link" label="Job Link" withAsterisk {...details.getInputProps("jobLink")} />
            <Button type="submit" variant="filled" my="sm" disabled={isLoading} loading={isLoading}>
              Assign Interview
            </Button>
            <Button
              type="button"
              variant="light"
              m="sm"
              onClick={() => details.onSubmit(handleSendReminder)()}
              disabled={isLoading}
              loading={isLoading}
            >
              Send Reminder Interview
            </Button>
          </>
        </form>
      </Paper>
    </Container>
  );
};

export default AssignInterviewPage;
