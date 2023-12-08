<script>

import { useRoute, useRouter } from 'vue-router'
import Table from "../../components/table/table_recommendation.vue";
import Pagination from "../../components/table/pagination.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Introduction from "../introduction/introduction_form.vue";
import Add from "../recommendation/add.vue";
import Search from "../../components/form/search.vue";


import Select_Advanced from "../../components/form/select_advanced.vue";

import { reactive, computed, watch, ref, onBeforeMount } from "vue";

//service
import PartyMember from "../../services/partymember.service";

import Recommentdation from "../../services/recommendation.service";

import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, RecommendationByIdModel } from "../../assets/js/models"
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
import { isCreateRecommendation} from "../../use/getSessionItem";

export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Select_Advanced,
    Introduction,
    Add,
    Search 
  },
    setup(ctx){
      const data = reactive({
        recommendationValue: partymemberModel,
        recommendation: recommedationModel,
        recommendations: recommedationModel,
        addValue: partymemberModel,
        click: true,
        searchText: "",
        choseSearch: "",
        recommen: [],
        currentPage: 1,
        totalRow: 0,
        RecommendationById: RecommendationByIdModel
      })
      const router = useRouter();
      const route = useRoute();
      const params = route.params.id;
      const renewRecommendation = async (value) => {
        data.recommendationValue = await PartyMember.get(params);
        const recommendation = await Recommentdation.get(params)

      if (!recommendation.error) {
        data.recommendation = recommendation.document
        data.recommendation.recommendationStatus = recommendation.recommendationStatus
        data.recommendation.PartyMember.birthday = formatDate(data.recommendation.PartyMember.birthday)
        data.recommendation.PartyMember.dateJoin = formatDate(data.recommendation.PartyMember.dateJoin)
        data.recommendation.PartyMember.dateOfficial = formatDate(data.recommendation.PartyMember.dateOfficial)
        data.recommendation.createdAt = formatDate(data.recommendation.createdAt)
        data.recommendation.confirmedAt = (data.recommendation.confirmedBy) ? formatDate(data.recommendation.confirmedAt) : ''
        data.recommendation.acceptedAt = (data.recommendation.acceptedBy) ? formatDate(data.recommendation.acceptedAt) : ''
      }
      else
        data.recommendation = null
      };
      const add = async(value) => {
        data.click = false
        data.addValue = await PartyMember.get(params);
        data.addValue.birthday = formatDate(data.addValue.birthday);
        data.addValue.dateJoin = formatDate(data.addValue.dateJoin)
        data.addValue.dateOfficial = formatDate(data.addValue.dateOfficial)
        // console.log(data.addValue)
      }
      
      const refresh = async () => {
        const recommen = await Recommentdation.getAll(params)
        if(!recommen.error){
            data.recommen = recommen.document
            for(const recommenItem of data.recommen )
            recommenItem.createdAt = formatDate(recommenItem.createdAt)
        }
        else {
            data.recommen = null
        }
        const recommendation = await Recommentdation.get(params)
        data.recommendation = recommendation
      }
      const toString = computed(() => {
      if (data.choseSearch == "createdAt") {
        return data.recommen.map((value, index) => {
          return [value.createdAt].join("").toLocaleLowerCase();
        });
      }
    });
    const filter = computed(() => {
      return data.recommen.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.recommen.length;
        return data.recommen;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const goToFormOpinion = async(item) => {
  router.push({ name: 'OpinionRecommendation', params: { id: `${item._id}` } });
  // console.log("Navigating to Form.opinion with item:", item);
};

    const handleGetById = async(id, item) => {
      const rsPartyMember = await Recommentdation.getById(id)
      // console.log(rsPartyMember)
        if(!rsPartyMember.error){
          data.RecommendationById = rsPartyMember
          data.RecommendationById.document.createdAt = formatDate(data.RecommendationById.document.createdAt);
          data.RecommendationById.document.acceptedAt = formatDate(data.RecommendationById.document.acceptedAt);
          data.RecommendationById.document.PartyMember.birthday = formatDate(data.RecommendationById.document.PartyMember.birthday);
          data.RecommendationById.document.PartyMember.dateJoin = formatDate(data.RecommendationById.document.PartyMember.dateJoin);
          data.RecommendationById.document.PartyMember.dateOfficial = formatDate(data.RecommendationById.document.PartyMember.dateOfficial);
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
      add,
      renewRecommendation,
      goToFormOpinion,
      toString,
      filter,
      filtered,
      handleGetById,
      isCreateRecommendation,
      
    }
  }
}
</script>
<template>
    <div class="border-box d-flex flex-column ml-2">
        <div  class="d-flex flex-column mt-3">

      <!-- LỌC  -->
      <span class="mx-3 mb-3 h6" style="font-size: 22px; font-weight: bold; text-align: center;">THƯ GIỚI THIỆU CỦA ĐẢNG VIÊN </span>
    </div>
    <div class="d-flex flex-column mt-3">
    </div>
    
    <div class="border-hr mb-2"></div>

    <div class="d-flex menu my-2 mx-2 justify-content-end">
      <!-- :disabled="isCreateRecommendation() ? false : true" -->
      <button v-if='isCreateRecommendation()' type="button" class="btn btn-warning ml-3 mr-3" data-toggle="modal" data-target="#model-add"
          @click="add">
          <span class="mx-2" style="color: white">Thêm phiếu thư giới thiệu</span>
        </button>
        <!-- <Introduction  v-if= "!data.click" @renewRecommendation="(value) => {renewRecommendation(value);}" :item="data.recommendationValue" :recommendation='data.recommendation'/> -->
        <Add v-if= "!data.click" @add="(value) => {add(value);}" :item="data.addValue" />
      <router-link
        :to="{ name: 'Introduction' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trở về</span>
      </router-link>
    </div>
        <Table :recommen="data.recommen" :recommendation='data.recommendation' :fields="[
      'Ngày giới thiệu',
      'Khu vực, ấp',
      'Xã, phường',
      'Quận, huyện',
      'Tỉnh, thành phố',
    ]" @getbyId="handleGetById" @goToFormOpinion="goToFormOpinion"
     /> 
     <Introduction :item="data.recommendationValue" :recommendationById='data.RecommendationById'/>
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