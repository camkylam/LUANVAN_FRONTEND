<script>
// import Add from "./add.vue";

import Table from "../../components/table/table_account.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";

import { reactive, computed, watch, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

import Account from "../../services/account.service";
import Role from "../../services/role.service";

import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_info, alert_delete_wide, alert_input_text, alert_mail } from "../../assets/js/common.alert";



export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    
  
    
  },
  setup(ctx) {
    const data = reactive({
      items: [],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      itemAdd: {
        name: "",
        content: "",
        time_duration: "",
      },
      activeEdit: false,
      editValue: {},
      searchSelect: "",
      optionSelect: null,
      choseSearch: "",
      selectAll: [
        {
          checked: false,
        },
      ],
    });

    const entryValueRoleAccount = ref("Vai trò tài khoản");
    const toString = computed(() => {

      if (data.choseSearch == "partymember") {
        return data.items.map((value, index) => {
          return [value.partymember].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "userName") {
        return data.items.map((value, index) => {
          return [value.user_name].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "role") {
        return data.items.map((value, index) => {
          return [value.role].join("").toLocaleLowerCase();
        });
      } else {
        return data.items.map((value, index) => {
          return [value.partymember, value.user_name, value.role]
            .join("")
            .toLocaleLowerCase();
        });
      }
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.items.length;
        return data.items;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (data.items.length > 0) {
        if (setNumberOfPages.value == 0 || data.entryValue == "All") {
          data.entryValue = data.items.length;
          data.numberOfPages = 1;
        } else data.numberOfPages = setNumberOfPages.value;
        data.startRow = (data.currentPage - 1) * data.entryValue + 1;
        data.endRow = data.currentPage * data.entryValue;
        return filtered.value.filter((item, index) => {
          return (
            index + 1 > (data.currentPage - 1) * data.entryValue &&
            index + 1 <= data.currentPage * data.entryValue
          );
        });
      } else return data.items.value;
    });

    // routers
    const router = useRouter();

    // watch
    const activeMenu = ref(1);
    watch(activeMenu, (newValue, oldValue) => {
      if (activeMenu.value == 2) {
        router.push({ name: "RoleName" });
      } else if (activeMenu.value == 3) {
        router.push({ name: "Permission" });
      }
    });

    const deleteOne = async (_id) => {
      const account = await http_getOne(Account, _id);

      const isConfirmed = await alert_delete(
        `Xoá tài khoản`,
        `Bạn có chắc chắn muốn xoá tài khoản ${account.user_name} không ?`
      );

      if (isConfirmed == true) {
        const result = await http_deleteOne(Account, _id);
        alert_success(
          `Xoá tài khoản`,
          `Bạn đã xoá thành công tài khoản ${result.document.user_name}.`
        );
        refresh();
      }
    };

    const view = (_id) => {
    };

    const refresh = async () => {
      data.items = await http_getAll(Account);
      for (let value of data.items) {
        value.checked = false;
      }

      data.items = data.items.map((value, index) => {
        return {
          _id: value._id,
          user_name: value.user_name,
          partymember: value.PartyMember.name,
          role: value.Role.name,
          permision: [...value.Role.Permissions],
        };
      });


      const roles = await http_getAll(Role);
      data.optionSelect = [...roles];
    };

    const handleSelectAll = (value) => {

      if (value == false) {
        for (let value1 of data.items) {
          value1.checked = true;
        }
      } else {
        for (let value1 of data.items) {
          value1.checked = false;
        }
      }
    };

    const delete_a = async (objectData) => {
    };

    const updateEntryValueRoleAccount = (value) => {
      entryValueRoleAccount.value = value;
    };

    //watch
    watch(entryValueRoleAccount, (newValue, oldValue) => {
      if (entryValueRoleAccount.value != "Vai trò tài khoản") {
        refresh();
      } else {
        refresh();
      }
    });

    // Hàm callback được gọi trước khi component được mount (load)
    onBeforeMount(async () => {
      refresh();

    });

    return {
      data,
      setPages,
      activeMenu,
      entryValueRoleAccount,
      deleteOne,
      view,
      delete_a,
      refresh,
      updateEntryValueRoleAccount,
      handleSelectAll,
      
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2" >
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link :to="{ name: 'Account' }" @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']">
        <span class="size-17">Tài khoản</span>
      </router-link>
      <router-link :to="{ name: 'Role' }" @click="activeMenu = 2"
        :class="[activeMenu == 2 ? 'active-menu' : 'none-active-menu']">
        <span class="size-18">Vai trò</span>
      </router-link>
      <router-link :to="{ name: 'Permission' }" @click="activeMenu = 3"
        :class="[activeMenu == 3 ? 'active-menu' : 'none-active-menu']">
        <span class="size-18">Quyền</span>
      </router-link>
    </div>
    <!-- Filter -->
    <!-- <div class="border-hr mb-3"></div> -->
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        
        <Search class="ml-3" style="width: 300px; height: 40px;" @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText" @choseSearch="async (value) => (

            (data.choseSearch = value),
            (data.currentPage = 1)
          )
            " @refresh="(data.entryValue = 'All'), (data.currentPage = 1)" :options="[
    {
      _id: 'partymember',
      name: 'Tìm kiếm theo tên đảng viên',
    },
    {
      _id: 'userName',
      name: 'Tìm kiếm theo tên tài khoản',
    },
    {
      _id: 'role',
      name: 'Tìm kiếm theo vai trò tài khoản',
    },
  ]" />
      </div>
      <div class="d-flex align-items-start">
      </div>
    </div>
    <!-- Table -->
    <Table :items="setPages" :fields="['Tên đảng viên', 'Tên tài khoản', 'Vai trò tài khoản', 'Quyền']"
      :labels="['partymember', 'user_name', 'role']" :showActionList="[false, false, true]" :startRow="data.startRow"
      :selectAll="data.selectAll" @selectAll="(value) => handleSelectAll(value)" @delete="(value) => deleteOne(value)"
      @edit="(value, value1) => (
        (data.editValue = value),
        (data.activeEdit = value1),
        (data.editValue.time_duration =
          data.editValue.time_duration.toUpperCase())
      )
        " @view="(value) => view(value)" />
    <!-- Pagination -->
    <Pagination :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
      :endRow="data.endRow" :currentPage="data.currentPage" @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3" />
  </div>
</template>

<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}

.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}

.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}

.active-menu {
  color: blue;
}

.none-active-menu {
  color: var(--dark);
}

.border-hr {
  border-top: 1px solid var(--gray);
}

#add,
#delete-all {
  font-size: 14px;
}

.input {
  background-color: inherit;
  border: 1px solid var(--gray);
  border-radius: 5px;
}
</style>