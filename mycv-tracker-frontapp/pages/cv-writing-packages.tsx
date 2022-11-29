import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

import CoverImage from "../assets/free-cv-review.png";

import styles from "../styles/cvservices.module.css";

const CVWritingPackages = () => {
	return (
		<div className={styles.wrapper}>
			<Container className="py-4">
				<div>
					<Row className="text-center my-3">
						<span className={styles.heading}>CV Writing Packages</span>
					</Row>
					<Row className="text-center my-3">
						<span className={styles.sub_heading}>
							Our CV Packages offer unique CV tracking.
						</span>
					</Row>
					<Col sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
						<div>
							<Row>
								<Col md={4}>
									<div
										className={`${styles.flex_box} bg-primary text-white p-2`}
									>
										<span className={styles.package_heading}>Package 1</span>
										<span className={styles.package_sub_heading}>New CV</span>

										<ul className={styles.unorderedList}>
											<li>Allocated Individual Writer available 7am - 7pm</li>
											<li>Professionally Written CV</li>
											<li>Industry Targeted Keyword Optimisation</li>
											<li>Applicant Tracking System CV Tested</li>
											<li>CV Supplied in Word / PDF Format</li>
											<li>
												Unlimited rewriting / editing / updates for 1 months
											</li>
											<li>1 Month Free CV Tracker TM</li>
										</ul>
										<h3 className="text-center mt-2">&pound;80.00</h3>
									</div>
									<div className="d-flex justify-content-center align-items-center">
										<Button color="primary" className="my-4" type="button">
											ORDER HERE
										</Button>
									</div>
								</Col>

								<Col md={4}>
									<div
										className={`${styles.flex_box} bg-primary text-white p-2`}
									>
										<span className={styles.package_heading}>Package 2</span>
										<span className={styles.package_sub_heading}>
											New CV & Cover Letter
										</span>
										<ul className={styles.unorderedList}>
											<li>Allocated Individual Writer available 7am - 7pm</li>
											<li>Professionally Written CV</li>
											<li>Bespoke Template Cover Letter</li>
											<li>
												All documents include Industry Targeted Keyword
												Optimisation
											</li>
											<li>All Work Reviewed and Independently Proofread</li>
											<li>CV Supplied in Word / PDF Format</li>
											<li>
												Unlimited rewriting / editing / updates for 2 months
											</li>
											<li>2 Months Free CV Tracker TM & Letter Tracker TM</li>
										</ul>
										<h3 className="text-center mt-2">&pound;120.00</h3>
									</div>
									<div className="d-flex justify-content-center align-items-center">
										<Button color="primary" className="my-4" type="button">
											ORDER HERE
										</Button>
									</div>
								</Col>

								<Col md={4}>
									<div
										className={`${styles.flex_box} bg-primary text-white p-2`}
									>
										<span className={styles.package_heading}>Package 3</span>
										<span className={styles.package_sub_heading}>
											New CV, LinkedIn, Cover Letter
										</span>
										<ul className={styles.unorderedList}>
											<li>Allocated Individual Writer available 7am - 7pm</li>
											<li>Professionally Written CV</li>
											<li>Bespoke Template Cover Letter</li>
											<li>
												Expertly prepared LinkedIn profile text / individualise
												branding help
											</li>
											<li>Applicant Tracking System CV Tested</li>
											<li>All Work Reviewed and Independently Proofread</li>
											<li>CV Supplied in Word / PDF Format</li>
											<li>
												Unlimited rewriting / editing / updates for 3 months
											</li>
											<li>3 Months Free CV Tracker TM & Letter Tracker TM</li>
										</ul>
										<h3 className="text-center mt-2">&pound;200.00</h3>
									</div>
									<div className="d-flex justify-content-center align-items-center">
										<Button color="primary" className="my-4" type="button">
											ORDER HERE
										</Button>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</div>
			</Container>
		</div>
	);
};

export default CVWritingPackages;
