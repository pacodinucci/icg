import Link from "next/link";
import { useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import styles from "../styles/Account.module.css";

const GroupData = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Group Members Data</h6>
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
							<BreadcrumbItem active>Group Members Data</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row className="my-2">
				<span className="fs-5">Add Groups:</span>
			</Row>
			<Row className="my-2">
				<Label>Group Name</Label>
				<Input type="text" placeholder="group name" />
			</Row>
			<Row className="my-2">
				<Label>Group Type</Label>
				<Input type="text" placeholder="group type" />
			</Row>
			<Row className="my-2">
				<Label>Group Location</Label>
				<Input type="text" placeholder="group location" />
			</Row>
			<Row className="my-2">
				<Label>Group Access</Label>
				<Input type="text" placeholder="group access" />
			</Row>
			<Row className="my-2">
				<Button color="primary">Add Group</Button>
			</Row>
			<Row className="my-2">
				<Button color="primary">Edit Group</Button>
			</Row>
			<Row className="my-2">
				<Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
					<DropdownToggle caret>Select Groups</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Header</DropdownItem>
						<DropdownItem disabled>Action</DropdownItem>
						<DropdownItem>Another Action</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Another Action</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Row>
			<Row className="mt-4 mb-2">
				<span className="fs-5">Members Data:</span>
				<span className="fs-5">Upload Members Data:</span>
				<Input type="file" />
			</Row>
			<Row className="my-1">
				<Col>
					<Button>Bulk Upload</Button>
				</Col>
			</Row>
			<Row className="my-4">
				<Col>
					<Input type="text" />
				</Col>
				<Col>
					<Input type="text" />
				</Col>
				<Col>
					<Input type="text" />
				</Col>
				<Col>
					<Button>remove</Button>
				</Col>
				<Col>
					<Button>copy</Button>
				</Col>
				<Col>
					<Button>edit</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default GroupData;
