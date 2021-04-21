const paymentReports = [
  {
    path: "/payment-reports",
    name: "PaymentReports",
    component: () => import("@/views/PaymentReport"),
    meta: { requiresAuth: true },
  },
];

export default paymentReports;
