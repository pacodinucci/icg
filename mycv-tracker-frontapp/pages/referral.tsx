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
	Row,
} from "reactstrap";
import { getMyReferrals } from "../apis/mycvtracker/referrals";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

const Referral = () => {
	const { showErrorToast, showSuccessToast } = useToast();

	const [referrals, setReferrals] = useState([]);

	const getMyReferralsList = useCallback(
		async (page: number, noOfRecords: number) => {
			try {
				const response = await getMyReferrals(page, noOfRecords);
				if (response) {
					console.log(response);
					setReferrals(response);
				}
			} catch (e: any) {
				console.log(e);
				showErrorToast(alerts[e.response.status].message);
			}
		},
		[showErrorToast]
	);
	useEffect(() => {
		getMyReferralsList(1, 10);
	}, []);

	const createReferralCard = () => {
		return referrals.map((referral, idx) => {
			const {
				referralTargetSubject,
				referralType,
				referralLink,
				refPublic,
				bountyEnable,
			} = referral;
			return (
				<Card key={idx} className={` mt-4 mb-4 px-5 py-2`}>
					<CardBody className={styles.resumeCard}>
						<Row>
							<span className="fs-4 ">{referralTargetSubject}</span>
							<span className="fs-4 ">{referralType}</span>
						</Row>
						<Row>
							<Link
								href={`https://mycvtracker.com/job-spec.html?ref=${referralLink}&&title=${referralTargetSubject}`}
							>
								{`https://mycvtracker.com/job-spec.html?ref=${referralLink}&&title=${referralTargetSubject}`}
							</Link>
						</Row>
						<Row>
							<Col>
								<span>Bounty Disabled</span>
								<span>{bountyEnable}</span>
							</Col>
							<Col>
								<span>Link Published</span>
								<span>{refPublic}</span>
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
				<h6 className="fs-1 my-3">Referral</h6>
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
							<BreadcrumbItem active>My Referral</BreadcrumbItem>
						</Breadcrumb>
					</CardBody>
				</Card>
			</Row>
			<Row>
				<h6 className="fs-3 my-3">List of Referrals</h6>
			</Row>
			<Card>
				<CardBody>
					<Row>
						<span>
							This section generates referral links for our portal users. At
							present it can generate job referral ,social and plain text links.
						</span>
					</Row>
					<Row>
						<Col>
							<Button color="danger">Generate Link</Button>
						</Col>
					</Row>
				</CardBody>
			</Card>
			<Container fluid className={styles.resumeContainer}>
				{createReferralCard()}
			</Container>
		</Container>
	);
};

export default Referral;
