import Image from "next/image";
import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import styles from "../styles/Account.module.css";
import { User } from "../types/user_types";
import UserImg from "../assets/account/user.png";
import Link from "next/link";

const ResumeCard = ({
	user: { id, email, firstName, lastName, signUpDate, roleId },
}: {
	user: User;
}) => {
	const emailDM = email.split("@")[1];
	const emailName = email.split("@")[0];
	return (
		<Card className={` mt-4 mb-4 px-5 py-2`}>
			<CardBody className={styles.resumeCard}>
				<Row>
					<Col>
						<Image src={UserImg} height={100} width={100} alt="user Image" />
					</Col>
					<Col>
						<Row>#{id}</Row>
						<Row>{email}</Row>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<Row>Name</Row>
						<Row>
							{firstName} {lastName}
						</Row>
					</Col>
					<Col>
						<Row>Referral Link</Row>
						<Row>
							<Link
								href={`https://mycvtracker.com/referral?userId=${id}&emailDm=${emailDM}&emailName=${emailName}`}
							>
								Links
							</Link>
						</Row>
					</Col>
					<Col>
						<Row>Created Date</Row>
						<Row>{signUpDate}</Row>
					</Col>
					<Col>
						<Row>Role</Row>
						<Row>{roleId !== 2 ? "User" : "Admin"}</Row>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default ResumeCard;
