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

const CampaignNotes = () => {
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
		</Container>
	);
};

export default CampaignNotes;
