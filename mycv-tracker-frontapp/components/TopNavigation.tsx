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
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBrand href="/topcvreviews">
          <Image alt="logo" src={logo} />
        </NavbarBrand>

        <Container className="flex-grow-1  flex-row justify-content-between align-items-center">
          <Dropdown isOpen={cvServiceDropdown} toggle={toggleCvServiceDropdown} className="inline-block">
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>CV Writing Page</DropdownItem>
              <DropdownItem>Linkedin Profile Writing</DropdownItem>
              <DropdownItem>Cover Letter Page</DropdownItem>
              <DropdownItem>CV Writing Packages</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={jobServiceDropdown} toggle={toggleJobServiceDropdown}>
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Job Board</DropdownItem>
              <DropdownItem>Get a Tech Internship</DropdownItem>
              <DropdownItem>Self Funded Internship</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link href="/login">Login</Link>
          <Button color="primary">Sign Up</Button>
        </Container>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
