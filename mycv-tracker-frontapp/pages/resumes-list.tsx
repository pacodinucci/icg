import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	CardBody,
	Col,
	Container,
	FormGroup,
	Input,
	Row,
} from "reactstrap";
import { getMyResumes } from "../apis/mycvtracker/resume";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

const ResumesList = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [resumes, setResumes] = useState([]);

	const getResumeList = useCallback(async () => {
		try {
			const response = await getMyResumes();
			if (response) {
				console.log(response);
				setResumes(response);
			}
		} catch (e: any) {
			console.log(e);
			showErrorToast(alerts[e.response.status].message);
		}
	}, [showErrorToast]);
	useEffect(() => {
		getResumeList();
	}, []);

	const createResumeCard = () => {
		return resumes.map((resume, idx) => {
			const {
				resumeTitle,
				originalPreviewExpiresAt,
				previewExpiresAt,
				originalLinkId,
				maskedLinkId,
				uploadedAt,
				listingActive,
			} = resume;
			return (
				<Card key={idx} className={` mt-4 mb-4 px-5 py-2`}>
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
		});
	};

	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Resumes List</h6>
			</Row>
			<Row>
				<Card>
					<CardBody>
						<Breadcrumb>
							<BreadcrumbItem>
								<Link className={styles.link} href="/account">
									Home
								</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>Resumes List</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-3 my-3">Resumes</h6>
			</Row>
			<Container fluid className={styles.resumeContainer}>
				{createResumeCard()}
			</Container>
		</Container>
	);
};

export default ResumesList;
