enum RouteId {
  HomePage = "homepage",
  JobListPage = "joblist-page",
}
// List of routes which requre auth
const adminRoutes = ["/assign-interview", "/dashboard", "/get-results", "/responses", "/settings"];
const authRoutes = [...adminRoutes];

export { RouteId, authRoutes, adminRoutes };
