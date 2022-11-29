import React, { useState } from "react";
import styles from "../styles/NewsLetter.module.css";

const NewsLetter = () => {
	const [email, setEmail] = useState("");

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Subscribe our Newsletter</span>
			<div className={styles.row}>
				<input
					className={styles.input}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email address here..."
				/>
				<button className={styles.btn}>Submit</button>
			</div>
		</div>
	);
};

export default NewsLetter;
