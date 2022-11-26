enum RouteId {
  HomePage = "homepage",
  JobListPage = "joblist-page",
}
// List of routes which requre auth
const adminRoutes = ["/assign-interview"];
const authRoutes = ["/account", "/settings", "/notifications", "/resumes", ...adminRoutes];

export { RouteId, authRoutes, adminRoutes };
