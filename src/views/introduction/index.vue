<script>
import Mail from "../../components/box/mail.vue";
import mailService from "../../services/mail.service";
import Table from "../../components/table/table_introduction.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import View from "./view.vue";
import Introduction from "./introduction_form.vue";
import Opinion from "./opinion_form.vue";
import Assessment from "./assessment_form.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Index from "../CommentByYear/index.vue";

import Comment from "../../views/comment/index.vue"

import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
//service
import PartyMember from "../../services/partymember.service";
import Position from "../../services/position.service";
import PartyCell from "../../services/partycell.service";
import Recommentdation from "../../services/recommendation.service";
import OpinionServices from "../../services/opinion.service";
import CommentServices from "../../services/comment.service";

import CtyServices from "../../services/cty_province.service";
import districtsServices from "../../services/district.service";
import wardsServices from "../../services/ward.service";
import Swal from "sweetalert2";
import FormWizard from "../../components/form/form-wizard.vue";
import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { partymemberModel, recommedationModel,opinionModel, CommentOfPartyMember } from "../../assets/js/models"

import SelectCDU from "../../components/box/select_cdu.vue";
import { isDeletePartyMember, isEditPartyMember, isReadPartyMember, isCreatePartyMember, isMail } from "../../use/getSessionItem";


