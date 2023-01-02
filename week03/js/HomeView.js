import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

let productModal = '';
let delProductModal = '';

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'Jmimiding4104',
            products: [
            ],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false
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
        },
        openModal(status, item) {
            if (status === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            } else if (status === 'edit') {
                this.tempProduct = JSON.parse(JSON.stringify(item));
                this.isNew = false;
                productModal.show();
            } else if (status === 'del') {
                this.tempProduct = { ...item };
                delProductModal.show();
            }
        },
        updateData() {
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`
            let httpMethod = 'post';

            if (!this.isNew) {
                api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
                httpMethod = 'put'
            };

            axios[httpMethod](api, { data: this.tempProduct })
                .then((res) => {
                    alert(res.data.message);
                    productModal.hide();
                    this.getData();
                })
                .catch((err) => {
                    console.dir(err)
                })
        },
        createImg() {
            this.tempProduct.imagesUrl.push('')
        },
        delData() {
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    alert(res.data.message);
                    delProductModal.hide();
                    this.getData();
                })
                .catch((err) => {
                    console.dir(err)
                })
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
    }
});

app.mount('#app');
