<script>
import { useRouter, useRoute } from "vue-router";
import Table from "../../components/table/table_opinionbyrecommendation.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
// import Assessment from "../introduction/assessment_form.vue";
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
    //Add,
    CommentForm,
    OpinionId,
    Add
  },
    setup(ctx){
      const data = reactive({
        addValue: partymemberModel,
          click: true,
      })
      const router = useRouter();
      const route = useRoute();
      const recommendationId = route.params.id;
      //console.log(params)
      const refresh = async () => {
        const comments = await Opinion.getAllOpinionsByRecommendation({recommendationId})
        // console.log(comments)
        if(!comments.error){
          data.comments = comments.document
          // console.log(data.comments)
          for(const commentsItem of data.comments )
          commentsItem.createdAt = formatDate(commentsItem.createdAt)
        }
      }
      const goToFormOpinion = async(item) => {
        router.push({ name: 'CommentByOpinion', params: { id: `${item._id}` } });
      // console.log("Navigating to Form.opinion with item:", item);
      };

      // const add = async(value) => {
      //   data.click = false
      //   data.addValue = await PartyMember.get(params);
      //   data.addValue.birthday = formatDate(data.addValue.birthday);
      //   console.log(data.addValue)
      // }

      const handleGetById = async(id, item) => {
        const rsPartyMember = await Opinion.getById(id)
        // console.log(rsPartyMember)
        if(!rsPartyMember.error){
          data.OpinionById = rsPartyMember.document
          data.OpinionById.createdAt = formatDate(data.OpinionById.createdAt);
        }
         else {
          data.OpinionById = null;
        }
      }

    
  onBeforeMount(async () => {
    await refresh();
  });

    return {
      data,
      refresh,
      handleGetById,
      goToFormOpinion,
      //add
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">PHIẾU XIN Ý KIẾN CỦA ĐẢNG VIÊN CỦA ĐẢNG VIÊN </span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
      <!-- <button v-if="isComfirmOpinion()" type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-add"
          @click="add">
          <span class="mx-2" style="color: white">Thêm phiếu xin ý kiến</span>
        </button>
        <Add v-if= "!data.click" @add="(value) => {add(value);}" :item="data.addValue" /> -->
      <router-link
        :to="{ name: 'Introduction' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trở về</span>
      </router-link>
    </div>
        <Table :comments="data.comments" :fields="[
      'Ngày xin ý kiến',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" @getbyId="handleGetById"  @goToFormOpinion="goToFormOpinion"
     /> 
     <OpinionId :opiniontById='data.OpinionById' />
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