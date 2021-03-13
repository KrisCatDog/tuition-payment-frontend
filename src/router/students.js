const students = [
  {
    path: "/students",
    name: "Students",
    component: () => import("@/views/Student"),
    meta: { requiresAuth: true },
  },
  {
    path: "/students/create",
    name: "StudentsCreate",
    component: () => import("@/views/Student/Create"),
    meta: { requiresAuth: true },
  },
  {
    path: "/students/:id/edit",
    name: "StudentsEdit",
    component: () => import("@/views/Student/Edit"),
    meta: { requiresAuth: true },
  },
];

export default students;
