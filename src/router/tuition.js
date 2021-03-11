const tuitions = [
  {
    path: "/tuitions",
    name: "Tuitions",
    component: () => import("@/views/Tuition"),
    meta: { requiresAuth: true },
  },
];

export default tuitions;
