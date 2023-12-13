<script>
import { useRoute, useRouter } from "vue-router";
import Table from "../../components/table/table_CommentByYear.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Add from "../comment/add.vue";
import CommentForm from "../introduction/assessment_form.vue";

import { ref, onBeforeMount, onMounted } from "vue";
import Criterion from "../../services/criterion";
import Comment from "../../services/comment.service";
import PartyMember from "../../services/partymember.service";
import { reactive } from "vue";
import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, commentModel, CommentByIdModel, AllCommentModel , CommentByYearModel } from "../../assets/js/models"

import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { alert_error } from "../../assets/js/common.alert";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
  
    Add,
    CommentForm
  },
  setup(ctx) {
    const data = reactive({
      commentValue: partymemberModel,
      criterionValue: commentModel,
      commentById: CommentByIdModel,
      commentByYear: CommentByYearModel,
      items: partymemberModel,
      valuecomment: commentModel,
    })
    const yearInputValue = ref("");
    const route = useRoute();
    const router = useRouter();

  const refresh = async () => {
    try {
      if (route.query && route.query.year) {
        yearInputValue.value = route.query.year;
      }
      // Gọi hàm không đồng bộ
      const commentByYear = await Comment.getByYear(yearInputValue.value);
      if(!commentByYear.error){
        data.commentByYear = commentByYear.document
        for(const commentsItem of data.commentByYear){
          //data.value = commentsItem.Opinion.Recommendation.PartyMember._id
          commentsItem.createdAt = formatDate(commentsItem.createdAt)
          //data.value = commentsItem.Criterion_Evaluations
        }
          
      }
      else {
        data.commentByYear = null
        alert_error(`${commentByYear.msg}`)
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
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
  };

  const handleGetById = async (id, item) => {
    const rsPartyMember = await Comment.getById(id)
    if(!rsPartyMember.error){
      data.commentById = rsPartyMember.document
      data.commentById.createdAt = formatDate(data.commentById.createdAt)
    }
     else {
      data.commentById = null;
  }
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
    onBeforeMount(async () => {
      await refresh();
    });

    onMounted(() => {
      if (route.query && route.query.year) {
        yearInputValue.value = route.query.year;
      }
    });
   
    return {
      refresh,
      yearInputValue,
      data,
      handleGetById,
      handleDelete
    };
  },
};
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">TỔNG HỢP PHIẾU NHẬN XÉT CỦA ĐẢNG VIÊN</span>
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
        <Table :commentByYear="data.commentByYear" :col="data.value" :valuecomment ="data.valuecomment" :fields="[
      'Tên đảng viên',
      'Ngày nhận xét',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" @getbyId="handleGetById"  @delete="handleDelete"
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