import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Skills } from "../types/skills_types";

const ResumeCard = ({ skill: { id, name } }: { skill: Skills }) => {
	return (
		<Card className={`${styles.skillCard} mt-4 mb-4 px-5 py-2`}>
			<CardBody className={styles.resumeCard}>
				<Row>
					<span className="fs-4 ">{name}</span>
				</Row>
				<Row>
					<span className="fs-4 ">ID: {id}</span>
				</Row>
			</CardBody>
		</Card>
	);
};

export default ResumeCard;
