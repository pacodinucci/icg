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
	Input,
	Row,
} from "reactstrap";
import { getMyResumes } from "../apis/mycvtracker/resume";
import ResumeCard from "../components/ResumeCard";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

const Resumes = () => {
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
				<h6 className="fs-1 my-3">Resumes</h6>
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
							<BreadcrumbItem active>My Resumes</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row className="my-3">
				<Col>
					<Button color="primary">+ Add</Button>
				</Col>
			</Row>
			<Row className="my-3">
				<Input type="text" placeholder="resume look up" />
				<Button color="primary">Resume Look Up</Button>
			</Row>
			<Container fluid className={styles.resumeContainer}>
				{resumes.map((resume, idx) => {
					return <ResumeCard resume={resume} key={idx} />;
				})}
			</Container>
		</Container>
	);
};

export default Resumes;
