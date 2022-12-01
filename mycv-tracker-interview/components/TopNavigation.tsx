import { Header, Group, Button, UnstyledButton, Text, Box, Loader, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUserState } from "../hooks/useUserState";

import logo from "../assets/logo.png";
import { FaAngleDown, FaUserAlt, FaCog, FaPowerOff } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { adminRoutes, authRoutes } from "../data/route";

const TopNavigation = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const { user, isLoading: isLoadingUser, logoutUser } = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (user === null && !isLoadingUser && authRoutes.includes(router.route)) {
      router.replace("/login");
    } else if (user !== null && user.userRole !== "ADMIN" && adminRoutes.includes(router.asPath)) {
      router.replace("/login");
    }
  }, [user, router, isLoadingUser]);

  if (router.route === "/login") return null;

  return (
    <Box pb={70}>
      <Header height={70} px="md" fixed={true} style={{ backgroundColor: "#1e222c", zIndex: 10 }}>
        <Group position="apart" sx={{ height: "100%" }}>
          <Link href="/">
            <Image alt="logo" src={logo} height={50} width={150} />
          </Link>

          <Group>
            <Menu trigger="hover" openDelay={100} closeDelay={400}>
              <Menu.Target>
                <UnstyledButton>
                  CV Services <FaAngleDown />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={Link} href="/cv-writing-page">
                  CV Writing Page
                </Menu.Item>
                <Menu.Item component={Link} href="/linkedin-profile-writing">
                  Linkedin Profile Writing
                </Menu.Item>
                <Menu.Item component={Link} href="/cover-letter-page">
                  Cover Letter Page
                </Menu.Item>
                <Menu.Item>CV Writing Packages</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Menu trigger="hover" openDelay={100} closeDelay={400}>
              <Menu.Target>
                <UnstyledButton>
                  Job Services <FaAngleDown />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Job Board</Menu.Item>
                <Menu.Item>Get a Tech Internship</Menu.Item>
                <Menu.Item>Self Funded Internship</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          {isLoadingUser && (
            <Group>
              <Loader />
            </Group>
          )}
          {!isLoadingUser && !user && (
            <Group>
              <Button variant="default" component={Link} href="/login">
                Log in
              </Button>
              <Button component={Link} href="/register">
                Sign up
              </Button>
            </Group>
          )}
          {!isLoadingUser && user && (
            <Menu width={200}>
              <Menu.Target>
                <Group>
                  <Avatar src="https://mycvtracker.com/assets/img/app/profile/user.png" radius="xl" />
                  <div style={{ flex: 1 }}>
                    <Text size="md" weight={600} color="white">
                      {`${user.firstName} ${user.lastName}`}
                    </Text>
                    <Text color="dimmed" size="xs">
                      {user.email}
                    </Text>
                  </div>
                  <FaAngleDown />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<FaUserAlt size={14} />} component={Link} href="/dashboard">
                  Dashboard
                </Menu.Item>
                <Menu.Item icon={<FaCog size={14} />} component={Link} href="/settings">
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>User</Menu.Label>
                <Menu.Item icon={<FaPowerOff size={14} />} onClick={logoutUser}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Header>
    </Box>
  );
};

export default TopNavigation;
