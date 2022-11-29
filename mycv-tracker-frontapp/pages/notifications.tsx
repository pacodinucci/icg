import Link from "next/link";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	Container,
	Row,
	Table,
} from "reactstrap";

const Notifications = () => {
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
								<Link href="/account">Home</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>Notifications</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-3 my-3">List of Notifications</h6>
			</Row>
			<Row>
				<Card>
					<CardBody>
						<Table>
							<thead>
								<tr>
									<th className="fs-5">Reference</th>
									<th className="fs-5">Name</th>
									<th className="fs-5">Event Type</th>
									<th className="fs-5">Notifications Count</th>
									<th className="fs-5">Last Tracked Time</th>
									<th className="fs-5">Context</th>
									<th className="fs-5">Actions</th>
								</tr>
							</thead>
							<tbody></tbody>
						</Table>
					</CardBody>
				</Card>
			</Row>
		</Container>
	);
};

export default Notifications;