export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    DeleteAll,
    View,
    Select_Advanced,
    Mail,
    FormWizard,
    SelectCDU,
    Introduction,
    Opinion,
    Assessment,
    Comment, 
    Index
  },
  setup(ctx) {
    const data = reactive({
      info: partymemberModel,
      members: [ // to display table for tan, tai
        partymemberModel,
      ],
      recommendations: [
        recommedationModel,
      ],
      accept: [
        recommedationModel,
      ],
      itemType: "",

      // to create new recommendation for introValue member
      recommendation: recommedationModel,
      introValue: partymemberModel,

      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",

      // to display detail info of selected member
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

      
      cty: {},
      district: {},
      ward: {},
      position: {},
      partycell: {},
      selectAll: [{ checked: false }],
      resetDataAdd: false
    });
    const roleName = sessionStorage.getItem("roleName")

    const view = async (value) => {
      // FIND ONE PartyMember
      data.viewValue = await PartyMember.get(value);
      data.viewValue.birthday = formatDate(data.viewValue.birthday);
    };

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
 
    const YetRecommendation = async(value) => {
        //YetRecommendation
        router.push({ name: "YetRecommendation"});
      }

    const CommentByYear = async () => {
      const yearInputValue = document.getElementById('yearInput').value.trim();

    // Check if the input is not empty
    if (yearInputValue !== '') {
      // Navigate to the CommentByYear route with the query parameter
      router.push({ name: "CommentByYear", query: { year: yearInputValue } });
    } else {
      alert_error("Vui lòng nhập năm trước khi tổng hợp.")
    }
  };
    
    const toString = computed(() => searchData(
      data.choseSearch,
      (data.itemType === 'members') ? data.members : ((data.itemType === 'accept') ? data.accept : data.recommendations)
    ));
    const filter = computed(() => updateItems(
      (data.itemType === 'members') ? data.members : ((data.itemType === 'accept') ? data.accept : data.recommendations),
      toString,
      data.searchText
    ))
    const filtered = computed(() => {
      const result = updateRows(
        data.searchText,
        (data.itemType === 'members') ? data.members : ((data.itemType === 'accept') ? data.accept : data.recommendations),
        filter
      )
      data.totalRow = result.totalRow
      return result.items
    })
    const totalPages = computed(() => setNumberOfPages(filtered.value.length, data.entryValue))
    const setPages = computed(() => setPagination(data, totalPages, filtered))

    const entryValuePartyCell = ref(""); //id
    const entryNamePartyCell = ref("Chi bộ"); //name
    const entryValuePosition = ref(""); //id
    const entryNamePosition = ref("Chức vụ"); //name
    const entryValueCty = ref("");
    const entryNameCty = ref("Tỉnh, thành phố");
    const entryValueDistrict = ref(""); //id
    const entryNameDistrict = ref("Quận, huyện"); //name
    const entryValueWard = ref("");
    const entryNameWard = ref("Xã, phường");

    //FRESH
    const refresh = async () => {
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.info = await http_getOne(PartyMember, _idPartyMember);
      let cellIds = []
      let status = []

      switch (roleName) {
        case "đảng viên":
          data.itemType = 'info'
          data.info = await PartyMember.get(_idPartyMember)
          console.log(data.info)
          break
        case "bí thư chi bộ trường cnnt và tt":
          cellIds = [data.info.PartyCell._id]
          data.itemType = 'members'
          data.members = await PartyMember.getAllByCell({ cellIds })
          break
        case "đảng ủy, chi ủy cơ sở trường cntt và tt":
          data.itemType = 'members'
          cellIds = [
            "07b75908-48b0-4263-b3ae-9ed7eac664be", // Value 1
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
          data.members = await PartyMember.getAllByCell({ cellIds })
          break
        case "đảng ủy cơ sở nơi quản lý cư trú":
          data.itemType = 'recommendations'
            status = ['confirmed','accepted'];
            let wardId = data.info.Hamlet.Ward._id;
            const recommendations = await Recommentdation.getAllByWard({status, wardId})
            if(!recommendations.error){
              data.recommendations = recommendations.document
            }
          break
          ///Thêm mới
        case "bí thư chi bộ nơi cư trú":
          data.itemType = 'accept'
          status = ['accepted'];
            let hamletId = data.info.Hamlet._id;
            const accept = await Recommentdation.getAllByWard({status, hamletId})
            if(!accept.error){
              data.accept = accept.document
              // console.log(data.accept)
            }
          break
      }
      if(data.itemType == 'info'){
          data.recommendation = await Recommentdation.get(_idPartyMember);
          data.opinion = await OpinionServices.getByPartymember(_idPartyMember);
          data.comment = await CommentServices.getByPartymember(_idPartyMember);
      }
          //data.comment = value.comment

      if (data.itemType == 'members')
        for (let value of data.members) {
          value.checked = false;
          data.renewValue = await PartyMember.get(value._id);
          value.recommendation = await Recommentdation.get(value._id);
          value.opinion = await OpinionServices.getByPartymember(value._id);
          value.comment = await CommentServices.getByPartymember(value._id);
          data.comment = value.comment
        }
      if (data.itemType == 'recommendations')
        for (let value of data.recommendations) {
          value.checked = false;
          data.renewValue = await PartyMember.get(value.PartyMember._id);
          value.recommendation = await Recommentdation.get(value.PartyMember._id);
          value.opinion = await OpinionServices.getByPartymember(value.PartyMember._id);
          value.comment = await CommentServices.getByPartymember(value.PartyMember._id);
          data.comment = value.comment
        }
      if(data.itemType == 'accept')
        for(let value of data.accept){
          value.checked = false;
          data.renewValue = await PartyMember.get(value.PartyMember._id);
          value.recommendation = await Recommentdation.get(value.PartyMember._id);
          value.opinion = await OpinionServices.getByPartymember(value.PartyMember._id);
          value.comment = await CommentServices.getByPartymember(value.PartyMember._id);
          data.comment = value.comment
      }
      // Lọc
      data.position = await http_getAll(Position);
      data.partycell = await http_getAll(PartyCell);
      data.selectAll[0].checked = false;
    };
    const router = useRouter();

    // watch
    const activeMenu = ref(1);

    // ****** LỌC ******
    watch(entryValuePosition, async (newValue, oldValue) => {
      data.comment = [];

      if (newValue == "") {
        data.currentPage = 1;
        await refresh();
        return;
      }
      data.currentPage = 1;

      data.members = await http_getAll(partymemberService);
      //1.lấy danh sách đảng viên chức vụ x
      if (entryValuePosition.value.length > 0) {
        data.members = data.items.filter((val) => {
          return val.positionId == entryValuePosition.value;
        });
      }
      if (
        entryValueCty.value != "" &&
        entryValueDistrict.value != "" &&
        entryValueDistrict.value != "1" &&
        entryValueWard.value != "" &&
        entryValueWard.value != "1"
      ) {
        data.members = data.items.filter((value) => {
          return (
            value.Hamlet.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Hamlet.Ward.District._id == entryValueDistrict.value &&
            value.Hamlet.Ward._id == entryValueWard.value
          );
        });
      }
      //2. chọn 1 Tỉnh, thành phố và 1 quận, huyện
      else if (
        entryValueCty.value != "" &&
        entryValueDistrict.value != "" &&
        entryValueDistrict.value != "1"
      ) {
        data.members = data.items.filter((value) => {
          return (
            value.Ward.District.Cty_Province._id == entryValueCty.value &&
            value.Ward.District._id == entryValueDistrict.value
          );
        });
      } else if (entryValueCty.value != "") {
        data.members = data.items.filter((val) => {
          return (
            val.Ward.District.Cty_Province._id == entryValueCty.value
          );
        });
      }
      //Thay đổi
      data.selectAll[0].checked = false;
      for (let value of data.members) {
        value.checked = false;
        data.renewValue = await PartyMember.get(value._id);
          value.recommendation = await Recommentdation.get(value._id);
          // console.log(value.recommendation.recommendationStatus);
          value.comment = await CommentServices.getByPartymember(value._id);
          // console.log(value.comment.document )
          data.comment.push(value.comment);
      }
      for (let value of data.members) {
        for (let array of arrayCheck.data) {
          if (array._id == value._id) {
            value.checked = true;
            data.renewValue = await PartyMember.get(value._id);
            value.recommendation = await Recommentdation.get(value._id);
            // console.log(value.recommendation.recommendationStatus);
            value.comment = await CommentServices.getByPartymember(value._id);
          // console.log(value.comment.document )
          data.comment.push(value.comment);
            break;
          }
          value.checked = false;
        }
      }
    });
    const updateEntryValuePosition = (value) => {
      entryValuePosition.value = value;
    };

    watch(entryValuePartyCell, async (newValues, oldValues) => {
      // Ensure newValues is an array
      const selectedPartyCells = Array.isArray(newValues) ? newValues : [newValues].filter(cell => cell !== "");

      if (selectedPartyCells.length === 0) {
        data.currentPage = 1;
        await refresh();
        return;
      }

      data.currentPage = 1;

      // Fetch all party members
      data.members = await http_getAll(PartyMember);

      // Filter based on selected "Chi bộ" values
      data.members = data.items.filter(val => selectedPartyCells.includes(val.PartyCell._id));

      // Rest of your code for changing the 'checked' property
    });
    const updateEntryValuePartyCell = (value) => {
      entryValuePartyCell.value = value;
    };

    const handleSelectAll = (value, itemType) => {
      arrayCheck.data = [];
      if (value == false) {
        if (itemType == 'members')
          for (let value1 of data.members) {
            value1.checked = true;
            arrayCheck.data.push(value1);
          }
        if (itemType == 'recommendations')
          for (let value1 of data.recommendations) {
            value1.checked = true;
            arrayCheck.data.push(value1);
          }
        if (itemType == 'accept')
          for (let value1 of data.accept) {
            value1.checked = true;
            arrayCheck.data.push(value1);
          }
      }
      else {
        if (itemType == 'members')
          for (let value1 of data.members) {
            value1.checked = false;
            const index = arrayCheck.data.indexOf(value1._id);
            if (index !== -1) {
              arrayCheck.data.splice(index, 1);
            }
          }
        if (itemType == 'recommendations') {
          for (let value1 of data.recommendations) {
            value1.checked = false;
            const index = arrayCheck.data.indexOf(value1._id);
            if (index !== -1) {
              arrayCheck.data.splice(index, 1);
            }
          }
        }
        if (itemType == 'accept') {
          for (let value1 of data.accept) {
            value1.checked = false;
            const index = arrayCheck.data.indexOf(value1._id);
            if (index !== -1) {
              arrayCheck.data.splice(index, 1);
            }
          }
        }
      }
    };

    const handleSelectOne = (id, item) => {
      if (item.checked == false) {
        arrayCheck.data.push(item);
      }
      else {
        arrayCheck.data = arrayCheck.data.filter((value, index) => {
          return value._id != id;
        });
      }
      data.selectAll[0].checked = false;
    };

    const mail = ref(false);
    const showMail = () => {
      // const count = (data.itemType == 'members')
      //   ? data.members.filter((element) => element.checked === true).length
      //   : data.recommendations.filter((element) => element.checked === true).length
      const count = (data.itemType === 'members')
  ? data.members.filter((element) => element.checked === true).length
  : (data.itemType === 'accept')
    ? data.accept.filter((element) => element.checked === true).length
    : data.recommendations.filter((element) => element.checked === true).length;

      if (count > 0) {
        mail.value = true;
      } else {
        mail.value = false;
        alert_warning("Bạn chưa chọn đảng viên", "");
      }
    };
    const sendEmail = async (value) => {
      const dataMail = reactive({ title: "", content: "", mail: "" });
      dataMail.title = value.title;
      dataMail.content = value.content;

      let timerInterval;
      Swal.fire({
        title: "Mail đang gửi",
        html: "Bạn vui lòng đợi <b></b> mili giây.",
        timer: arrayCheck.data.length * 2100,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });

      for (let i = 0; i < arrayCheck.data.length; i++) {
        if (arrayCheck.data[i].checked == true) {
          try {
            dataMail.mail = arrayCheck.data[i].email;
            await mailService.sendmail(dataMail);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
        await refresh();
      }
      alert_success("Mail đã được gửi", "");
    };

    onBeforeMount(async () => {
      await refresh();
    });

    return {
      data,
      setPages,
      activeMenu,
      refresh,
      sendEmail,
      mail,
      showMail,
      view,
      renewOpinion,
      renewIntro,
      renewAssess,
      CommentByYear,
      entryValuePosition,
      entryNamePosition,
      entryValuePartyCell,
      entryNamePartyCell,
      entryValueCty,
      entryNameCty,
      entryValueDistrict,
      entryNameDistrict,
      entryValueWard,
      entryNameWard,
      handleSelectAll,
      handleSelectOne,
      updateEntryValuePosition,
      updateEntryValuePartyCell,
      YetRecommendation,

      // phân quyền
      isDeletePartyMember,
      isEditPartyMember,
      isReadPartyMember,
      isCreatePartyMember,
      isMail,

      yearInputValue: "",
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2">
    <div class="d-flex flex-column mt-3">
      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 20px; font-weight: bold; text-align: center;">DANH SÁCH ĐẢNG VIÊN THUỘC
        CHI BỘ SINH VIÊN TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</span>
      <div class="d-flex mx-3">
      </div>
    </div>

    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <Search class="ml-3" style="width: 300px" @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText"
          @choseSearch="async (value) => ((data.choseSearch = value), (data.currentPage = 1))"
          @refresh="(data.entryValue = 'All'), (data.currentPage = 1)" :options="[
            {
              _id: 'name',
              name: 'Tìm kiếm theo tên',
            },
            {
              _id: 'email',
              name: 'Tìm kiếm theo email',
            },
            {
              _id: 'phone',
              name: 'Tìm kiếm theo số điện thoại',
            },
            {
              _id: 'partycell',
              name: 'Tìm kiếm theo chi bộ',
            }]" />
      </div>
      <div class="d-flex align-items-start">
        <button type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-form-mail"
          @click="showMail" :disabled="isMail() ? false : true">
          <span class="mx-2" style="color: white">Mail</span>
        </button>
        <Mail v-if="mail" @sendEmail="(value) => sendEmail(value)"></Mail>
        
      </div>
    </div>

    <div class="border-hr mb-3"></div>
    <div class="d-flex">

      <div v-if="data.itemType == 'members'" class="d-flex align-items-start justify-content-between w-100">
    <!-- <form @submit.prevent="CommentByYear">
      <p style="font-size: 17px; padding-left: 30px;">Tổng hợp phiếu nhận xét theo năm</p>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex align-items-start">
          <input v-model="yearInputValue" id="yearInput" class="ml-3" style="width: 300px; border: 1px solid var(--gray); border-radius: 5px; position: relative; width: 200%; height: 100%;" placeholder="Nhập năm cần tổng hợp">
          <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal">
            <span class="mx-2" style="color: white">Tổng hợp</span>
          </button>
        </div>
      </div>
    </form> -->
    <!-- Pass the value to the child component -->
    <router-link :to="{ name: 'CommentByYear', query: { year: yearInputValue } }"></router-link>
  </div>
  <!-- <div v-if="data.itemType == 'members'" class="d-flex align-items-end justify-content-end" style="margin-bottom: 15px;" >
    
    <button type="submit" class="btn btn-info ml-3 mr-3" data-toggle="modal" @click="YetRecommendation">
            <span>Đảng viên chưa có thư giới thiệu</span>
        </button>
  </div> -->
    </div>
    <!-- Kết thúc tổng hợp phiếu nhận xét theo năm -->
    
    <!-- Table -->
    <Table :itemType='data.itemType' :opinion="data.opinion" :recommendation='data.recommendation' :comment="data.comment" :items="setPages" :info="data.info" :fields="[
      'Tên',
      // 'Mã Đảng viên',
      'Mã Đảng viên',
      'Chi bộ',
      'Giới tính',
      'Diện miễn sinh hoạt',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" :selectAll="data.selectAll" :startRow="data.startRow" @selectAll="(value) => handleSelectAll(value)"
      @selectOne="(id, item) => handleSelectOne(id, item)" 
      @delete="handleDelete" 
      @view="(value) => {view(value);}
        " @renewOpinion="(value) => {renewOpinion(value);}" 
        @renewIntro="(value) => {renewIntro(value);}" 
        @renewAssess="(value) => {renewAssess(value);}" 
      :showActionList="[
        isReadPartyMember() ? true : false,
        isEditPartyMember() ? true : false,
        isDeletePartyMember() ? true : false,
      ]" />
   
    <Pagination :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
      :endRow="data.endRow" :currentPage="data.currentPage" @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3" />
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