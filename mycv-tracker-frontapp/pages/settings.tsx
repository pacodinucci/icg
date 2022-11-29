import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Card,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
} from "reactstrap";
import {
	sendGetUserProfileSettings,
	sendUpdateProfileSettings,
} from "../apis/mycvtracker";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import styles from "../styles/Account.module.css";

const Settings = () => {
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [loading, setLoading] = useState(false);
	const { token } = useUserState();
	const { showSuccessToast, showErrorToast } = useToast();
	useEffect(() => {
		const makeRequest = async () => {
			try {
				const { data } = await sendGetUserProfileSettings(token);
				setDetails({
					email: data.emailAddress,
					firstName: data.firstName,
					lastName: data.lastName,
				});
			} catch (e: any) {
				showErrorToast(e.message);
			}
		};
		if (token) makeRequest();
	}, [token, showErrorToast]);

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDetails((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			setLoading(false);
			await sendUpdateProfileSettings(details, token);
			showSuccessToast("Details Update successfully");
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setLoading(true);
		}
	};
	return (
		<Container className="py-5">
			<Row>
				<h6 className="fs-1 my-3">Settings</h6>
			</Row>
			<Row>
				<Card className="fs-4">
					<CardBody>
						<Breadcrumb>
							<BreadcrumbItem>
								<Link href="/account">Home</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>Settings</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
				<Row className="my-4">
					<Col md={{ offset: 3, size: 6 }}>
						<h2 className="fs-2 text-center">Profile Settings</h2>
						<Form
							className="my-4"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
						>
							<FormGroup>
								<Label for="firstName">First Name</Label>
								<Input
									type="text"
									name="firstName"
									id="fistName"
									placeholder="First Name"
									value={details.firstName}
									onChange={handleChangeInput}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="lastName">Last Name</Label>
								<Input
									type="text"
									name="lastName"
									id="lastName"
									placeholder="Last Name"
									value={details.lastName}
									onChange={handleChangeInput}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									readOnly
									value={details.email}
									onChange={handleChangeInput}
								/>
							</FormGroup>
							<FormGroup className={styles.btn_group}>
								<Button
									className={styles.btn}
									color="primary"
									onClick={handleSubmit}
									disabled={loading}
								>
									Save
								</Button>
								<Button
									className={styles.btn}
									color="primary"
									onClick={() => Router.push("/account")}
									disabled={loading}
								>
									Cancel
								</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</Row>
		</Container>
	);
};

export default Settings;
