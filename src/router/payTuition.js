const payTuition = [
  {
    path: "/pay-tuition",
    name: "PayTuition",
    component: () => import("@/views/PayTuition"),
    meta: { requiresAuth: true },
  },
];

export default payTuition;
