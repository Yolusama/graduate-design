import { createRouter,createWebHashHistory } from "vue-router";

class Route {
  constructor(path, name, component) {
    this.path = path;
    this.name = name;
    this.component = component;
    this.children = [];
  }

  addSubRoute(route) {
    this.children.push(route);
  }

  redirectTo(path) {
    this.redirect = path;
    return this;
  }
}


const routes=[];
routes.push(new Route());
const router=createRouter({
       routes:routes,
       history:createWebHashHistory()
});

export default router;