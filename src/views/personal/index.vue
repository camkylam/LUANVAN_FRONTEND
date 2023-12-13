<script>
import Mail from "../../components/box/mail.vue";
import Table from "../../components/table/table_personal.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "./add.vue";
import Edit from "./edit.vue";
import View from "./view.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import PartyMember from "../../services/partymember.service";

import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import { formatDate } from "../../assets/js/common";
import SelectCDU from "../../components/box/select_cdu.vue";
import { partymemberModel } from '../../assets/js/models'
// import { isDeletePartyMember, isEditPartyMember, isReadPartyMember, isCreatePartyMember, isMail } from "../../use/getSessionItem";
import mailService from "../../services/mail.service";
import accountService from "../../services/account.service";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    Edit,
    View,
    Select_Advanced,
    Add,
    Mail,
   
    SelectCDU,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        partymemberModel,
      ],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      activeEdit: false,
      editValue: {},
      viewValue: partymemberModel,
      cty: {},
      district: {},
      ward: {},
      position: {},
      selectAll: [{ checked: false }],
      showActiveEdit: false,
      showActiveAdd: false,
      resetDataAdd: false,
      info: [],
    });

    const view = async (value) => {
      // FIND ONE PartyMember
      data.viewValue = await PartyMember.get(value);
      data.viewValue.birthday = formatDate(data.viewValue.birthday);
      data.viewValue.dateJoin = formatDate(data.viewValue.dateJoin);
      data.viewValue.dateOfficial = formatDate(data.viewValue.dateOfficial);
    };

    //FRESH
    const refresh = async () => {
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.info = await http_getOne(PartyMember, _idPartyMember);
    };
    const router = useRouter();

    // watch
    const activeMenu = ref(1);

    // const edit = async (editValue) => {
    //   const result = await http_update(PartyMember, editValue._id, editValue);
    //   console.log(result)
    //   if (!result.error) {
    //     alert_success(`Sửa Đảng viên`, `${result.msg}`);
    //     refresh();
    //   } else {
    //     alert_error(`Sửa Đảng viên`, `${result.msg}`);
    //   }
    // };

    onBeforeMount(async () => {
      await refresh();
    });

    return {
      data,
      activeMenu,
      //edit,
      refresh,
      view,
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2">
    <div class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 20px; text-align: center; font-weight: bold;">VUI LÒNG KIỂM TRA LẠI
        THÔNG TIN CÁ NHÂN VÀ CẬP NHẬT LẠI THÔNG TIN NẾU CÓ SAI SÓT</span>

    </div>
    <!--  -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex align-items-start">
      </div>
    </div>
    <!-- Table -->
    <Table :info="data.info" :items="setPages" :fields="[
      'Tên',
      'Sđt',
      'Email',
      'Chức vụ',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" :selectOne="(id, item) => handleSelectOne(id, item)" @edit="(value, value1) => (
  (data.editValue = value),
  (data.activeEdit = value1),
  (data.showActiveEdit = true)
)
  " @view="(value) => {
    view(value);
  }
    " />

    <Edit v-if="data.showActiveEdit" :item="data.editValue" :class="[data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="data.activeEdit = false" :position="data.items.positionId" :ward="data.items.wardId"
      @edit="edit(data.editValue)" @refresh="async () => {
        await refresh();
        data.showActiveEdit = false;
      }
        " />

    <View :item="data.viewValue" />
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

.form-control {
  background-color: inherit;
  border: 1px solid var(--gray);
}

@media screen and (max-width: 739px) {
  .select {
    width: 90px;
  }

  .search {
    width: 210px;
    margin-left: 2px !important;
    margin-right: 2px;
  }

  .border-box {
    width: 1000px;
    margin-right: 50px !important;
  }

  .menu {
    padding: 0;
  }
}

@media screen and (max-width: 992px) {
  .select {
    width: 90px;
  }

  .search {
    width: 210px;
    margin-left: 2px !important;
    margin-right: 2px;
  }

  .border-box {
    width: 100%;
    margin-left: 10px;
  }
}
</style>
