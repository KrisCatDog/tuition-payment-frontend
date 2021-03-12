const majors = [
  {
    path: "/majors",
    name: "Majors",
    component: () => import("@/views/Major"),
    meta: { requiresAuth: true },
  },
];

export default majors;
