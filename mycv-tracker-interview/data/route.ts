import { FaFileAudio, FaUserPlus, FaFileMedical, FaVolumeUp } from "react-icons/fa";

enum RouteId {
  HomePage = "homepage",
  JobListPage = "joblist-page",
}
// List of routes which requre auth

export const NavLinkRoutes = [
  {
    path: "/assign-interview",
    icon: FaUserPlus,
    label: "Assign Interview",
  },
  {
    path: "/get-results",
    icon: FaFileAudio,
    label: "Get Results",
  },
  {
    path: "/responses",
    icon: FaVolumeUp,
    label: "Responses",
  },
  {
    path: "/question-add",
    icon: FaUserPlus,
    label: "Add Question",
  },
  {
    path: "/question-data",
    icon: FaUserPlus,
    label: "Question Data",
  },
];

export const adminRoutes = ["/dashboard", "/settings", ...NavLinkRoutes.map((route) => route.path)];
const authRoutes = [...adminRoutes];

const CVServices = [
  { link: "https://mycvtracker.com/cv-writing-page.html", label: "CV Writing Page" },
  { link: "https://mycvtracker.com/linkedin-profile-writing.html", label: "Linkedin Profile Writing" },
  { link: "https://mycvtracker.com/cover-letter-page.html", label: "Cover Letter Page" },
  { link: "", label: "CV Writing Packages" },
];

const JobServices = [
  { link: "https://mycvtracker.com/cv-writing-page.html", label: "Job Board" },
  { link: "https://mycvtracker.com/linkedin-profile-writing.html", label: "Get a Tech Internship" },
  { link: "https://mycvtracker.com/cover-letter-page.html", label: "Self Funded Internship" },
];

export { RouteId, authRoutes, CVServices, JobServices };
