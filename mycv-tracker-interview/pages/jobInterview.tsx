import React, { useCallback, useEffect, useState } from "react";
import NewsLetter from "../components/NewsLetter";
import styles from "../styles/jobInterview.module.css";
import {
	ShowRecord, //component used to show audio result
	ProcessRecord, //component contains state to deal with logic when recording
} from "react-nextjs-record";
import { useToast } from "../hooks/useToast";
import { alerts } from "../utils/alert-utils";
import { getMyQuestions } from "../apis/mycvtracker/questions";
import { Question } from "../types/question_types";

const JobInterview = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [questions, setQuestions] = useState([]);
	const [currentQuestionNo, setCurrentQuestionNo] = useState(-1);
	const [currentQuestion, setCurrentQuestion] = useState<Question>();
	const [questionsListLength, setQuestionsListLength] = useState(0);

	const getMyQuestionsList = useCallback(
		async (token: string, interviewType: string) => {
			try {
				const response = await getMyQuestions(token, interviewType);
				if (response) {
					setQuestions(response);
					setQuestionsListLength(response.length);
				}
			} catch (e: any) {
				console.log(e);
				showErrorToast(alerts[e.response.status].message);
			}
		},
		[showErrorToast]
	);
	useEffect(() => {
		// Temporarily Hardcoding
		getMyQuestionsList(
			"7a4574987a02434ea6006818f4be5112",
			"nodejs01_rnative01"
		);
	}, []);

	const Permissions = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(() => setIsBlocked(false))
			.catch(() => setIsBlocked(true));
	};

	const [type, setType] = useState(0);
	const [message, setMessage] = useState("Start Interview!!");
	const [startTimer, setStartTimer] = useState(6);
	const [remainingTime, setRemainingTime] = useState(60);
	const [stopped, setStopped] = useState(true);
	const [resetClicked, setResetClicked] = useState(false);
	const [submittedBlob, setSubmittedBlob] = useState(false);

	// Audio Record
	const [isBlocked, setIsBlocked] = useState(false);
	const [CompleteRecording, setCompleteRecording] = useState(false);
	let {
		blobURL,
		completeRecording,
		reStartRecording,
		startRecording,
		stopRecording,
	} = ProcessRecord();

	const SwitchView = () => {
		setMessage("Loading Questions");
		setTimeout(() => {
			setType(1);
			setMessage("");
			timer(startTimer);
			Permissions();
			if (currentQuestionNo === questionsListLength) return;
			setCurrentQuestionNo(currentQuestionNo + 1);
			setCurrentQuestion(questions[currentQuestionNo + 1]);
		}, 3000);
	};
	const timer = (_startTimer: number) => {
		if (_startTimer === 0) return;
		setStartTimer(_startTimer - 1);
		setTimeout(() => timer(_startTimer - 1), 1000);
	};
	useEffect(() => {
		if (startTimer === 0) {
			setStopped(false);
			StartRecording();
		}
	}, [startTimer]);
	useEffect(() => {
		if (remainingTime === 0 || resetClicked) {
			setStopped(true);
			StopRecording();
			return;
		} else if (startTimer === 0) {
			setTimeout(() => setRemainingTime((prev) => prev - 1), 1000);
		}
	}, [remainingTime, startTimer, resetClicked]);

	const StartRecording = () => {
		if (isBlocked) return;
		startRecording();
	};
	const StopRecording = () => {
		stopRecording();
		setStopped(true);
		setCompleteRecording(true);
		setResetClicked(true);
	};
	const SkipQuestion = () => {
		if (window.confirm("Skip Question?")) {
			if (currentQuestionNo === questionsListLength) {
				window.alert(
					"Thanks for attempting your Interview. Our team will get in touch soon."
				);
				return;
			}
			setStartTimer(6);
			setRemainingTime(60);
			setStopped(true);
			setResetClicked(false);
			timer(6);
			reStartRecording();
			setCompleteRecording(false);
			setCurrentQuestionNo(currentQuestionNo + 1);
			setCurrentQuestion(questions[currentQuestionNo + 1]);
		}
	};
	const NextQuestion = (type: number) => {
		if (!submittedBlob && type === 0) {
			window.alert("Please Submit your answer");
			return;
		} else {
			if (currentQuestionNo === questionsListLength) {
				window.alert(
					"Thanks for attempting your Interview. Our team will get in touch soon."
				);
				return;
			}
			setStartTimer(6);
			setRemainingTime(60);
			setStopped(true);
			setResetClicked(false);
			timer(6);
			reStartRecording();
			setCompleteRecording(false);
			setSubmittedBlob(false);
			if (currentQuestionNo === questionsListLength) return;
			setCurrentQuestionNo(currentQuestionNo + 1);
			setCurrentQuestion(questions[currentQuestionNo + 1]);
		}
	};
	const SubmitQuestion = () => {
		setSubmittedBlob(true);
		NextQuestion(1);
	};

	return (
		<>
			<div className={styles.container}>
				<span className={styles.message}>
					Please press the Start Interview <br /> button to begin the interview.{" "}
					<br /> Record your answer and upload <br /> each question to the
					server
					<br />
				</span>
				<span className={styles.message}>Good Luck!</span>
				<div className={styles.hr}></div>
				{type === 0 ? (
					<>
						<p className={styles.instruction}>
							You have 60 seconds to answer each question, Please ensure access
							to your microphone is enabled to confirm that your response will
							be recorded.
							<br />
							<span>
								Press Start Interview when you are ready to proceed with the
								interview questions, clicking record when you are prepared to
								answer.
							</span>
							<br />
							<span>
								Use the demo question to practice your response, and get more
								comfortable with the method of the audio interview.
							</span>
							<br />
							<span>
								You can playback your recording to determine if you are
								satisfied with the audio, and then ensure you upload your answer
								to the server to confirm your answer before moving to next
								Question.
							</span>
							<br />
							<span>
								Please note you need to record answer and submit answer at each
								question before moving to next question.
							</span>
							<br />
							<span>
								Continue this process until you have answered a minimum of 10
								questions!
							</span>
						</p>
						<p className={styles.message_2}>
							Recording will start automatically
						</p>
					</>
				) : startTimer !== 0 ? (
					<>
						<p className={styles.instruction}>{currentQuestion?.question}</p>
						<p className={styles.message_2}>
							Recording starts in {startTimer} seconds!
						</p>
					</>
				) : !stopped ? (
					<>
						<p className={styles.instruction}>{currentQuestion?.question}</p>
						<p className={styles.message_3}>
							Recording started... {remainingTime} seconds left!
						</p>
					</>
				) : (
					<>
						<p className={styles.instruction}>{currentQuestion?.question}</p>
						<p className={styles.message_4}>
							Recording Stopped. Please submit the audio or skip the question
						</p>
					</>
				)}
				{!stopped ? (
					<button className={styles.stop_btn} onClick={() => StopRecording()}>
						Stop
					</button>
				) : (
					<button disabled className={styles.stop_btn}>
						Stop
					</button>
				)}
				{message === "Start Interview!!" ? (
					<button className={styles.start_btn} onClick={() => SwitchView()}>
						{message}
					</button>
				) : message === "Loading Questions" ? (
					<button className={styles.start_btn} disabled>
						{message}
					</button>
				) : (
					<div className={styles.btn_group}>
						{stopped && startTimer === 0 ? (
							<>
								<button
									className={styles.skip_btn}
									onClick={() => SkipQuestion()}
								>
									Skip Question
								</button>
								<button
									className={styles.next_btn}
									onClick={() => NextQuestion(0)}
								>
									Next Question
								</button>
							</>
						) : (
							<>
								<button className={styles.skip_btn} disabled>
									Skip Question
								</button>
								<button className={styles.next_btn} disabled>
									Next Question
								</button>
							</>
						)}
					</div>
				)}
				<ShowRecord />
				<div className={styles.submit_btn}>
					{CompleteRecording && (
						<button
							className={styles.next_btn}
							onClick={() => SubmitQuestion()}
						>
							Click here to Submit your answer
						</button>
					)}
				</div>
			</div>
			<NewsLetter />
		</>
	);
};

export default JobInterview;
