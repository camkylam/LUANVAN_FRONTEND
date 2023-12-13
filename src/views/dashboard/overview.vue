<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import Pagination from "../../components/table/pagination.vue";
import CommentForm from "../introduction/assessment_form.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import Box from "../../components/box/box.vue";
import SelectOption from "../../components/box/select.vue";
import moment from "moment";
import PartyMember from "../../services/partymember.service";
import Recommentdation from "../../services/recommendation.service";
import commentService from "../../services/comment.service";
import Table from "../../components/table/table_dashpartymember.vue";
import TableRecommendation from "../../components/table/table_dashyetrecommendation.vue";
import TableYetAccept from "../../components/table/table_dashyetaccept.vue";
import TableEvalue  from "../../components/table/table_dashEvalue.vue";
import TabelEvalueA from "../../components/table/table_dashEvalueA.vue";
import TableEvalueB from "../../components/table/table_dashEvalueB.vue";
import TableEvalueC from "../../components/table/table_dashEvalueC.vue";
import TableEvalueD from "../../components/table/table_dashEvalueD.vue";
import TableEvalueE from "../../components/table/table_dashEvalueE.vue";
import TableEvalueT from "../../components/table/table_dashEvalueT.vue";
import TableEvalueG from "../../components/table/table_dashEvalueG.vue";
import TableEvalueH from "../../components/table/table_dashEvalueH.vue";
import Introduction from "../introduction/introduction_form.vue";
import View from "../introduction/view.vue";
import TableCommentYear from "../../components/table/table_CommentByYear.vue";
import TableMeet from "../../components/table/table_dashmeet.vue";
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { partymemberModel, DashYeareValuationTrue,recommedationModel, recommenwardsModel, opinionModel, RecommendationByIdModel,DashRecommementStatus,DashYeareValuation,  CommentByIdModel} from "../../assets/js/models"
import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import Index from "../CommentByYear/index.vue";
import CommentServices from "../../services/comment.service";
export default {
  components: {
    Pagination,
    Search,
    Select,
    Box,
    SelectOption,
    Table,
    TableRecommendation,
    TableYetAccept,
    Index,
    TableEvalue,
    TabelEvalueA,
    TableEvalueB,
    TableEvalueC,
    TableEvalueD,
    TableEvalueE,
    TableEvalueT,
    TableEvalueG,
    TableEvalueH,
    TableCommentYear,
    CommentForm,
    TableMeet,
    View,
    Introduction
  },
  setup() {
    const data = reactive({

items: [
  partymemberModel,
],
viewValue: partymemberModel,
activeEdit: false,
entryValue: 5,
numberOfPages: 1,
totalRow: 0,
startRow: 0,
endRow: 0,
currentPage: 1,
searchText: "",
activeMenu: 1,
activeSelectAll: false,
activeEdit: false,
addValue: {},
entryType: "",
selectAll: [
  {
    checked: false,
  },
],
lengthPartymember: 0,
lengthRecommendation: 0,
lengthRecommendationStatus: 0,
lengthCommentYear: 0,
partymember: partymemberModel,
yetrecommendation: partymemberModel,
acceptRecommendation: DashRecommementStatus,
activeTable: "",
yearInputValueEvaluation: '',
Evaluation: DashYeareValuation,
commentYear: DashYeareValuation,
CommentYearTrue: DashYeareValuationTrue,
EvaluationTrue: DashYeareValuationTrue,
commentById: CommentByIdModel,
introValue: partymemberModel,
Meet: DashYeareValuation
});

const view = async (value) => {
// FIND ONE PartyMember
data.viewValue = await PartyMember.get(value);
data.viewValue.birthday = formatDate(data.viewValue.birthday);
};
const router = useRouter();
const renewIntro = async (value) => {
router.push({ name: "Form.recommendation", params: { id: `${value}` } });
data.introValue = await PartyMember.get(value);
const recommendation = await Recommentdation.get(data.introValue._id)

};
    
    //refresh
    const refresh = async () => {
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.info = await http_getOne(PartyMember, _idPartyMember);
      let cellIds = []
      cellIds = ["07b75908-48b0-4263-b3ae-9ed7eac664be", // Value 1
            "3ea8567e-fe68-4b49-8050-8b9ca9c2253a",
            "8e84339f-8533-4b28-8c23-832cbbaaeb96",
            "c5c5580f-fa96-4394-95c4-71a9b798355d",
            "44723cb0-5124-4f30-b4a6-14667a91a8f4",
            "070b0e1d-2c32-4dab-ada3-66dec7c487b1",
            "4d1a2515-1039-420e-a408-39606aa105ee",
            "d296cb19-b11c-463e-9989-7be19e729b06",
            "be9f8e33-43e5-4e20-a4cb-4d67b81819b3",
            "aa8471f4-4e53-457b-b234-f14957e79e6c"
          ]
      data.partymember = await PartyMember.getAllByCell({ cellIds })
      data.lengthPartymember = data.partymember?.length;

      let partyCellIds=[]
      partyCellIds = ["07b75908-48b0-4263-b3ae-9ed7eac664be", // Value 1
            "3ea8567e-fe68-4b49-8050-8b9ca9c2253a",
            "8e84339f-8533-4b28-8c23-832cbbaaeb96",
            "c5c5580f-fa96-4394-95c4-71a9b798355d",
            "44723cb0-5124-4f30-b4a6-14667a91a8f4",
            "070b0e1d-2c32-4dab-ada3-66dec7c487b1",
            "4d1a2515-1039-420e-a408-39606aa105ee",
            "d296cb19-b11c-463e-9989-7be19e729b06",
            "be9f8e33-43e5-4e20-a4cb-4d67b81819b3",
            "aa8471f4-4e53-457b-b234-f14957e79e6c"
          ]
      const yetrecommendation = await Recommentdation.getAllPartyMember({partyCellIds})
      data.lengthRecommendation = yetrecommendation?.document?.length
      data.yetrecommendation = yetrecommendation.document
      console.log(data.lengthRecommendation )


      let status=[]
      let partyCellId = []
      partyCellId = ["07b75908-48b0-4263-b3ae-9ed7eac664be", // Value 1
            "3ea8567e-fe68-4b49-8050-8b9ca9c2253a",
            "8e84339f-8533-4b28-8c23-832cbbaaeb96",
            "c5c5580f-fa96-4394-95c4-71a9b798355d",
            "44723cb0-5124-4f30-b4a6-14667a91a8f4",
            "070b0e1d-2c32-4dab-ada3-66dec7c487b1",
            "4d1a2515-1039-420e-a408-39606aa105ee",
            "d296cb19-b11c-463e-9989-7be19e729b06",
            "be9f8e33-43e5-4e20-a4cb-4d67b81819b3",
            "aa8471f4-4e53-457b-b234-f14957e79e6c"
          ]
      //status = ['confirmed'];
      status = ['created']
      const recommendations = await Recommentdation.getAllByStatusWithPartycell({status, partyCellId})
      data.lengthRecommendationStatus = recommendations?.document?.length
      data.acceptRecommendation =  recommendations?.document

      const yearInputValue = data.yearInputValueComment;
      const year = yearInputValue;
      console.log(year )

      const yearInputValueEvaluation = data.yearInputValueEvaluation
      const yeartrue = yearInputValueEvaluation
      const yearfalse = yearInputValueEvaluation

      const yearInputMeet = data.yearInputValueMeet
      const yearmeet = yearInputMeet

      
      const evaluation = await commentService.getByYearAndPartyCell({year,partyCellIds})
      data.lengthCommentYear = evaluation?.document?.length
      data.commentYear = evaluation.document

      const evaluationFalse = await commentService.getByYearAndPartyCellExemptionFalse({yearfalse,partyCellIds})
      data.Evaluation = evaluationFalse.criterionEvaluationNameCounts

      const evaluationTrue = await commentService.getByYearAndPartyCellExemptionTrue({yeartrue,partyCellIds})
      data.EvaluationTrue = evaluationTrue.criterionEvaluationCountsByCriterion
      data.CommentYearTrue = evaluationTrue.document

      const meet = await commentService.getByYearAndPartyCellAndMeet({yearmeet, partyCellIds})
      data.Meet = meet.document


    };
    const handleGetById = async (id, item) => {
    const rsPartyMember = await commentService.getById(id)
    if(!rsPartyMember.error){
      data.commentById = rsPartyMember.document
      data.commentById.createdAt = formatDate(data.commentById.createdAt)
    }
     else {
      data.commentById = null;
  }
  };
    const handleBoxClick = (boxType) => {
      data.activeTable = boxType;
    };
    onMounted(async () => {
      await refresh();
    });
    const onFormSubmit = async () => {
     
     const yearInputComment = parseInt(data.yearInputValueComment);
    
     console.log("Evaluation Year:", data.yearInputValueEvaluation);
  console.log("Comment Year:", data.yearInputValueComment);
  console.log("Meet Year:", data.yearInputValueMeet);
     
     
     if (isNaN(yearInputComment) || yearInputComment < 0) {
       alert_error("Năm không hợp lệ");
       return;
     }

     await refresh();
   };
   const onFormSubmitEvaluation = async () => {
    const yearInputEvaluation = parseInt(data.yearInputValueEvaluation);
    if (isNaN(yearInputEvaluation) || yearInputEvaluation < 0) {
      alert_error("Năm không hợp lệ");
      return;
    }
    await refresh();
  };
  const onFormSubmitMeet = async () => {
    const yearInputMeet = parseInt(data.yearInputValueMeet);
    if (isNaN(yearInputMeet) || yearInputMeet < 0) {
      alert_error("Năm không hợp lệ");
      return;
    }
    await refresh();
  };

   return {
     data,
     handleBoxClick,
     view,
     onFormSubmit,
     onFormSubmitEvaluation,
     onFormSubmitMeet,
     handleGetById,
     renewIntro
   };
  },
};
</script>
<template>
  <div class="border-box content ml-2">
    <div class="d-flex my-2 mx-3 menu justify-content-end" style="border: none">
      <!-- BTN tổng quan chi tiêt -->
      <div class="d-flex menu mx-2 my-2 justify-content-end">
        <a class="active-menu">
          <span class="size-17 active-menu">Thống kê</span>
        </a>
      </div>
    </div>
    <div class="border-hr mb-3"></div>
    <!-- Box -->
    <Box
    :partymember="data.lengthPartymember"
    :recommendation="data.lengthRecommendation"
    :recommendationstatus = "data.lengthRecommendationStatus"
    @boxClick="handleBoxClick"
    ></Box>

   
    <hr>
    <!-- Table -->
    <div v-if="data.activeTable === 'partymember'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">ĐẢNG VIÊN TRONG TRƯỜNG CNTT VÀ TT</p>
      <Table
        :partymember="data.partymember"
        :fields="[
          'Tên',
          'Mã Đảng viên',
          'Email',
          'Giới tính',
          'Chức vụ',
          'Xã, phường',
          'Quận, huyện',
          'Tỉnh, thành phố',
        ]"
      />
      <Pagination
        :numberOfPages="data.numberOfPages"
        :totalRow="data.totalRow"
        :startRow="data.startRow"
        :endRow="data.endRow"
        :currentPage="data.currentPage"
        @update:currentPage="(value) => (data.currentPage = value)"
        class="mx-3"
      />
    </div>
    <div v-if="data.activeTable === 'recommendation'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">ĐẢNG VIÊN CHƯA CÓ THƯ GIỚI THIỆU</p>
      <TableRecommendation
        :items="setPages"
        :yetrecommendation = "data.yetrecommendation"
        :fields="[
          'Tên',
      'Mã Đảng viên',
      'Email',
      'Giới tính',
      'Diện miễn sinh hoạt',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
        ]"
         @view="(value) => { view(value); }"
      />
      <View :item="data.viewValue"></View>
    </div>
    <!-- TableYetAccept -->
    <div v-if="data.activeTable === 'recommendationstatus'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">ĐẢNG VIÊN CHƯA ĐƯỢC CHẤP NHẬN SINH HOẠT NƠI CƯ TRÚ</p>
      <TableYetAccept
        :acceptRecommendation ="data.acceptRecommendation"
        :fields="[
          'Tên',
          'Mã Đảng viên',
          'Giới tính',
          'Diện miễn sinh hoạt nơi cư trú',
          'Khu vực, ấp',
          'Xã, phường',
          'Quận, huyện',
          'Tỉnh, thành phố',
        ]"
          @view="(value) => { view(value); }"
        @renewIntro="(value) => {renewIntro(value);}"
      />
      <View :item="data.viewValue"></View>
    </div>

    <div v-if="data.activeTable === 'criterionEvaluation'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">THỐNG KÊ TIÊU CHÍ ĐÁNH GIÁ NHẬN XÉT THEO NĂM</p>
      <form @submit.prevent="onFormSubmitEvaluation">
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start">
          <input v-model="data.yearInputValueEvaluation" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%; margin-left: 80px;" placeholder="Nhập năm cần thống kê" required>
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Thống kê</span>
          </button>
        </div>
      </div>
    </form>
    <p style="font-size: 20px; text-align: center; font-weight: bold; padding-bottom: 15px; padding-top: 15px;">Phiếu nhận xét đối với đảng viên không được miễn sinh hoạt nơi cư trú</p>
  <div style="display: flex; justify-content: center; ">
