import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user)
                .then((res) => {
                    console.log(this.user)
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                    window.location = 'HomeView.html';
                })
                .catch((err) => {
                    console.dir(err);
                    alert("帳號或密碼輸入錯誤");
                });
        }
    },
});

app.mount('#app');