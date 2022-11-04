import React, {
  ReactElement
} from "react";
import {
  Button,
  Container, Navbar, NavbarBrand
} from "reactstrap";
import logo from "../assets/logo.png";

import Image from "next/image";


const TopNavigation = (): ReactElement => {
  return (
    <Navbar color="secondary" dark>
      <Container>
        <NavbarBrand href="/topcvreviews">
          <Image alt="logo" src={logo} />
        </NavbarBrand>
        <Button color="primary">Sign Up</Button>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
