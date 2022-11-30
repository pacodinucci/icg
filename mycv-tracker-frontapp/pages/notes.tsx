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
	Label,
	Row,
} from "reactstrap";
import { getNotes } from "../apis/mycvtracker/notes";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

const Notes = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [notes, setNotes] = useState([]);

	const getNotesList = useCallback(
		async (pageNumber: number, pageSize: number) => {
			try {
				const response = await getNotes(pageNumber, pageSize);
				if (response) {
					setNotes(response);
				}
			} catch (e: any) {
				console.log(e);
				showErrorToast(alerts[e.response.status].message);
			}
		},
		[showErrorToast]
	);
	useEffect(() => {
		getNotesList(3, 10);
	}, []);

	const createNoteCard = () => {
		return notes.map((note, idx) => {
			const {
				agency,
				createdDate,
				recruiter,
				toRecruiter,
				notes,
				targetList,
				referContent,
			} = note;
			return (
				<Card key={idx} className={` mt-4 mb-4 px-5 py-2`}>
					<CardBody className={styles.noteCard}>
						<Row>
							<Col>
								<span className="fs-4 ">{agency}</span>
							</Col>
							<Col>
								<span className="fs-6">Last Updated On: {createdDate}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>Recruiter Name</Label>
								<Input placeholder={recruiter} />
							</Col>
							<Col>
								<Label>Recruiter Email</Label>
								<Input placeholder={toRecruiter} />
							</Col>
						</Row>
						<Row>
							<Label>Notes</Label>
							<Input placeholder="Notes" />
						</Row>
						<Row>
							<Col>
								<Button color="danger">Delete</Button>
							</Col>
							<Col>
								<Button color="primary">Update</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<textarea placeholder="referGroup" />
							</Col>
							<Col>
								<textarea placeholder="referContent" />
							</Col>
						</Row>
						<Row>
							<Col>
								<Button color="danger">Refer Candidates</Button>
							</Col>
							<Col>
								<Button color="primary">Campaign Candidates</Button>
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
				<h6 className="fs-1 my-3">Notes</h6>
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
							<BreadcrumbItem active>Notes</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>{createNoteCard()}</Row>
		</Container>
	);
};

export default Notes;
