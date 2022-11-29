import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import styles from "../styles/questionAdd.module.css";

const Question_add = () => {
	const [question, setQuestion] = useState("");
	const [option1, setOption1] = useState("");
	const [option2, setOption2] = useState("");
	const [option3, setOption3] = useState("");
	const [option4, setOption4] = useState("");
	const [correct, setCorrect] = useState("");
	const [questionType, setQuestionType] = useState("");

	const handleAddQuestion = (e: any) => {
		e.preventDefault();
		if (question === "" || correct === "" || questionType === "") {
			return;
		}
		console.log(
			question,
			option1,
			option2,
			option3,
			option4,
			correct,
			questionType
		);
	};

	return (
		<Container className={styles.container}>
			<span className={styles.heading}>Add Question Data</span>
			<span className={styles.route}>
				Home <span className={styles.subRoute}> / Add Question Data</span>{" "}
			</span>
			<form className={styles.form} onSubmit={(e) => handleAddQuestion(e)}>
				<Row tag="section" className={styles.section}>
					<label>Question</label>
					<textarea
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Option 1</label>
					<textarea
						value={option1}
						onChange={(e) => setOption1(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Option 2</label>
					<textarea
						value={option2}
						onChange={(e) => setOption2(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Option 3</label>
					<textarea
						value={option3}
						onChange={(e) => setOption3(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Option 4</label>
					<textarea
						value={option4}
						onChange={(e) => setOption4(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Correct</label>
					<textarea
						value={correct}
						onChange={(e) => setCorrect(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<label>Question Type</label>
					<textarea
						value={questionType}
						onChange={(e) => setQuestionType(e.target.value)}
					></textarea>
				</Row>
				<Row tag="section" className={styles.section}>
					<input type="submit" value="Add Question" />
				</Row>
			</form>
		</Container>
	);
};

export default Question_add;
