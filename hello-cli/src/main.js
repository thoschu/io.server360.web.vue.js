import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';

import App from './App.vue';
import Info from './components/Info.vue';
import Images from './components/Images.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueLogger, {
    isEnabled: true,
    logLevel: Vue.config.productionTip ? 'error' : 'debug',
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
});

const routes = [
    {path: '/info', component: Info},
    {path: '/images/:url?', component: Images}
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
