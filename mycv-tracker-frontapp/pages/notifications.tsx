import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	Container,
	Row,
	Table,
} from "reactstrap";
import { getMyNotifications } from "../apis/mycvtracker/notifications";
import NotificationsTable from "../components/NotificationTable";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

const Notifications = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [notifications, setNotifications] = useState([]);

	const getNotificationsList = useCallback(async () => {
		try {
			const response = await getMyNotifications();
			if (response) {
				console.log(response);
				setNotifications(response);
			}
		} catch (e: any) {
			console.log(e);
			showErrorToast(alerts[e.response.status].message);
		}
	}, [showErrorToast]);
	useEffect(() => {
		getNotificationsList();
	}, []);
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Notifications</h6>
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
							<BreadcrumbItem active>Notifications</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-3 my-3">List of Notifications</h6>
			</Row>
			<Row>{<NotificationsTable notifications={notifications} />}</Row>
		</Container>
	);
};

export default Notifications;
