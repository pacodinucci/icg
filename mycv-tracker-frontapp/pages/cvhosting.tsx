import React from "react";
import { Container } from "reactstrap";
import styles from "../styles/cvservices.module.css";

const Cvhosting = () => {
	return (
		<div className={styles.wrapper}>
			<Container className={styles.container}>
				<span className={styles.content_2}>
					<a className={styles.link} href="/" target="_blank">
						My CV Tracker{" "}
					</a>
					is offering this unique service, where you can host your docx and pdf
					format CV and <br /> market your CV to hundreds of companies,
					recruiters and network connections. <br /> <br />
					The steps are mentioned for your reference: <br /> <br /> - Upload
					your CV at
					<a className={styles.link} href="/" target="_blank">
						{" "}
						www.mycvtracker.com{" "}
					</a>
					in docx format.
					<br /> - Follow the steps to make add tracking to your CV.
					<br /> - We provide you tracking report that who has opened your CV
					and email. <br /> For further details write to us at
					<a
						className={styles.link}
						href="mailto:info@mycvtracker.com"
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						info@mycvtracker.com{" "}
					</a>
				</span>
			</Container>
		</div>
	);
};

export default Cvhosting;
