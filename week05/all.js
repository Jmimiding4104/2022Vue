import modal from "./userProductModal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
    "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);
//設定語言
configure({
    generateMessage: localize("zh_TW"),
    validateOnInput: true, // 立即進行驗證
});

const app = Vue.createApp({
    data() {
        return {
            cartData: {},
            products: [],
            product: {},
            deleteAllCarts: {},
            cart: {},
            productId: "",
            isLoading: "",
            form: {
                user: {
                    email: "",
                    name: "",
                    address: "",
                    tel: "",
                },
                message: "",
            },
            apiUrl: "https://vue3-course-api.hexschool.io/v2",
            apiPath: "Jmimiding4104",
        };
    },
    components: {
        modal,
    },
    methods: {
        getProducts() {
            axios
                .get(`${this.apiUrl}/api/${this.apiPath}/products/all`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        getCarts() {
            axios
                .get(`${this.apiUrl}/api/${this.apiPath}/cart`)
                .then((res) => {
                    this.cartData = res.data.data;
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        addToCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty,
            };
            this.isLoading = id;
            axios
                .post(`${this.apiUrl}/api/${this.apiPath}/cart`, { data })
                .then(() => {
                    this.getCarts();
                    this.$refs.productsModal.closeModal();
                    this.isLoading = "";
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        delCartItem(id) {
            this.isLoading = id;
            axios
                .delete(`${this.apiUrl}/api/${this.apiPath}/cart/${id}`)
                .then(() => {
                    this.getCarts();
                    this.isLoading = "";
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        delCarts() {
            axios
                .delete(`${this.apiUrl}/api/${this.apiPath}/carts`)
                .then(() => {
                    alert("已成功清除購物車");
                    this.getCarts();
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        updateCarts(item) {
            const data = {
                product_id: item.id,
                qty: item.qty,
            };
            this.isLoading = item.id;
            axios
                .put(`${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`, { data })
                .then(() => {
                    this.getCarts();
                    this.isLoading = "";
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        sendOrder() {
            axios
                .post(`${this.apiUrl}/api/${this.apiPath}/order`, { data: this.form })
                .then((res) => {
                    alert(res.data.message);
                    this.$refs.form.resetForm();
                })
                .catch((err) => {
                    alert(err.data.message);
                });
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/;
            return phoneNumber.test(value) ? true : "需要正確的電話號碼";
        },
        openModal(id) {
            this.$refs.productsModal.openModal();
            this.productId = id;
        },
    },
    mounted() {
        this.getProducts();
        this.getCarts();
    },
});
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.mount("#app");