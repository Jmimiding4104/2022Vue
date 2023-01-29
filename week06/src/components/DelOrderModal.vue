<template>
  <div
    id="delProductModal"
    ref="delOrderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong>
          {{ tempOrder.title }}(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delOrder()">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
  props: ['id', 'tempOrder'],
  data() {
    return {
    }
  },
  methods: {
    delOrder() {
      const Url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/order/${this.id}`
      this.$http.delete(Url)
        .then(() => {
          this.delOrderModal.hide()
          this.getData()
        })
        .catch(() => {
          alert('異常情況，請重試~')
        })
    },
    getData() {
      this.$emit('getData')
    },
    openModal() {
      this.delOrderModal.show()
    }
  },
  mounted() {
    this.delOrderModal = new Modal(this.$refs.delOrderModal)
  }
}
</script>
