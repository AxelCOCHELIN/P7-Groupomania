import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Feed",
    name: "Feed",
    component: Feed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
