import Vue from "vue";
import VueRouter from "vue-router";
import Users from "@/Users.vue";
import UserDetail from "@/UserDetail.vue";
import App from "@/App.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Users",
        component: Users
    },
    {
        path: "/User-Detail",
        name: "about",
        component: UserDetail
    },
    // Define more routes here
]

const router = new VueRouter({
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
