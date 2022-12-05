import React, { useCallback } from "react";
import { Container, Button, Title, Paper, Textarea } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useUserState } from "../hooks/useUserState";

const QuestionAdd = () => {
  const { token } = useUserState();
  const details = useForm({
    initialValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: "",
      questionType: "",
    },
    validate: {
      question: (value) => (value.length < 1 ? "Qustion cannot be empty" : null),
      // correct: (value) => value.length < 1 ? "Qustion cannot be empty" : null,
      questionType: (value) => (value.length < 1 ? "Qustion Type cannot be empty" : null),
    },
  });
  type FormType = typeof details.values;
  const handleAddQuestion = useCallback((values: FormType) => {}, [token]);

  return (
    <Container>
      <Title order={1}>Assign Interview</Title>
      <Paper p="md" my="md">
        <form onSubmit={details.onSubmit(handleAddQuestion)}>
          <Textarea placeholder="Question" label="Question" withAsterisk {...details.getInputProps("question")} />
          <Textarea placeholder="Option 1" label="Option 1" withAsterisk {...details.getInputProps("option1")} />
          <Textarea placeholder="Option 2" label="Option 2" withAsterisk {...details.getInputProps("option2")} />
          <Textarea placeholder="Option 3" label="Option 3" withAsterisk {...details.getInputProps("option3")} />
          <Textarea placeholder="Option 4" label="Option 4" withAsterisk {...details.getInputProps("option4")} />
          <Textarea placeholder="Correct" label="Correct" withAsterisk {...details.getInputProps("correct")} />
          <Textarea
            placeholder="Question Type"
            label="Question Type"
            withAsterisk
            {...details.getInputProps("questionType")}
          />
          <Button type="submit" my="md">
            Add Question
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default QuestionAdd;
