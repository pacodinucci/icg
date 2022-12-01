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
	Row,
} from "reactstrap";
import styles from "../styles/Account.module.css";

const CampaignNotes = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">CV Marketing Notes</h6>
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
							<BreadcrumbItem active>CV Marketing Notes</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row className="my-3">
				<Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
					<DropdownToggle caret>Select Campaigns</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Header</DropdownItem>
						<DropdownItem disabled>Action</DropdownItem>
						<DropdownItem>Another Action</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Another Action</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Row>
		</Container>
	);
};

export default CampaignNotes;
