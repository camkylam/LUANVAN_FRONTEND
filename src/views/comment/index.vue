<script>
import { useRouter, useRoute } from "vue-router";
import Table from "../../components/table/table_comment.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
// import Assessment from "../introduction/assessment_form.vue";
import Add from "../comment/add.vue";
import CommentForm from "../introduction/assessment_form.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";

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
    CommentForm
  },
    setup(ctx){
      const data = reactive({
          commentValue: partymemberModel,
          click: true,
          valuecomment:commentModel,
          criterionValue: commentModel,
          //noteValue: commentModel,
          commentById: CommentByIdModel,
      })
      const route = useRoute();
      const params = route.params.id;
      const renewComment = async (value) => {
        data.click = false
        data.commentValue = await PartyMember.get(params);
        // console.log(data.commentValue)
        data.commentValue.birthday = formatDate(data.commentValue.birthday);
        data.commentValue.dateJoin= formatDate(data.commentValue.dateJoin);
        data.commentValue.dateOfficial= formatDate(data.commentValue.dateOfficial);

       // const noteValue = await Criterion

        const criterionValue = await Criterion.getAll(data.commentValue.exemption)
        data.criterionValue = criterionValue.document
        // console.log(criterionValue)

        const valuefalse = false
        const criterion = await Criterion.getAll(valuefalse)
        // console.log("aloooo",criterion)
      };

    const handleDelete = async (id, item) => {
      const isConfirmed = await alert_delete(
        "Xóa",
        `Bạn có chắc muốn xóa phiếu nhận xét này không!!`
      );
      if (isConfirmed) {
        const rsPartyMember = await Comment.delete(id)

        if (rsPartyMember.error) {
          alert_error("Lỗi ", rsPartyMember.msg);
        } else {
          refresh();
          alert_success("Thành công", "Xóa phiếu nhận xét thành công");
        }
      }
    };

    const handleGetById = async (id, item) => {

        data.commentValue = await PartyMember.get(params);
        // console.log(data.commentValue)
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

      const refresh = async () => {
        const comments = await Comment.getByPartymember(params)
        // console.log(comments)
        if(!comments.error){
          data.comments = comments.document
          // console.log(data.comments)
          for(const commentsItem of data.comments )
          commentsItem.createdAt = formatDate(commentsItem.createdAt)
        }
        const valuefalse = "false"
        const valuecomment = await Criterion.getAll(valuefalse)
        data.valuecomment = valuecomment.document
        const firstFiveValues = data.valuecomment.slice(0, 5);
        for (const item of firstFiveValues) {
          if (item.Criterion_Evaluations && item.Criterion_Evaluations.length > 0) {
          item.level = item.Criterion_Evaluations[0].name;
          item.level2 = item.Criterion_Evaluations[1].name;
          item.level3 = item.Criterion_Evaluations[2].name;
          // console.log("Danh sách giá trị với mức:", item.level);
          // console.log("Danh sách giá trị với mức 2:", item.level2);
          // console.log("Danh sách giá trị với mức 3:", item.level3);
        }
        
      }

        // console.log("Danh sách giá trị với mức:", firstFiveValues);
        // console.log("Các giá trị đầu tiên:", firstFiveValues);
      }
      onBeforeMount(async () => {
        await refresh();
      });
    return {
      data,
      refresh,
      renewComment,
      handleDelete,
      handleGetById,
      comfirmComment
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">NHẬN XÉT CỦA ĐẢNG VIÊN </span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
      <button v-if="comfirmComment()" type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-comment"
          @click="renewComment">
          <span class="mx-2" style="color: white">Thêm phiếu nhận xét</span>
        </button>
        <Add v-if= "!data.click" @renewComment="(value) => {renewComment(value);}" :item="data.commentValue" :criterion = "data.criterionValue"/>
     
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
    ]" @delete="handleDelete"  @getbyId="handleGetById" 
     /> 
       <CommentForm :commentById='data.commentById' :criterion = "data.criterionValue" :item="data.commentValue"/>
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