const classes = [
  {
    path: "/classes",
    name: "Classes",
    component: () => import("@/views/Class"),
    meta: { requiresAuth: true },
  },
];

export default classes;
