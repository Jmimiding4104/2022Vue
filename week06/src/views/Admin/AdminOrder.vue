<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>電子信箱</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
            <td>{{ item.user?.email }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="paid"
                  v-model="item.is_paid"
                  @change="updateOrder(item)"
                />
                <label class="form-check-label" for="paid">
                  <span
                    :class="{
                      'text-success': item.is_paid,
                      'text-danger': !item.is_paid,
                    }"
                  >
                    {{ item.is_paid ? "已付款" : "未付款" }}
                  </span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >
                  檢視
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
        </template>
      </tbody>
    </table>
  </div>
  <PaginationComponent
    :pagination="pagination"
    @getData="getData"
  ></PaginationComponent>
  <OrderModal
    :temp-order="tempOrder"
    @updateOrder="updateOrder"
    ref="OrderModal"
  ></OrderModal>
  <DelOrderModal
    :temp-order="tempOrder"
    @getData="getData"
    ref="DelOrderModal"
  ></DelOrderModal>
</template>
<script>
import OrderModal from '@/components/OrderModal.vue'
import DelOrderModal from '@/components/DelOrderModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data() {
    return {
      orders: [],
      due_date: '',
      is_paid: '',
      tempOrder: {},
      orderId: '',
      isLoading: false,
      pagination: ''
    }
  },
  components: {
    OrderModal,
    DelOrderModal,
    PaginationComponent
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
      const apiUrl = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/orders?page=${page}`
      this.$http.get(apiUrl, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch(() => {
          alert('異常情況，請重試~')
        })
    },
    updateOrder(item) {
      const Url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`
      const paid = { is_paid: item.is_paid }
      this.$http.put(Url, { data: paid })
        .then((res) => {
          this.getData()
        })
        .catch(() => {
          alert('異常情況，請重試~')
        })
    },
    openModal(status, item) {
      if (status === 'edit') {
        this.tempOrder = JSON.parse(JSON.stringify(item))
        this.$refs.OrderModal.openModal()
      } else if (status === 'del') {
        this.tempOrder = JSON.parse(JSON.stringify(item))
        this.$refs.DelOrderModal.openModal()
        this.orderId = item.id
      }
    }
  },
  mounted() {
    this.checkLogin();
  }
}
</script>