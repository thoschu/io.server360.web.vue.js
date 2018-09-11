import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import VeeValidate from 'vee-validate';

import App from './App.vue';

Vue.config.productionTip = false;

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

new Vue({
    render: h => h(App)
}).$mount('#app');
