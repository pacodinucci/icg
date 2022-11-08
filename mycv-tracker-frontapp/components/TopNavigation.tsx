import React, { ReactElement, useState } from "react";
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
import logo from "../assets/logo.png";

import Image from "next/image";
import Link from "next/link";

import styles from "../styles/TopNavigation.module.css";

const TopNavigation = (): ReactElement => {
  const [jobServiceDropdown, setJobServiceDropdown] = useState(false);
  const [cvServiceDropdown, setCvServiceDropdown] = useState(false);

  const toggleJobServiceDropdown = () => setJobServiceDropdown((prevState) => !prevState);
  const toggleCvServiceDropdown = () => setCvServiceDropdown((prevState) => !prevState);

  return (
    <Navbar className={styles.navbar}>
      <Container className="d-flex justify-content-between align-items-center flex-grow-1">
        <NavbarBrand href="/topcvreviews">
          <Image alt="logo" src={logo} />
        </NavbarBrand>
        <Row className="align-items-center">
          <Col>
            <Dropdown isOpen={cvServiceDropdown} toggle={toggleCvServiceDropdown} inNavbar={true}>
              <DropdownToggle caret className={styles.dropdown}>
                CV Services
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>CV Writing Page</DropdownItem>
                <DropdownItem>Linkedin Profile Writing</DropdownItem>
                <DropdownItem>Cover Letter Page</DropdownItem>
                <DropdownItem>CV Writing Packages</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown isOpen={jobServiceDropdown} toggle={toggleJobServiceDropdown}>
              <DropdownToggle caret className={styles.dropdown}>
                Job Services
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Job Board</DropdownItem>
                <DropdownItem>Get a Tech Internship</DropdownItem>
                <DropdownItem>Self Funded Internship</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <Link href="/login" className={styles.login}>
              Login
            </Link>
          </Col>
          <Col>
            <Link href="/register" className={styles.signupBtn}>
              Sign&nbsp;Up
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
