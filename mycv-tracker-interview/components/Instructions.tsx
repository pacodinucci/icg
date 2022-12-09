import { Box, Highlight, List, Stack, Title } from "@mantine/core";
import React from "react";

const Instructions = () => {
  return (
    <Box p="sm">
      <Title>Instuctions</Title>
      <Stack spacing="md">
        <Highlight highlight={"60 seconds"}>
          You have 60 seconds to answer each question, Please ensure access to your microphone is enabled to confirm
          that your response will be recorded.
        </Highlight>
        <p>
          Use the demo question to practice your response, and get more comfortable with the method of the audio
          interview.
        </p>
        <p>
          You can playback your recording to determine if you are satisfied with the audio, and then ensure you upload
          your answer to the server to confirm your answer before moving to next Question.
        </p>
        <p>Please note you need to record answer and submit answer at each question before moving to next question.</p>
        <p>Recording Starts automatically, a 5 second cooldown is given, before recording starts</p>
        <p>Continue this process until you have answered all the questions!</p>
      </Stack>
    </Box>
  );
};

export default Instructions;
