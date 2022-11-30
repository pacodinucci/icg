import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Resume } from "../types/resume_types";

const ResumeCard = ({
	resume: {
		id,
		resumeTitle,
		originalPreviewExpiresAt,
		previewExpiresAt,
		originalLinkId,
		maskedLinkId,
		uploadedAt,
		listingActive,
	},
}: {
	resume: Resume;
}) => {
	return (
		<Card className={` mt-4 mb-4 px-5 py-2`}>
			<CardBody className={styles.resumeCard}>
				<Row>
					<Col>
						<span className="fs-4 ">{resumeTitle}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Original Expires at</span> <br />
						<span>{originalPreviewExpiresAt}</span>
					</Col>
					<Col>
						<span>Masked Expires at</span>
						<br />
						<span>{previewExpiresAt}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Original Link</span>
						<br />
						<span>{originalLinkId}</span>
					</Col>
					<Col>
						<span>Masked Link</span>
						<br />
						<span>{maskedLinkId}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Uploaded at</span>
						<br />
						<span>{uploadedAt}</span>
					</Col>
					<Col>
						<span>Listing</span>
						<br />
						<span>{listingActive}</span>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default ResumeCard;
