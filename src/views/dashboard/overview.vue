<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import Pagination from "../../components/table/pagination.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import CommentForm from "../introduction/assessment_form.vue";
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
import TableCommentYear from "../../components/table/table_CommentByYear.vue";
import TableMeet from "../../components/table/table_dashmeet.vue";
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, RecommendationByIdModel,DashRecommementStatus,DashYeareValuation } from "../../assets/js/models"
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
    TableCommentYear,
    CommentForm,
    TableMeet
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
      partymember: partymemberModel,
      yetrecommendation: partymemberModel,
      acceptRecommendation: DashRecommementStatus,
      activeTable: "",
      yearInputValueEvaluation: '',
      Evaluation: DashYeareValuation,
      commentYear: DashYeareValuation,
      Meet: DashYeareValuation
    });
   
    const view = async (value) => {
      // FIND ONE PartyMember
      data.viewValue = await PartyMember.get(value);
      data.viewValue.birthday = formatDate(data.viewValue.birthday);
    };
    const router = useRouter();
    
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
      // console.log(data.lengthPartymember)

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
      status = ['confirmed','created'];
      const recommendations = await Recommentdation.getAllByStatusWithPartycell({status, partyCellId})
      data.lengthRecommendationStatus = recommendations?.document?.length
      data.acceptRecommendation =  recommendations?.document
      // console.log(data.acceptRecommendation)
      
      const yearInputValue = data.yearInputValueEvaluation;
      const year = yearInputValue
      
      // console.log(yearInputValue)
      const evaluation = await commentService.getByYearAndPartyCell({year,partyCellIds})
      data.Evaluation = evaluation.criterionEvaluationNameCounts
      data.commentYear = evaluation.document

      // console.log(data.commentYear)
      const meet = await commentService.getByYearAndPartyCellAndMeet({year, partyCellIds})
      data.Meet = meet.document
      // console.log(data.Meet)

    };
    const handleGetById = async (id, item) => {
    const rsPartyMember = await commentService.getById(id)
    if(!rsPartyMember.error){
      data.commentById = rsPartyMember.document
      // console.log(data.commentById)
      data.commentById.createdAt = formatDate(data.commentById.createdAt)
    }
     else {
      data.commentById = null;
  }
  };
    const handleBoxClick = (boxType) => {
      data.activeTable = boxType;
      // console.log(data.activeTable)
    };
    onMounted(async () => {
      await refresh();
    });
    const onFormSubmit = async () => {
      // Validate the year input
      const yearInput = parseInt(data.yearInputValueEvaluation);
      
      if (isNaN(yearInput) || yearInput < 0) {
        // Show an error message for invalid input
        alert_error("Năm không hợp lệ");
        return;
      }

      // Continue with the refresh logic
      await refresh();
    };


    return {
      data,
      handleBoxClick,
      view,
      onFormSubmit,
      handleGetById
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
          <span class="size-17 active-menu">Tổng quan</span>
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
      <p style="font-size: 25px; text-align: center;">ĐẢNG VIÊN TRONG CHI BỘ</p>
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
      <p style="font-size: 25px; text-align: center;">ĐẢNG VIÊN TRONG CHI BỘ CHƯA CÓ THƯ GIỚI THIỆU</p>
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
    <!-- TableYetAccept -->
    <div v-if="data.activeTable === 'recommendationstatus'">
      <p style="font-size: 25px; text-align: center;">ĐẢNG VIÊN CHƯA ĐƯỢC CHẤP NHẬN SINH HOẠT NƠI CƯ TRÚ</p>
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

    <div v-if="data.activeTable === 'criterionEvaluation'">
      <p style="font-size: 25px; text-align: center;">THỐNG KÊ</p>
      <form @submit.prevent="onFormSubmit">
      <p style="font-size: 17px; padding-left: 30px;">Tổng hợp phiếu nhận xét theo năm</p>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start">
          <input v-model="data.yearInputValueEvaluation" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần tổng hợp tiêu chí">
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Tổng hợp</span>
          </button>
        </div>
      </div>
    </form>
  <div style="display: flex; justify-content: center; align-items: center;">
<!-- Bảng thứ nhất -->
<div style="width: 45%;">
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
<div style="border-left: 1px solid black; height: 100px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 45%;">
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
<div style="display: flex; justify-content: center; align-items: center;">
<!-- Bảng thứ nhất -->
<div style="width: 45%;">
  
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
<div style="border-left: 1px solid black; height: 100px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 45%;">
  
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
<div style="display: flex; justify-content: center; align-items: center;">
<!-- Bảng thứ nhất -->
<div style="width: 45%;">
  
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
<div style="border-left: 1px solid black; height: 100px; margin: 0 10px;"></div>

<!-- Bảng thứ hai -->
<div style="width: 45%;">
 
      <TableEvalueE
        :Evaluation ="data.Evaluation"
        :fields="[
          'Biểu dương',
          'Không đề nghị',
          'Xem xét xử lý'
        ]"
      />
</div>

</div>
    </div>

    <div v-if="data.activeTable === 'commentYear'">
      <p style="font-size: 25px; text-align: center;">TỔNG HỢP PHIẾU NHẬN XÉT CỦA ĐẢNG VIÊN THEO NĂM</p>
      <form @submit.prevent="onFormSubmit">
      <p style="font-size: 17px; padding-left: 30px;">Tổng hợp phiếu nhận xét theo năm</p>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start">
          <input v-model="data.yearInputValueEvaluation" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần tổng hợp tiêu chí">
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Tổng hợp</span>
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
        ]"  @getbyId="handleGetById"

      />
      <CommentForm :commentById='data.commentById' :criterion = "data.criterionValue" :item="data.commentValue"/>
    </div>
    
    <div v-if="data.activeTable === 'meet'">
      <p style="font-size: 25px; text-align: center;">TỔNG HỢP ĐẢNG VIÊN KHÔNG THAM GIA HỌP Ở ĐỊA PHƯƠNG</p>
      <form @submit.prevent="onFormSubmit">
      <p style="font-size: 17px; padding-left: 30px;">Tổng hợp đảng viên không tham gia họp ở địa phương</p>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start">
          <input v-model="data.yearInputValueEvaluation" ref="yearInput" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần tổng hợp tiêu chí">
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Tổng hợp</span>
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
