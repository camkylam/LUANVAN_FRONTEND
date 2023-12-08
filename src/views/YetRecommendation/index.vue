<script>

import { useRoute, useRouter } from 'vue-router'
import Table from "../../components/table/table_yetrecommendation.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Introduction from "../introduction/introduction_form.vue";
import Add from "../recommendation/add.vue";
import Search from "../../components/form/search.vue";

import View from "../introduction/view.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";

import { reactive, computed, watch, ref, onBeforeMount } from "vue";

//service
import PartyMember from "../../services/partymember.service";

import Recommentdation from "../../services/recommendation.service";

import { partymemberModel, recommedationModel, recommenwardsModel, CommentOfPartyMember,opinionModel, RecommendationByIdModel } from "../../assets/js/models"
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { isCreateRecommendation} from "../../use/getSessionItem";
import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Select_Advanced,
    Introduction,
    Add,
    Search,
    View 
  },
    setup(ctx){
      const data = reactive({
        yetrecommendation: partymemberModel,
        info: partymemberModel,
        viewValue: partymemberModel,
      // to create new recommendation
      introValue: partymemberModel,
      //to create new opinion
      renewValue: partymemberModel,
      //to create new comment
      assessValue: partymemberModel,

      recommendation: recommedationModel,
      opinion: opinionModel,
      comment: CommentOfPartyMember,
      })
      const roleName = sessionStorage.getItem("roleName")
      
      const refresh = async () => {
        const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.info = await http_getOne(PartyMember, _idPartyMember);
        //const _idPartyMember = sessionStorage.getItem("partymemberId");
        let partyCellIds = []
        partyCellIds = [data.info.PartyCell._id]
          
        const yetrecommendation = await Recommentdation.getAllPartyMember({partyCellIds})
        data.yetrecommendation = yetrecommendation.document
        // console.log(data.yetrecommendation)

    }
    const view = async (value) => {
      // console.log("alo")
      // FIND ONE PartyMember
      data.viewValue = await PartyMember.get(value);
      data.viewValue.birthday = formatDate(data.viewValue.birthday);
      data.viewValue.dateJoin = formatDate(data.viewValue.dateJoin);
      data.viewValue.dateOfficial = formatDate(data.viewValue.dateOfficial);
    };
    const router = useRouter();
    const renewOpinion = async (value) => {
    router.push({ name: "Form.opinion", params: { id: `${value}` } });
    data.comment = await CommentServices.getByPartymember(value._id);
    // console.log(data.comment)
    setTimeout(() => {
    window.location.reload();
  }, 200); 
  };

  const renewAssess = (value) => {
      router.push({ name: "Form.comment", params: { id: `${value}` } });
      setTimeout(() => {
    window.location.reload();
  }, 200); 
    };

    // Send new recommendation
    const renewIntro = async (value) => {
      router.push({ name: "Form.recommendation", params: { id: `${value}` } });
      data.introValue = await PartyMember.get(value);
      const recommendation = await Recommentdation.get(data.introValue._id)
      setTimeout(() => {
    window.location.reload();
  }, 200); 
    };
    onBeforeMount(async () => {
        await refresh();
    });

    return {
      data,
      refresh,
     view,
      renewOpinion,
      renewAssess,
      renewIntro,
      
      roleName
      
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">

      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">DANH SÁCH ĐẢNG VIÊN CHƯA TẠO THƯ GIỚI THIỆU</span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
      <!-- :disabled="isCreateRecommendation() ? false : true" -->
      <router-link
        :to="{ name: 'Introduction' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trở về</span>
      </router-link>
    </div>
        <Table :yetrecommendation="data.yetrecommendation"  :fields="[
      'Tên',
      'Mã Đảng viên',
      'Email',
      'Giới tính',
      'Diện miễn sinh hoạt',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" @view="(value) => {view(value);}"
     @renewOpinion="(value) => {renewOpinion(value);}" 
        @renewIntro="(value) => {renewIntro(value);}" 
        @renewAssess="(value) => {renewAssess(value);}" 
     /> 
     
    </div>
    <View :item="data.viewValue" />
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