import { createApp } from "vue";
import { createPinia } from "pinia";

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true
})

setLocale('zh_TW')

const app = createApp(App);

app.use(createPinia());
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('IsLoading', Loading)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