<!-- Bảng thứ nhất -->
<div style="width: 47%;">
  <TableEvalue
    :Evaluation="data.Evaluation"
    :fields="[
      'Nêu gương tốt',
      'Nêu gương',
      'chưa nêu gương'
    ]"
  /><br>
</div>

<!-- Dấu gạch đứng -->
<div style="border-left: 1px solid white; height: 200px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 47%;">
  <TabelEvalueA
    :Evaluation="data.Evaluation"
    :fields="[
      'Gương mẫu đi đầu',
      'Gương mẫu ',
      'Chưa gương mẫu'
    ]"
  /><br>
</div>

</div>
<div style="display: flex; justify-content: center; ">
<!-- Bảng thứ nhất -->
<div style="width: 47%;">
  
  <TableEvalueB
        :Evaluation ="data.Evaluation"
        :fields="[
          'Tham gia đầy đủ',
          'Tham gia chưa đầy đủ',
          'Không tham gia'
        ]"
      /><br>
      
</div>

<!-- Dấu gạch đứng -->
<div style="border-left: 1px solid white; height: 200px; margin: 0 10px;"></div>
<!-- Bảng thứ hai -->
<div style="width: 47%;">
  
  <TableEvalueC
        :Evaluation ="data.Evaluation"
        :fields="[
          'Thường xuyên, tích cực',
          'Thường xuyên',
          'Chưa thường xuyên'
        ]"
      /><br>
