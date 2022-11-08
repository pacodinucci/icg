import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Container, List, ListInlineItem, Row } from "reactstrap";
import logo from "../assets/logo.png";

import styles from "../styles/BottomFooter.module.css";

const BottomFooter = () => {
  return (
    <footer className={styles.footer}>
      <Container className="d-flex align-items-center justify-content-center flex-column py-3">
        <Image src={logo} alt="My CV Tracker Logo" width={150} className="my-2" />
        <Link href="/terms" className="text-decoration-none">
          Terms & Conditions
        </Link>
        <p className={`${styles.location} my-1 fs-5`}>London, United Kingdom</p>
        <p className={styles.copyright}>Copyright My CV Tracker</p>
        <List type="inline" className="text-secondary my-3">
          <ListInlineItem>
            <Link target="_blank" href="https://www.facebook.com/My-CV-Tracker-494026290989681/" rel="noreferrer">
              <FaFacebookF color="gray" />
            </Link>
          </ListInlineItem>
          <ListInlineItem className="mx-3">
            <Link target="_blank" href="https://twitter.com/mycvtracker" rel="noreferrer">
              <FaTwitter color="gray" />
            </Link>
          </ListInlineItem>
          <ListInlineItem>
            <a href="">
              <FaInstagram color="gray" />
            </a>
          </ListInlineItem>
        </List>
      </Container>
    </footer>
  );
};

export default BottomFooter;
