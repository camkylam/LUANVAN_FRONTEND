<script>
import { useRouter, useRoute } from "vue-router";
import Table from "../../components/table/table_opinion.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Add from "../opinion/add.vue";
import Opinion from "../introduction/opinion_form.vue";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
//service
import PartyMember from "../../services/partymember.service";
import OpinionServices from "../../services/opinion.service";
import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, OpinionByIdModel } from "../../assets/js/models"
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { isComfirmOpinion } from "../../use/getSessionItem";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Opinion,
    Add
  },
    setup(ctx){
      const data = reactive({
          opinionValue: partymemberModel,
          opinion: opinionModel,
          opinions: opinionModel,
          addValue: partymemberModel,
          click: true,
          OpinionById: OpinionByIdModel,
      })
      const router = useRouter();
      const route = useRoute();
      const params = route.params.id;
      const renewOpinions = async (value) => {
        // data.click = false
        data.opinionValue = await PartyMember.get(value);
        const opinion = await OpinionServices.getByPartymember(params);
        // console.log(params);
        if (!opinion.error) {
        data.opinion = opinion.document;
          for (const opinionItem of data.opinion) {
          opinionItem.createdAt = formatDate(opinionItem.createdAt);
        }
      } else {
      data.opinion = null;
    }
  };
      const add = async(value) => {
        data.click = false
        data.addValue = await PartyMember.get(params);
        data.addValue.birthday = formatDate(data.addValue.birthday);
        // console.log(data.addValue)
      }
      
      
      const handleDelete = async (id, item) => {
      const isConfirmed = await alert_delete(
        "Xóa",
        `Bạn có chắc muốn xóa phiếu xin ý kiến này không!!`
      );
      if (isConfirmed) {
        const rsPartyMember = await OpinionServices.delete(id)

        if (rsPartyMember.error) {
          alert_error("Lỗi ", rsPartyMember.msg);
        } else {
          refresh();
          alert_success("Thành công", "Xóa phiếu xin ý kiến thành công");
        }
      }
      };

      const handleGetById = async(id, item) => {
        const rsPartyMember = await OpinionServices.getById(id)
        // console.log(rsPartyMember)
        if(!rsPartyMember.error){
          data.OpinionById = rsPartyMember.document
          data.OpinionById.createdAt = formatDate(data.OpinionById.createdAt);
        }
         else {
          data.OpinionById = null;
        }
      }

      const refresh = async () => {
        const opinions = await OpinionServices.getByPartymember(params);
        // console.log(opinions )
        if(!opinions.error){
            data.opinions = opinions.document
            for(const opinionsItem of data.opinions )
            opinionsItem.createdAt = formatDate(opinionsItem.createdAt)
        }
        else {
            data.opinions = null
        }
      }
      onBeforeMount(async () => {
        await refresh();
    });

    return {
      data,
      refresh,
      add,
      renewOpinions,
      handleDelete,
      handleGetById,
      isComfirmOpinion
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">PHIẾU XIN Ý KIẾN CỦA ĐẢNG VIÊN </span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
      <button v-if="isComfirmOpinion()" type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-add"
          @click="add">
          <span class="mx-2" style="color: white">Thêm phiếu xin ý kiến</span>
        </button>
        <Add v-if= "!data.click" @add="(value) => {add(value);}" :item="data.addValue" />
      <router-link
        :to="{ name: 'Introduction' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trở về</span>
      </router-link>
    </div>
        <Table :opinions="data.opinions" :fields="[
      // 'Mã phiếu xin ý kiến',
      'Ngày xin ý kiến',
    //   'Trạng thái giới thiệu',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]"  @delete="handleDelete"  @getbyId="handleGetById" 
     /> 
     <Opinion :opiniontById='data.OpinionById' />
    </div>
</template>
<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}

#add,
#delete-all {
  font-size: 14px;
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