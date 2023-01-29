<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="products.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('del', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-products="getData"></pagination>
  </div>
  <PaginationComponent
    :pagination="pagination"
    @getData="getData"
  ></PaginationComponent>
  <ProductsModal
    :isNew="isNew"
    :temp-product="tempProduct"
    :id="productId"
    @getData="getData"
    ref="ProductsModal"
  ></ProductsModal>
  <DelProduct
    :isNew="isNew"
    :temp-product="tempProduct"
    :id="productId"
    @getData="getData"
    ref="DelProduct"
  >
  </DelProduct>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductsModal from '@/components/ProductsModal.vue';
import DelProduct from '@/components/DelProduct.vue';

export default {
  data() {
    return {
      products: [
      ],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
      productId: ''
    }
  },
  components: {
    PaginationComponent,
    ProductsModal,
    DelProduct
  },
  methods: {
    checkLogin() {

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      this.$http.defaults.headers.common['Authorization'] = token;

      this.$http.post(`${import.meta.env.VITE_API}/api/user/check`)
        .then(() => {
          this.getData()
        })
        .catch((err) => {
          alert('請重新登入');
          this.$router.push('/')
        })
    },
    getData(page = 1) {
      this.$http.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          alert('異常情況，請重試~')
        })
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        };
        this.isNew = true;
        this.$refs.ProductsModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl ? this.tempProduct.imagesUrl : []
        this.isNew = false
        this.$refs.ProductsModal.openModal()
        this.productId = item.id
      } else if (status === 'del') {
        this.tempProduct = item
        this.$refs.DelProduct.openModal()
        this.productId = item.id
      }
    },
    delData() {
      this.$http.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch(() => {
          alert('異常情況，請重試~')
        })
    }
  },
  mounted() {
    this.checkLogin();
  }
}
</script>