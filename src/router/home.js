const home = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
    meta: { requiresAuth: true },
  },
];

export default home;
