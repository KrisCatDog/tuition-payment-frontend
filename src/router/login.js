const login = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: { requiresAuth: false },
  },
];

export default login;
