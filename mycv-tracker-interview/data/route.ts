enum RouteId {
  HomePage = "homepage",
  JobListPage = "joblist-page",
}
// List of routes which requre auth
const adminRoutes = ["/assign-interview", "/dashboard", "/get-results", "/responses", "/settings"];
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

export { RouteId, authRoutes, adminRoutes, CVServices, JobServices };
