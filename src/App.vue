<script>
import Navbar from "./components/layout/navbar.vue";
import Footer from "./components/layout/footer.vue";
import Sidebar from "./components/layout/sidebar.vue";
import Login from "./login.vue";
import { reactive, defineComponent, watchEffect, ref, computed } from "vue";
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
export default {
  components: {
    Footer,
    Navbar,
    Sidebar,
    Login,
  },
  setup() {
    const data = reactive({
      activeMenuResponsive: false,
    });
    const updateMenuResponsive = () => {
    };

    onBeforeMount(() => {
      
    });
    return {
      data,
      updateMenuResponsive,
    };
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
