<script>
import { useRouter, useRoute } from "vue-router";
import Table from "../../components/table/table_commentbyopinion.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
// import Assessment from "../introduction/assessment_form.vue";
import Assessment from "../introduction/assessment_form.vue";
import Add from "../comment/add.vue";
import CommentForm from "../introduction/assessment_form.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Opinion from "../../services/opinion.service";
import OpinionId from "../introduction/opinion_form.vue"
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import Criterion from "../../services/criterion";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";

//service
import PartyMember from "../../services/partymember.service";

import Recommentdation from "../../services/recommendation.service";
import Comment from "../../services/comment.service";


import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, commentModel, CommentByIdModel, AllCommentModel } from "../../assets/js/models"
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { comfirmComment,signedComment } from "../../use/getSessionItem";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Select_Advanced,
    Add,
    CommentForm,
    OpinionId,
    Assessment 
  },
    setup(ctx){
      const data = reactive({
          
      })
      const route = useRoute();
      const opinionId  = route.params.id;
      //console.log(params)
      const refresh = async () => {
        const comments = await Comment.getByOpinionId({opinionId})
        // console.log(comments)
        if(!comments.error){
          data.comments = comments.document
          // console.log(data.comments)
          data.comments.createdAt = formatDate(data.comments.createdAt)
          // console.log(data.comments.createdAt)
        }
      }
      const handleGetById = async (id, item) => {

    const rsPartyMember = await Comment.getById(id)
    // console.log(rsPartyMember.document)
    if(!rsPartyMember.error){
      data.commentById = rsPartyMember.document
      data.commentById.createdAt = formatDate(data.commentById.createdAt)
    }
     else {
      data.commentById = null;
  }
  // console.log(data.commentById)
};

    
  onBeforeMount(async () => {
    await refresh();
  });

    return {
      data,
      refresh,
      handleGetById
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">PHIẾU NHẬN XÉT CỦA ĐẢNG VIÊN CỦA ĐẢNG VIÊN </span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
    
      <router-link
        :to="{ name: 'Introduction' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trở về</span>
      </router-link>
    </div>
        <Table :comments="data.comments" :fields="[
      'Ngày nhận xét',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" @getbyId="handleGetById"
     /> 
     <Assessment :commentById='data.commentById' :criterion = "data.criterionValue" :item="data.commentValue" />
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