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

const Referral = () => {
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Referral</h6>
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
							<BreadcrumbItem active>My Referral</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-3 my-3">List of Referrals</h6>
			</Row>
		</Container>
	);
};

export default Referral;
