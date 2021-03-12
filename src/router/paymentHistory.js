const paymentHistory = [
  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: () => import("@/views/PaymentHistory"),
    meta: { requiresAuth: true },
  },
];

export default paymentHistory;