</div>
</div>
<div style="display: flex; justify-content: center; ">
<!-- Bảng thứ nhất -->
<div style="width: 47%;">
  
      <TableEvalueD
        :Evaluation ="data.Evaluation"
        :fields="[
          'Rất tích cực',
          'Tích cực',
          'Chưa tích cực'
        ]"
      />
</div>

<!-- Dấu gạch đứng -->
<div style="border-left: 1px solid white; height: 200px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 47%;">
 
      <TableEvalueE
        :Evaluation ="data.Evaluation"
        :fields="[
          'Biểu dương',
          'Không đề nghị',
          'Xem xét xử lý'
        ]"
      />
</div>



</div><br>

<p style="font-size: 20px; text-align: center; font-weight: bold; padding-bottom: 15px; padding-top: 15px;">Phiếu nhận xét đối với đảng viên được miễn sinh hoạt nơi cư trú</p>
<div style="display: flex; justify-content: center; align-items: center;">
<!-- Bảng thứ nhất -->
<div style="width: 47%;">
      <TableEvalueT
        :EvaluationTrue ="data.EvaluationTrue"
        :fields="[
          'Nêu gương tốt',
          'Nêu gương',
          'Chưa nêu gương'
        ]"
      />
</div>

<!-- Dấu gạch đứng -->
<div style="border-left: 1px solid white; height: 200px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 47%;">
 
      <TableEvalueG
      :EvaluationTrue ="data.EvaluationTrue"
        :fields="[
          'Thực hiện tốt',
          'Thực hiện',
          'Chưa thực hiện'
        ]"
      />
