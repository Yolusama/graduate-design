import { createRouter,createWebHashHistory } from "vue-router";
import Route from "./Route";


const routes=[];
routes.push(new Route());
const router=createRouter({
       routes:routes,
       history:createWebHashHistory()
});

export default router;