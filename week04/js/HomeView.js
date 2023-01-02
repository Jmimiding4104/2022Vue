import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

import pagination from "./pagination.js";
import tempProductModal from "./productModal.js";
import delProductModal from "./delProductModal.js";

const app = createApp({
    components: {
        pagination,
        delProductModal,
        tempProductModal
    },
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'Jmimiding4104',
            products: [
            ],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
            pagination: {}
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
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
        },
        openModal(status, item) {
            if (status === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                this.$refs.productModal.openModal();
            } else if (status === 'edit') {
                this.tempProduct = JSON.parse(JSON.stringify(item));
                this.isNew = false;
                this.$refs.productModal.openModal();
            } else if (status === 'del') {
                this.tempProduct = { ...item };
                this.$refs.delProductModal.openModal();
            }
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
    }
});

app.mount('#app');
