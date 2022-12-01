import Link from "next/link";
import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Referral } from "../types/referral_types";

const ResumeCard = ({
	referral: {
		referralTargetSubject,
		referralType,
		referralLink,
		refPublic,
		bountyEnable,
	},
}: {
	referral: Referral;
}) => {
	return (
		<Card className={` mt-4 mb-4 px-5 py-2`}>
			<CardBody className={styles.resumeCard}>
				<Row>
					<span className="fs-4 ">{referralTargetSubject}</span>
					<span className="fs-4 ">{referralType}</span>
				</Row>
				<Row>
					<Link
						href={`https://mycvtracker.com/job-spec.html?ref=${referralLink}&&title=${referralTargetSubject}`}
					>
						{`https://mycvtracker.com/job-spec.html?ref=${referralLink}&&title=${referralTargetSubject}`}
					</Link>
				</Row>
				<Row>
					<Col>
						<span>Bounty Disabled</span>
						<span>{bountyEnable}</span>
					</Col>
					<Col>
						<span>Link Published</span>
						<span>{refPublic}</span>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default ResumeCard;
