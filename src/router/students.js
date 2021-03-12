const students = [
  {
    path: "/students",
    name: "Students",
    component: () => import("@/views/Student"),
    meta: { requiresAuth: true },
  },
];

export default students;
