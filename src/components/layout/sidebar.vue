<script>

import { reactive, ref, defineEmits, defineProps } from "vue";

export default {
  props: {
    activeIndex: {
      type: Number,
      default: 1,
    },
    activeIndexChild: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const slide = reactive({
      role: sessionStorage.getItem("roleName"),
      selectedItem: {},
    })
    const roleName = slide.role
    if (roleName == "đảng viên") {
      const data = reactive({
        sidebarToggle: true,
        sidebarTasks: [
          {
            id: 1,
            icon: "Home",
            name_icon: "Trang chủ",
            name: "Index",
            role: [],
            children: [],
          },
          {
            id: 2,
            icon: "account_circle",
            name_icon: "Cập nhật thông tin cá nhân",
            name: "Personal",
            role: [],
            children: [],
          },
          {
            id: 3,
            icon: "contract_edit",
            name_icon: "Sinh hoạt nơi cư trú",
            name: "Introduction",
            role: [],
            children: [],
          },
        ]
      });
      const setActiveMenu = (value) => {
        sessionStorage.setItem("activeMenu", value);
      };
      return {
        slide,
        data,
        setActiveMenu,
      };
    }
    else if (roleName == "bí thư chi bộ trường cnnt và tt") {
      const data = reactive({
        sidebarToggle: true,
        sidebarTasks: [
          {
            id: 1,
            icon: "Home",
            name_icon: "Trang chủ",
            name: "Index",
            role: [],
            children: [],
          },
          {
            id: 2,
            icon: "dashboard_customize",
            name_icon: "Thống kê",
            name: "Dashboard",
            role: [],
            children: [],
          },

          {
            id: 3,
            icon: "account_circle",
            name_icon: "Cập nhật thông tin cá nhân",
            name: "Personal",
            role: [],
            children: [],
          },
          {
            id: 4,
            icon: "patient_list",
            name_icon: "Thông tin Đảng viên",
            name: "PartyMember",
            role: [],
            children: [],
          },
          {
            id: 5,
            icon: "contract_edit",
            name_icon: "Sinh hoạt nơi cư trú",
            name: "Introduction",
            role: [],
            children: [],
          },
          
        ]
      });
      const setActiveMenu = (value) => {
        sessionStorage.setItem("activeMenu", value);
      };
      return {
        slide,
        data,
        setActiveMenu,
      };
    }
    else if (roleName == "đảng ủy, chi ủy cơ sở trường cntt và tt") {
      const data = reactive({
        sidebarToggle: true,
        sidebarTasks: [
          {
            id: 1,
            icon: "Home",
            name_icon: "Trang chủ",
            name: "Index",
            role: [],
            children: [],
          },
          {
            id: 2,
            icon: "dashboard_customize",
            name_icon: "Thống kê",
            name: "Overview",
            role: [],
            children: [],
          },
          {
            id: 3,
            icon: "account_circle",
            name_icon: "Cập nhật thông tin cá nhân",
            name: "Personal",
            role: [],
            children: [],
          },
          {
            id: 4,
            icon: "patient_list",
            name_icon: "Thông tin Đảng viên",
            name: "PartyMember",
            role: [],
            children: [],
          },
          {
            id: 5,
            icon: "contract_edit",
            name_icon: "Sinh hoạt nơi cư trú",
            name: "Introduction",
            role: [],
            children: [],
          },
         
        ]
      });
      const setActiveMenu = (value) => {
        sessionStorage.setItem("activeMenu", value);
      };
      return {
        slide,
        data,
        setActiveMenu,
      };
    }
    else if (roleName == "bí thư chi bộ nơi cư trú" || roleName == "đảng ủy cơ sở nơi quản lý cư trú") {
      const data = reactive({
        sidebarToggle: true,
        sidebarTasks: [
          {
            id: 1,
            icon: "Home",
            name_icon: "Trang chủ",
            name: "Index",
            role: [],
            children: [],
          },
          {
            id: 2,
            icon: "account_circle",
            name_icon: "Cập nhật thông tin cá nhân",
            name: "Personal",
            role: [],
            children: [],
          },
          {
            id: 3,
            icon: "contract_edit",
            name_icon: "Sinh hoạt nơi cư trú",
            name: "Introduction",
            role: [],
            children: [],
          },
        ]
      });
      const setActiveMenu = (value) => {
        sessionStorage.setItem("activeMenu", value);
      };
      return {
        slide,
        data,
        setActiveMenu,
      };
    }

    else {
      const data = reactive({
        sidebarToggle: true,
        sidebarTasks: [
          {
            id: 1,
            icon: "home",
            name_icon: "Trang chủ",
            name: "Index",
            role: [],
            children: [],
          },
          {
            id: 2,
            icon: "patient_list",
            name_icon: "Đảng viên",
            name: "PartyMember",
            role: [],
            children: [],
          },
          {
            id: 3,
            icon: "account_circle",
            name_icon: "Tài khoản",
            name: "Account",
            role: [],
            children: [],
          },
        ]
      });
      const setActiveMenu = (value) => {
        sessionStorage.setItem("activeMenu", value);
      };
      return {
        slide,
        data,
        setActiveMenu,
      };
    }

  },
};
</script>

<template>
  <div class="border-sidebar">
    <div class="d-flex flex-column">
      <div id="img-logo" class="d-flex justify-content-center">
        <img class="img border-img" src="../../assets/images/coDang.jpg" alt="" />
      </div>
      <div class="mt-3">
        <div v-for="(sidebarTask, index) in data.sidebarTasks" :key="sidebarTask.id"
          class="d-flex flex-column align-items-center">
          <router-link :to="{ name: sidebarTask.name }" class="my-2 d-flex overflow-hidden" :class="[
            sidebarTask.id == activeIndex
              ? 'border-nav-item'
              : 'none-border-nav-item',
          ]" @click="(activeIndex = index + 1), setActiveMenu(activeIndex)">
            <div class="d-flex py-1 align-items-center">
              <span class="material-symbols-outlined mx-2 py-1 px-1" :class="[
                sidebarTask.id == activeIndex
                  ? 'none-border-icon'
                  : 'border-icon',
              ]">
                {{ sidebarTask.icon }}
              </span>
              <span class="d-flex align-items-center" style="font-size: 18px">{{
                sidebarTask.name_icon
              }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-sidebar {
  border: 1px solid var(--gray);
  border-radius: 5px;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

.img {
  margin-top: 2rem;
  width: 250px;
}

.border-img {
  border: 1px solid var(--gray);
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

.border-nav-item {
  /* border: 1px solid blue; */
  background-color: rgba(231, 228, 228, 0.8);
  width: 90%;
  cursor: pointer;
  /* border-radius: 5px; */
  color: rgb(14, 14, 15);
  text-decoration: none;
}


.none-border-nav-item {
  width: 90%;
  cursor: pointer;
  border: none;
  color: black;
  text-decoration: none;
}

.border-icon {
  border-radius: 5px;
}

.none-border-icon {
  border: none;
}
</style>