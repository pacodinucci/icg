import Link from "next/link";
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
	Row,
} from "reactstrap";
import styles from "../styles/Account.module.css";

const ResumesFolder = () => {
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Bulk Folder Resumes</h6>
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
							<BreadcrumbItem active>Bulk Folder Resumes</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row className="my-3">
				<Col>
					<Button color="primary">+ Add</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default ResumesFolder;
