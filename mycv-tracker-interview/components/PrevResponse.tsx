import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button, Row, Col } from "reactstrap";
import { AudioResponse } from "../types/audioResponse_types";
import ReactHowler from "react-howler";

import { FaVolumeOff, FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

type Props = {
  data: AudioResponse;
};

const PrevResponse = ({ data }: Props) => {
  const player = useRef<ReactHowler | null>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(100);
  const [seek, setSeek] = useState(0);
  const [mute, setMute] = useState(false);

  const handleChangeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMute(false);
    setVolume(parseInt(e.target.value));
  }, []);
  const togglePlaySound = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const stopSound = useCallback(() => {
    if (player.current) {
      player.current.stop();
      setIsPlaying(false);
      setSeek(0);
    }
  }, [player]);

  const getSeek = useCallback(() => {
    if (player.current) {
      const val = player.current.seek();
      const dur = player.current.duration();
      setSeek((val / dur) * 100);
    }
  }, [player]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (player.current) {
      const val = (duration * parseFloat(e.target.value)) / 100;
      player.current.seek(val);
      setSeek(parseFloat(e.target.value));
    }
  };

  const onLoadComplete = useCallback(() => {
    setIsLoading(false);
    if (player.current) setDuration(player.current.duration());
  }, [player]);

  const handleToggleMute = useCallback(() => {
    setMute((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPlaying && player.current) {
      const time = setInterval(getSeek, 50);
      return () => clearInterval(time);
    }
  }, [isPlaying, player, getSeek]);

  return (
    <div>
      <Row>
        <p className="fs-4">{data.question}</p>
      </Row>
      <Row>
        <Col>
          {isLoading ? "Loading..." : `Duration: ${((duration * seek) / 100).toFixed(2)}/${duration.toFixed(2)}`}
          <input className="w-100" type="range" onChange={handleSeek} value={seek} disabled={isLoading} />
        </Col>
        <ReactHowler
          src={`https://mycvtracker.com:8080/interviews/audioData/${data.token}/${data.questionId}`}
          format={["wav"]}
          playing={isPlaying}
          onEnd={() => {
            setIsPlaying(false);
            setSeek(0);
          }}
          volume={volume / 100}
          mute={mute}
          ref={(ref) => (player.current = ref)}
          onLoad={onLoadComplete}
        />
      </Row>
      <Row>
        <Col className="d-grid" xs={6} sm={2}>
          <Button onClick={togglePlaySound} color="success" disabled={isLoading}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Col>
        <Col className="d-grid" xs={6} sm={2}>
          <Button onClick={stopSound} color="danger" disabled={isLoading}>
            Stop
          </Button>
        </Col>
        <Col className="align-items-center d-flex" xs={12} sm={8} md={6} lg={4}>
          <div className="fs-2 mx-2" onClick={handleToggleMute}>
            {mute && <FaVolumeMute />}
            {!mute && (volume > 60 ? <FaVolumeUp /> : volume < 10 ? <FaVolumeOff /> : <FaVolumeDown />)}
          </div>
          <input
            type="range"
            className="w-100"
            min="0"
            id="volume"
            onChange={handleChangeVolume}
            value={mute ? 0 : volume}
          />
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default PrevResponse;
