import Link from "next/link";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	Container,
	Row,
} from "reactstrap";
import styles from "../styles/Account.module.css";

const Resumes = () => {
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
		</Container>
	);
};

export default Resumes;
