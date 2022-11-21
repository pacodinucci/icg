import React from "react";
import { Row } from "reactstrap";
import { AudioResponse } from "../types/audioResponse_types";

type Props = {
  data: AudioResponse;
};

const PrevResponse = ({ data }: Props) => {
  return (
    <Row className="my-3">
      <p className="fs-4">{data.question}</p>
      <audio controls>
        <source
          src={`https://mycvtracker.com:8080/interviews/audioData/${data.token}/${data.questionId}`}
          type="audio/wav"
        />
      </audio>
    </Row>
  );
};

export default PrevResponse;
