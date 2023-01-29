<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"><h1>Week06</h1></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/Admin/AdminProducts">
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Admin/AdminOrders">
              訂單列表
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/Front/HomeView">
              前台首頁
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Front/ProductsView">
              產品
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Front/CartView">
              購物車
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"> 登出 </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
