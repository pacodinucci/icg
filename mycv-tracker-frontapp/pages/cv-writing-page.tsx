import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

import CoverImage from "../assets/free-cv-review.png";

import styles from "../styles/cvservices.module.css";

const CVWritingPage = () => {
	return (
		<div className={styles.wrapper}>
			<Container className="py-4">
				<div>
					<Row className="text-center my-3">
						<span className={styles.heading}>CV Writing Page</span>
					</Row>
					<Col sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
						<Row className="my-2">
							<p className={styles.content}>
								A professional CV that details experience, skills, credentials,
								and abilities relevant to next step on your career ladder is key
								in attracting prospective employers. Your CV is the most
								essential tools in job searching. The professional CV attracts
								an employer&apos;s attention by assuring them that you meet the
								requirements for their open position.
							</p>
							<p className={styles.content}>
								A poorly constructed CV or one that doesn&apos;t place the
								proper focus on your abilities can very quickly disqualify your
								application. However, its not easy to put a good CV together.
								With a copy of your current CV and questionnaire, our writers
								can help construct you a professional CV that&apos;s perfect for
								you.
							</p>
						</Row>
						<div>
							<Row>
								<Col md={7} className="">
									<Image
										className="w-auto"
										src={CoverImage}
										height={150}
										alt="Free CV Review"
									/>
								</Col>

								<Col md={5}>
									<div className="bg-primary text-white p-2">
										<ul className={styles.unorderedList}>
											<li>
												Your new CV will be written by a{" "}
												<b>Degree Qualified CV Writer</b>, ensuring that we
												create a point of difference for you.
											</li>
											<li>
												Your new CV will be <b>customised/tailored</b> to meet
												your individual needs.
											</li>
											<li>
												Your new CV will be <b>ATS</b> and <b>HRMS</b> friendly
												( significantly improving your chances of securing an
												interview during the initial screening stage).
											</li>
											<li>
												Your new CV will be <b>keyword optimised</b> to suit
												your target role and industry.
											</li>
											<li>
												Your new CV will be provided in a <b>PDF</b> and{" "}
												<b>Word document</b> so that you have complete
												ownership.
											</li>
										</ul>
										<h3 className="text-center mt-2">&pound;80.00</h3>
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

export default CVWritingPage;
