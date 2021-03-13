const paymentHistory = [
  {
    path: "/payment-histories",
    name: "PaymentHistory",
    component: () => import("@/views/PaymentHistory"),
    meta: { requiresAuth: true },
  },
];

export default paymentHistory;
