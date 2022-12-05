import React from "react";

import { Drawer, Button, Group, Accordion, NavLink, Box, Stack } from "@mantine/core";
import { CVServices, JobServices } from "../data/route";
import Link from "next/link";
import { useUserState } from "../hooks/useUserState";
import { FaCog, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const NavigationDrawer = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
  const { user, isLoading: isLoadingUser, logoutUser } = useUserState();
  const router = useRouter();
  return (
    <Drawer opened={opened} onClose={onClose}>
      <Accordion variant="filled">
        <Accordion.Item value="cv_services">
          <Accordion.Control>CV Services</Accordion.Control>
          <Accordion.Panel>
            {CVServices.map((service) => (
              <NavLink label={service.label} component={Link} href={service.link} target="_blank" key={service.label} />
            ))}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="job_services">
          <Accordion.Control>Job Services</Accordion.Control>
          <Accordion.Panel>
            {JobServices.map((service) => (
              <NavLink label={service.label} component={Link} href={service.link} target="_blank" key={service.label} />
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {!isLoadingUser && !user && (
        <Stack p="sm">
          <Button variant="default" component={Link} href="/login">
            Log in
          </Button>
          <Button component={Link} href="/register">
            Sign up
          </Button>
        </Stack>
      )}
      {!isLoadingUser && user && (
        <Stack>
          <NavLink icon={<FaUserAlt />} component={Link} href="/dashboard" label="Dashboard" />
          <NavLink icon={<FaCog />} component={Link} href="/settings" label="Settings" />
          <NavLink label="Get Results" component={Link} href="/get-results" active={router.asPath === "/get-results"} />
          <NavLink
            label="Assign Interview"
            component={Link}
            href="/assign-interview"
            active={router.asPath === "/assign-interview"}
          />
          <NavLink
            label="Add Question"
            component={Link}
            href="/question-add"
            active={router.asPath === "/question-add"}
          />
          <Button variant="default" m="sm" onClick={logoutUser}>
            Logout
          </Button>
        </Stack>
      )}
    </Drawer>
  );
};

export default NavigationDrawer;
