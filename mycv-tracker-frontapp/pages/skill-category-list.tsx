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

const SkillCategories = () => {
	return (
		<Container className="fs-4 py-5">
			<Row>
				<h6 className="fs-1 my-3">Skill Categories</h6>
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
							<BreadcrumbItem active>Skill Categories</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Card className="my-3">
				<CardBody>
					<Row>
						<span>
							Duis leo ante, vulputate at nunc non, maximus ultrices metus.
						</span>
					</Row>
					<Row>
						<Col>
							<Button color="danger">New Category</Button>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
	);
};

export default SkillCategories;
