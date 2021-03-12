const officers = [
  {
    path: "/officers",
    name: "Officers",
    component: () => import("@/views/Officer"),
    meta: { requiresAuth: true },
  },
];

export default officers;
