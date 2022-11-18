enum RouteId {
  HomePage = "homepage",
  JobListPage = "joblist-page",
}
// List of routes which requre auth
const authRoutes = ["/account", "/settings", "/notifications", "/resumes"];

export { RouteId, authRoutes };
