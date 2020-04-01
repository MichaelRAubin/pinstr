import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

function loadView(path) {
  return () => import("../views/" + path);
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView("Home.vue")
  },
  {
    path: '/dashboard',
    beforeEnter: authGuard,
    component: loadView("Dashboard.vue"),
    children: [{
      path: "",
      name: "Dashboard.Profile",
      component: loadView("Profile.vue")
    }, {
      path: "pins",
      name: "Dashboard.Pins",
      component: loadView("Pins.vue")
    },
    {
      path: "MyPins",
      name: "Dashboard.MyPins",
      component: loadView("MyPins.vue")
    },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
