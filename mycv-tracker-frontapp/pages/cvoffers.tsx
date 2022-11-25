import React from "react";
import Image from "next/image";

import { Container } from "reactstrap";
import styles from "../styles/cvservices.module.css";
import offer1Img from "../assets/homepage/offers_1.png";
import offer2Img from "../assets/homepage/offers_2.png";
import offer3Img from "../assets/homepage/offers_3.png";
import offer4Img from "../assets/homepage/offers_4.png";

const Cvhosting = () => {
	return (
		<div className={styles.wrapper}>
			<Container className={styles.container}>
				<Image className={styles.offer_image} src={offer1Img} alt="Offer 1" />
				<Image className={styles.offer_image} src={offer2Img} alt="Offer 2" />
				<Image className={styles.offer_image} src={offer3Img} alt="Offer 3" />
				<Image className={styles.offer_image} src={offer4Img} alt="Offer 4" />
			</Container>
		</div>
	);
};

export default Cvhosting;
