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
import { getAuthUsers } from "../apis/mycvtracker/userManagement";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";
import UserImg from "../assets/account/user.png";
import Image from "next/image";

const UserManagement = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [users, setUsers] = useState([]);

	const getAuthUsersList = useCallback(async () => {
		try {
			const response = await getAuthUsers();
			if (response) {
				console.log(response);
				setUsers(response);
			}
		} catch (e: any) {
			console.log(e);
			showErrorToast(alerts[e.response.status].message);
		}
	}, [showErrorToast]);
	useEffect(() => {
		getAuthUsersList();
	}, []);

	const createUserCard = () => {
		return users.map((user, idx) => {
			const { id, email, firstName, lastName, signUpDate, roleId } = user;
			return (
				<Card key={idx} className={` mt-4 mb-4 px-5 py-2`}>
					<CardBody className={styles.resumeCard}>
						<Row>
							<Col>
								<Image
									src={UserImg}
									height={100}
									width={100}
									alt="user Image"
								/>
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
										href={`https://mycvtracker.com/referral?userId=${id}&emailDm=gmail.com&emailName=manish9617026809`}
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
		});
	};

	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">User Management</h6>
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
							<BreadcrumbItem active>User Management</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-4 my-3">Search for user</h6>
				<Input type="email" placeholder="Enter Email to Search" />
			</Row>
			{createUserCard()}
		</Container>
	);
};

export default UserManagement;
