import React from "react";
import { MediaQuery, Navbar, NavLink } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaFileAudio, FaUserPlus, FaFileMedical, FaVolumeUp } from "react-icons/fa";
import { NavLinkRoutes } from "../data/route";

const Sidebar = () => {
  const router = useRouter();

  if (router.asPath === "/login") return null;

  return (
    <MediaQuery query="(max-width: 700px)" styles={{ display: "none" }}>
      <Navbar p="xs" height="auto" width={{ base: 300 }} style={{ zIndex: 2 }}>
        <Navbar.Section>MY CV TRACKER</Navbar.Section>
        <Navbar.Section grow mt="md">
          {NavLinkRoutes.map((route) => (
            <NavLink
              key={route.path}
              icon={<route.icon />}
              label={route.label}
              component={Link}
              href={route.path}
              active={router.asPath === route.path}
            />
          ))}
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default Sidebar;
