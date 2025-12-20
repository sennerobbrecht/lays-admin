<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Admin Panel</h2>

      <ul class="menu">
        <li><router-link to="/admin">Dashboard</router-link></li>
      </ul>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  width: 240px;
  background: #222;
  color: #fff;
  padding: 20px;
}

.menu {
  margin-top: 20px;
  padding: 0;
  list-style: none;
}

.menu li {
  margin-bottom: 12px;
}

.menu a {
  color: white;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}
</style>
