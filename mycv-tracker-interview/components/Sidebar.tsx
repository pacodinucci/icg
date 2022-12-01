import React from "react";
import { Navbar, NavLink } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  if (router.asPath === "/login") return null;

  return (
    <Navbar p="xs" height="auto" width={{ base: 300 }} style={{ zIndex: 2 }}>
      <Navbar.Section>MY CV TRACKER</Navbar.Section>
      <Navbar.Section grow mt="md">
        <NavLink
          label="Assign Interview"
          component={Link}
          href="/assign-interview"
          active={router.asPath === "/assign-interview"}
        />
        <NavLink label="Get Results" component={Link} href="/get-results" active={router.asPath === "/get-results"} />
        <NavLink label="Responses" component={Link} href="/responses" active={router.asPath === "/responses"} />
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
