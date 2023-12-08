import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/admin",
    alias: "/login",
    name: "Login",
    component: () => import("../../src/login.vue"),
  },
  {
    path: "/",
    component: () => import("../../src/HomePage.vue"),
    meta: { requiresAuth: true }, 
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/dashboard/index.vue"),
      },
      {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/dashboard/overview.vue"),
      },
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/index/index.vue"),
      },
      {
        path: "/instruction",
        name: "Instruction",
        component: () => import("../views/instruction/index.vue"),
      },
      {
        path: "partymember",
        name: "PartyMember",
        component: () => import("../views/partymember/index.vue"),
      },
      {
        path: "/partymember/:id",
        name: "PartyMember.view",
        component: () => import("../views/partymember/view.vue"),
      },
      {
        path: "introduction",
        name: "Introduction",
        component: () => import("../views/introduction/index.vue"),
      },
      {
        path: "/introduction/:id",
        name: "Introduction.view",
        component: () => import("../views/introduction/view.vue"),
      },
      {
        path: "form/:id/comment",
        name: "Form.comment",
        component: () => import("../views/comment/index.vue"),
      },
      {
        path: "form/:id/recommendation",
        name: "Form.recommendation",
        component: () => import("../views/recommendation/index.vue"),
      },
      {
        path: "form/:id/opinion",
        name: "Form.opinion",
        component: () => import("../views/opinion/index.vue"),
      },
      {
        path: "/commentbyyear",
        name: "CommentByYear",
        component: () => import("../views/CommentByYear/index.vue"),
      },
      {
        path: "position",
        name: "Position",
        component: () => import("../views/position/index.vue"),
      },
      {
        path: "/position/:id",
        name: "Position.view",
        component: () => import("../views/position/view.vue"),
      },
      {
        path: "/ward",
        name: "Ward",
        component: () => import("../views/ward/ward.vue"),
      },
      {
        path: "/ward/:id",
        name: "Ward.view",
        component: () => import("../views/ward/index.vue"),
      },
     
      {
        path: "account",
        name: "Account",
        component: () => import("../views/account/index.vue"),
      },
      {
        path: "personal",
        name: "Personal",
        component: () => import("../views/personal/index.vue"),
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("../views/permission/index.vue"),
      },
      {
        path: "role",
        name: "Role",
        component: () => import("../views/role/index.vue"),
      },
      {
        path: "OpinionRecommendation/:id/opinion",
        name: "OpinionRecommendation",
        component: () => import("../views/OpinionRecommendation/index.vue")
      },
      {
        path: "CommentByOpinion/:id/comment",
        name: "CommentByOpinion",
        component: () => import("../views/CommentByOpinion/index.vue")
      },
      {
        path: "YetRecommendation",
        name: "YetRecommendation",
        component: () => import("../views/YetRecommendation/index.vue")
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("token"); // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // Nếu trang yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
