import { ActionIcon, Autocomplete, Container, Loader, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useCallback, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { GetQuestionsList } from "../apis/mycvtracker/questions";
import QuestionCard from "../components/QuestionCard";
import { InterviewTopics } from "../data/interview";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import { Question } from "../types/question_types";
import { alerts } from "../utils/alert-utils";

const QuestionData = () => {
  const { showErrorToast } = useToast();
  const theme = useMantineTheme();
  const { token } = useUserState();
  const [responses, setResponses] = useState({ loading: false, questions: [] as Question[] });
  const details = useForm({
    initialValues: {
      type: "",
    },
    validate: {
      type: (value) => (value.length < 1 ? "Please enter a valid type" : null),
    },
  });
  const fetchQuestion = useCallback(
    async ({ type }: { type: string }) => {
      const existing = InterviewTopics.find((t) => t.label.toLowerCase() === type.toLowerCase());
      try {
        if (existing) type = existing.value.split("0").join("");
        setResponses((prev) => ({ ...prev, loading: true }));
        const questions = await GetQuestionsList(token, type);
        setResponses({ questions, loading: false });
      } catch (e: any) {
        if (alerts[e.response.status]) showErrorToast(alerts[e.response.status].message);
        else showErrorToast("Encountered Some Error");
        setResponses((prev) => ({ ...prev, loading: false }));
      }
    },
    [token, showErrorToast]
  );

  const deleteQuestion = useCallback((id: number) => {
    setResponses((prev) => ({ ...prev, questions: prev.questions.filter((q) => q.id !== id) }));
  }, []);

  return (
    <Container>
      <Title order={1}>Question Data</Title>
      <form onSubmit={details.onSubmit(fetchQuestion)}>
        <Autocomplete
          disabled={responses.loading}
          radius="xl"
          size="md"
          my="md"
          data={InterviewTopics.map((t) => t.label)}
          {...details.getInputProps("type")}
          icon={<FaSearch size={18} />}
          rightSection={
            responses.loading ? (
              <Loader />
            ) : (
              <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" type="submit">
                <FaArrowRight />
              </ActionIcon>
            )
          }
        />
      </form>
      {responses.questions.map((question) => (
        <QuestionCard question={question} key={question.id} onDelete={deleteQuestion} />
      ))}
    </Container>
  );
};

export default QuestionData;
