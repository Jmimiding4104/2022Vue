import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'Jmimiding4104',
            products: [
            ],
            temp: {}
        }
    },
    methods: {
        checkLogin() {

            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${this.apiUrl}/api/user/check`)
                .then(() => {
                    this.getData()
                })
                .catch((err) => {
                    console.dir(err);
                    alert('請重新登入');
                    window.location = 'LoginView.html'
                })
        },
        getData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
                .then((res) => {
                    this.products = res.data.products
                })
        }
    },
    mounted() {
        this.checkLogin();
    }
});

app.mount('#app');
