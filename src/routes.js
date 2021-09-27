import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Track from "./views/Track.vue";
import Auth from './views/Auth.vue';
import Profile from './views/Profile.vue';
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", component: Home, meta: { title: "Home" } },
  {
    path: "/about",
    meta: { title: "About" },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  {
    path: "/track",
    meta: { title: "Track", requiresAuth: true },
    component: Track,
  },
  { path: "/auth", meta: { title: "Authentication", requiresUnauth: true }, component: Auth },
  { path: "/profile", meta: { title: "Profile", requiresAuth: true }, component: Profile },
  { path: "/:path(.*)", component: NotFound },
];