</div>



</div><br>
<div style="display: flex; justify-content: center; align-items: center;">
<!-- Bảng thứ nhất -->
<div style="width: 47%;">
      <TableEvalueH
        :EvaluationTrue ="data.EvaluationTrue"
        :fields="[
          'Thực hiện tốt',
          'Thực hiện',
          'Chưa thực hiện'
        ]"
      />
</div>






</div>
<br>

    </div>

    <div v-if="data.activeTable === 'commentYear'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">THỐNG KÊ PHIẾU NHẬN XÉT CỦA ĐẢNG VIÊN THEO NĂM</p>
      <form @submit.prevent="onFormSubmit">
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start" style="padding-bottom: 15px;">
          <input v-model="data.yearInputValueComment" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần thống kê" required>
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Thống kê</span>
          </button>
        </div>
      </div>
    </form>
      <TableCommentYear
        :commentYear ="data.commentYear"
        :fields="[
          'Tên',
          'Mã Đảng viên',
          'Giới tính',
          'Diện miễn sinh hoạt',
          'Khu vực, ấp',
          'Xã, phường',
          'Quận, huyện',
          'Tỉnh, thành phố',
        ]" @getbyId="handleGetById"
      />
      <CommentForm :commentById='data.commentById' :criterion = "data.criterionValue" :item="data.commentValue"/>
    </div>

    <div v-if="data.activeTable === 'meet'">
      <p style="font-size: 25px; text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold; padding-top: 25px; padding-bottom: 25px;">THỐNG KÊ ĐẢNG VIÊN KHÔNG THAM GIA HỌP Ở ĐỊA PHƯƠNG</p>
      <form @submit.prevent="onFormSubmitMeet">
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start" style="padding-bottom: 15px;">
          <input v-model="data.yearInputValueMeet" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần thống kê" required>
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Thống kê</span>
          </button>
        </div>
      </div>
    </form>
      <TableMeet
        :meet ="data.Meet"
        :fields="[
          'Tên',
          'Mã Đảng viên',
          'Giới tính',
          'Diện miễn sinh hoạt',
          'Khu vực, ấp',
          'Xã, phường',
          'Quận, huyện',
          'Tỉnh, thành phố',
        ]" @getbyId="handleGetById"
      />
      <CommentForm :commentById='data.commentById' :criterion = "data.criterionValue" :item="data.commentValue"/>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 0;
}
.border-box-chart {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.border-hr {
  border-top: 1px solid var(--gray);
}
.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}
.menu a {
  border: 1px solid var(--gray);
  border-radius: 0px;
  padding: 8px 12px;
  font-size: 15px;
}
.active-menu {
  color: blue;
}
select {
  background-color: #f6f6f6;
  border: 1px solid #b8c2cc;
  font-size: 16px;
}

.pad {
  padding: 1px;
}
.select {
  width: 125px;
}
.search {
  width: 300px;
}
.content {
  margin-top: 0px;
}
@media screen and (max-width: 738px) {
  .select {
    width: 90px;
  }
  .search {
    width: 210px;
    margin-left: 2px !important ;
    margin-right: 2px;
  }
  .border-box {
    width: 890px;
    margin-left: 10px;
  }
}
@media screen and (max-width: 992px) {
  .select {
    width: 90px;
  }
  .search {
    width: 210px;
    margin-left: 10px !important ;
    margin-right: 10px;
  }
  .border-box {
    width: 100%;
    margin-left: 10px;
  }
}
</style>
