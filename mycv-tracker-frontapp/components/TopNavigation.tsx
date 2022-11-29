import React, { ReactElement, useEffect, useState } from "react";
import {
	Button,
	Container,
	Row,
	Navbar,
	NavbarBrand,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Col,
} from "reactstrap";

import { FaUserAlt, FaCog, FaPowerOff } from "react-icons/fa";

import logo from "../assets/logo.png";

import Image from "next/image";
import Link from "next/link";

import styles from "../styles/TopNavigation.module.css";
import { useUserState } from "../hooks/useUserState";
import { useRouter } from "next/router";

import { authRoutes } from "../data/route";

const TopNavigation = (): ReactElement => {
	const [jobServiceDropdown, setJobServiceDropdown] = useState(false);
	const [cvServiceDropdown, setCvServiceDropdown] = useState(false);
	const [accountDropDown, setAccountDropdown] = useState(false);

	const toggleJobServiceDropdown = () =>
		setJobServiceDropdown((prevState) => !prevState);
	const toggleCvServiceDropdown = () =>
		setCvServiceDropdown((prevState) => !prevState);
	const toggleAccountDropdown = () =>
		setAccountDropdown((prevState) => !prevState);

	const { user, isLoading: isLoadingUser, logoutUser } = useUserState();
	const router = useRouter();

	useEffect(() => {
		if (
			user === null &&
			!isLoadingUser &&
			authRoutes.includes(router.pathname)
		) {
			router.replace("/login");
		}
	}, [user, router, isLoadingUser]);

	return (
		<Navbar className={styles.navbar}>
			<Container className="d-flex justify-content-between align-items-center flex-grow-1">
				<NavbarBrand href="/">
					<Image alt="logo" src={logo} className={styles.logo} />
				</NavbarBrand>
				<Row className="align-items-center">
					<Col>
						<Dropdown
							isOpen={cvServiceDropdown}
							toggle={toggleCvServiceDropdown}
						>
							<DropdownToggle caret={true} className={styles.dropdown}>
								CV Services
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem tag={Link} href="/cv-writing-page">
									CV Writing Page
								</DropdownItem>
								<DropdownItem tag={Link} href="/linkedin-profile-writing">
									Linkedin Profile Writing
								</DropdownItem>
								<DropdownItem tag={Link} href="/cover-letter-page">
									Cover Letter Page
								</DropdownItem>
								<DropdownItem tag={Link} href="/cv-writing-packages">
									CV Writing Packages
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Col>
					<Col>
						<Dropdown
							isOpen={jobServiceDropdown}
							toggle={toggleJobServiceDropdown}
						>
							<DropdownToggle caret={true} className={styles.dropdown}>
								Job Services
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem tag={Link} href="/jobs">
									Job Board
								</DropdownItem>
								<DropdownItem>Get a Tech Internship</DropdownItem>
								<DropdownItem>Self Funded Internship</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Col>
					{user === null && (
						<Col>
							<Link href="/login" className={styles.login}>
								Login
							</Link>
						</Col>
					)}
					{user === null && (
						<Col>
							<Link href="/register" className={styles.signupBtn}>
								Sign&nbsp;Up
							</Link>
						</Col>
					)}
					{user !== null && (
						<Col>
							<Dropdown isOpen={accountDropDown} toggle={toggleAccountDropdown}>
								<DropdownToggle
									tag="div"
									className="d-flex flex-column justify-content-center align-items-center"
								>
									<Image
										src="https://mycvtracker.com/assets/img/app/profile/user.png"
										alt="User"
										width={50}
										height={50}
									/>
									<span className="mx-3 my-1 text-secondary">{user.email}</span>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem tag={Link} href="/account">
										<FaUserAlt />
										Account
									</DropdownItem>
									<DropdownItem tag={Link} href="/settings">
										<FaCog />
										Settings
									</DropdownItem>
									<DropdownItem tag={Button} onClick={logoutUser}>
										<FaPowerOff /> Logout
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Col>
					)}
				</Row>
			</Container>
		</Navbar>
	);
};

export default TopNavigation;
