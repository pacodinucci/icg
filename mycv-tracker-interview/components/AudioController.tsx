import { Alert, Button, Flex, Loader, RingProgress, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { FaCircle } from "react-icons/fa";
import PrevResponse from "./PrevResponse";

type Props = {
  timeLeft: number;
  operation: "startInterview" | "loading" | "recording" | "countdown" | "stopped";
  totalQuestions: number;
  currectQuestion: number;
  isUploading: boolean;
  startInterview: () => void;
  stopRecording: () => void;
  skipQuestion: () => void;
  uploadAnswer: () => void;
  blob: Blob | null;
};

const AudioController = ({
  timeLeft,
  operation,
  blob,
  startInterview,
  stopRecording,
  skipQuestion,
  uploadAnswer,
  isUploading,
}: Props) => {
  const media = useMediaQuery("(max-width: 767px)");

  if (operation === "startInterview") {
    return (
      <Flex align="center" justify="center" style={{ height: 85 }}>
        <Button onClick={startInterview} color="green">
          Start Insterview
        </Button>
      </Flex>
    );
  }

  if (operation === "loading") {
    return (
      <Flex align="center" justify="space-between" style={{ height: 85 }}>
        <Title order={3}>Loading Questions..</Title>
        <Loader size={70} />
      </Flex>
    );
  }

  if (operation === "countdown") {
    return (
      <Flex align="center" justify="space-between" style={{ height: 85 }}>
        <div>
          <Title order={3}>Recoding Startes in.</Title>
        </div>
        <RingProgress
          size={85}
          sections={[{ value: (timeLeft / 5) * 100, color: "yellow" }]}
          label={
            <Text align="center" size="md">
              {timeLeft} sec
            </Text>
          }
        />
      </Flex>
    );
  }

  if (operation === "stopped") {
    return (
      <Flex align="center" justify="flex-start" style={{ height: 85 }}>
        {blob && (
          <PrevResponse
            source={blob ? URL.createObjectURL(blob) : ""}
            compact={true}
            style={{ width: "100%", maxWidth: 300 }}
          />
        )}
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", xs: "row" }}
          gap={{ base: 2, sm: "lg" }}
        >
          <Button onClick={skipQuestion} disabled={isUploading} compact={media}>
            Skip Question
          </Button>
          <Button onClick={uploadAnswer} disabled={isUploading} compact={media}>
            {isUploading ? "Uploading..." : "Upload Answer"}
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="space-between" style={{ height: 85 }}>
      <Flex
        align={{ base: "flex-start", sm: "center" }}
        direction={{ base: "column", sm: "row" }}
        gap={media ? "sm" : "md"}
      >
        <Alert icon={<FaCircle />} color="red" py={media ? 0 : "sm"} my="sm">
          Recording Started
        </Alert>
        <Flex direction={"row"} gap={media ? "sm" : "md"}>
          <Button onClick={skipQuestion} compact={media} color="yellow">
            Skip Question
          </Button>
          <Button onClick={stopRecording} compact={media} color="red">
            Stop Recording
          </Button>
        </Flex>
      </Flex>
      <RingProgress
        size={media ? 80 : 100}
        sections={[{ value: (timeLeft / 60) * 100, color: timeLeft < 10 ? "red" : "blue" }]}
        label={
          <Text align="center" size={media ? "sm" : "md"}>
            {timeLeft} sec
          </Text>
        }
      />
    </Flex>
  );
};

export default AudioController;
