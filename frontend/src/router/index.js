import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import AdminPage from "../views/AdminPage.vue";
import AdminUsers from "../views/AdminUsers.vue";
import ArticleAlone from "../views/ArticleAlone.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/admin",
    name: "admin-page",
    component: AdminPage,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "users",
        name: "admin-users",
        component: AdminUsers,
      },
    ],
  },
  {
    path: "/article/:id",
    name: "one-article",
    component: ArticleAlone,
    params: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
