import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/css/styles.css'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
