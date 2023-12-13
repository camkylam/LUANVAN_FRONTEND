<template>
  <div>
    <table class="my-table table-container">
      <thead>
        <tr class="">
          <th v-if = "itemType!='info'">
            <input type="checkbox" name="" id="" :checked="selectAll[0].checked == true" v-model="selectAll[0].checked"
              @click="$emit('selectAll', selectAll[0].checked)" class="d-flex align-items-center size-16" />
          </th>
          <th><span class="size-16">Stt</span></th>
          <th v-for="(value, index) in fields" :key="index">
            <span class="size-16">{{ value }}</span>
          </th>
          <th>
            <span class="size-16" v-if="activeAction == true">Hành động</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="itemType=='info'">
          <td class="size-16">{{ 1 }}</td>
          <td class="size-16">{{ info.name}}</td>
          <td class="size-16">{{ info.code}}</td>
          <td class="size-16">{{ info.PartyCell?.name}}</td>
          <td class="size-16">{{ info.gender}}</td>
          <td class="size-16">{{ (info.exemption === 'true') ? 'Được miễn' : 'Không được miễn'}}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.District?.Cty_Province?.name}}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view"
                v-if="showActionList[0]">
                <span id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', info._id , item)">
                  visibility
                </span>
              </button>&nbsp;&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-green-button-class':recommendation?.recommendationStatus === 'created',
              'your-yellow-button-class': recommendation?.recommendationStatus === 'confirmed',
              'your-info-button-class':recommendation?.recommendationStatus === 'accepted',
              'your-default-button-class': !recommendation?.recommendationStatus 
            }">
                <span id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', info._id, item)">
                  send
                </span>
              </button>&nbsp;

              <button type="button" class="format-btn" data-toggle="modal"  :class="{ 'your-info-button-class': hasLatestOpinionInfo(opinion.document) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestOpinionInfo(opinion.document) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestOpinionInfo(opinion.document) === 'your-default-button-class' }">
                <span id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                  @click="$emit('renewOpinion', info._id, item)">
                  Demography
                </span>
              </button>&nbsp;
              
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-info-button-class': hasLatestCommentInfo(comment.document) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestCommentInfo(comment.document) === 'your-yellow-button-class',
            'your-default-button-class':hasLatestCommentInfo(comment.document) === 'your-default-button-class' }"
              >
                <span  id="assessment" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                  @click="$emit('renewAssess', info._id, item)">
                  Comment
                </span>
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="itemType!='info'&& itemType == 'members'"  v-for="(item, index) in sortedItems" :key="index"  >
        
          <td>
            <input type="checkbox" :checked="item.checked == true" v-model="item.checked"
              @click="$emit('selectOne', item._id, item)" class="d-flex align-items-center" />
          </td>
          <td class="size-16">{{ startRow + index }}</td>
         
          <td class="size-16">{{ item.name || item.PartyMember?.name}}</td>
          <td class="size-16">{{ item?.code || item.PartyMember?.code }}</td>
          <td class="size-16">{{ item.PartyCell?.name || item.PartyMember?.PartyCell?.name}}</td>
          <td class="size-16">{{ item.gender || item.PartyMember?.gender}}</td>
          <td  v-if="item?.exemption" class="size-16">{{ (item?.exemption === 'true') ? 'Được miễn' : 'Không được miễn'}}</td>
          <td  v-if="item.PartyMember?.exemption" class="size-16">{{ (item.PartyMember?.exemption === 'true') ? 'Được miễn' : 'Không được miễn' }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.name || item.PartyMember?.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.name || item.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.Cty_Province?.name || item.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name}}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view"
              v-if="itemType == 'recommendations' || itemType == 'accept'" >
                <span v-if="itemType == 'members'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item._id , item)">
                  visibility
                </span>
                <span v-if="itemType == 'recommendations'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
                <span v-if="itemType == 'accept'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
              </button>&nbsp;&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-green-button-class':item.recommendation?.recommendationStatus === 'created',
              'your-yellow-button-class': item.recommendation?.recommendationStatus === 'confirmed',
              'your-info-button-class': item.recommendation?.recommendationStatus === 'accepted',
              'your-default-button-class': !item.recommendation?.recommendationStatus 
            }">
                <span v-if="itemType == 'members'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item._id, item)">
                  send
                </span>
                <span v-if="itemType == 'recommendations'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
                <span v-if="itemType == 'accept'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
              </button>&nbsp;

              <button  type="button" class="format-btn" data-toggle="modal"
              :class="{ 'your-info-button-class': hasLatestOpinion(item) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestOpinion(item) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestOpinion(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion', item._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'recommendations'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
               
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'accept'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
              </button>&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-info-button-class': hasLatestComment(item) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestComment(item) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestComment(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="assessment" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                  @click="$emit('renewAssess', item._id, item)">
                  Comment
                </span>
                <span v-if="itemType == 'recommendations'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
                <span v-if="itemType == 'accept'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
              </button>
            </div>
          </td>
       
        </tr>
        <tr v-if="itemType!='info'&& itemType == 'recommendations' " v-for="(item, index) in sortedItems" :key="index"  >
          <template v-if="item.PartyMember?.Hamlet?.Ward._id === data.loggedInUserWardId">
          <td>
            <input type="checkbox" :checked="item.checked == true" v-model="item.checked"
              @click="$emit('selectOne', item._id, item)" class="d-flex align-items-center" />
          </td>
          <!-- <td class="size-16">{{ startRow + index }}</td> -->
          <td class="size-16">{{ displayedIndex(item, index) }}</td>
          <td class="size-16">{{ item.name || item.PartyMember?.name}}</td>
          <td class="size-16">{{ item?.code || item.PartyMember?.code }}</td>
          <td class="size-16">{{ item.PartyCell?.name || item.PartyMember?.PartyCell?.name}}</td>
          <td class="size-16">{{ item.gender || item.PartyMember?.gender}}</td>
          <td  v-if="item?.exemption" class="size-16">{{ (item?.exemption === 'true') ? 'Được miễn' : 'Không được miễn'}}</td>
          <td  v-if="item.PartyMember?.exemption" class="size-16">{{ (item.PartyMember?.exemption === 'true') ? 'Được miễn' : 'Không được miễn' }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.name || item.PartyMember?.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.name || item.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.Cty_Province?.name || item.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name}}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view"
              v-if="itemType == 'recommendations' || itemType == 'accept'" >
                <span v-if="itemType == 'members'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item._id , item)">
                  visibility
                </span>
                <span v-if="itemType == 'recommendations'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
                <span v-if="itemType == 'accept'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
              </button>&nbsp;&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-green-button-class':item.recommendation?.recommendationStatus === 'created',
              'your-yellow-button-class': item.recommendation?.recommendationStatus === 'confirmed',
              'your-info-button-class': item.recommendation?.recommendationStatus === 'accepted',
              'your-default-button-class': !item.recommendation?.recommendationStatus 
            }">
                <span v-if="itemType == 'members'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item._id, item)">
                  send
                </span>
                <span v-if="itemType == 'recommendations'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
                <span v-if="itemType == 'accept'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
              </button>&nbsp;

              <button  type="button" class="format-btn" data-toggle="modal"
              :class="{ 'your-info-button-class': hasLatestOpinion(item) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestOpinion(item) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestOpinion(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion', item._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'recommendations'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
               
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'accept'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
              </button>&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-info-button-class': hasLatestComment(item) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestComment(item) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestComment(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="assessment" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                  @click="$emit('renewAssess', item._id, item)">
                  Comment
                </span>
                <span v-if="itemType == 'recommendations'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
                <span v-if="itemType == 'accept'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
              </button>
            </div>
          </td>
          </template>
        </tr>
        <tr v-if="itemType !== 'info' && itemType === 'accept'" v-for="(item, index) in sortedItems" :key="index"  >
          <template v-if="item.PartyMember?.Hamlet?._id === data.loggedInUserHamletId">
          <td>
            <input type="checkbox" :checked="item.checked == true" v-model="item.checked"
              @click="$emit('selectOne', item._id, item)" class="d-flex align-items-center" />
          </td>
          <td class="size-16">{{ displayedIndex(item, index) }}</td>
          <!-- <td class="size-16">{{ startRow + index }}</td> -->
          <td class="size-16">{{ item.name || item.PartyMember?.name}}</td>
          <td class="size-16">{{ item?.code || item.PartyMember?.code }}</td>
          <td class="size-16">{{ item.PartyCell?.name || item.PartyMember?.PartyCell?.name}}</td>
          <td class="size-16">{{ item.gender || item.PartyMember?.gender}}</td>
          <td  v-if="item?.exemption" class="size-16">{{ (item?.exemption === 'true') ? 'Được miễn' : 'Không được miễn'}}</td>
          <td  v-if="item.PartyMember?.exemption" class="size-16">{{ (item.PartyMember?.exemption === 'true') ? 'Được miễn' : 'Không được miễn' }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.name || item.PartyMember?.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.name || item.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ item.Hamlet?.Ward?.District?.Cty_Province?.name || item.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name}}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view"
              v-if="itemType == 'recommendations' || itemType == 'accept'" >
                <span v-if="itemType == 'members'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item._id , item)">
                  visibility
                </span>
                <span v-if="itemType == 'recommendations'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
                <span v-if="itemType == 'accept'" id="view" class="material-symbols-outlined d-flex align-content-center" title="Xem thông tin chi tiết"
                  @click="$emit('view', item.PartyMember?._id, item)">
                  visibility
                </span>
              </button>&nbsp;&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-green-button-class':item.recommendation?.recommendationStatus === 'created',
              'your-yellow-button-class': item.recommendation?.recommendationStatus === 'confirmed',
              'your-info-button-class': item.recommendation?.recommendationStatus === 'accepted',
              'your-default-button-class': !item.recommendation?.recommendationStatus 
            }">
                <span v-if="itemType == 'members'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item._id, item)">
                  send
                </span>
                <span v-if="itemType == 'recommendations'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
                <span v-if="itemType == 'accept'" id="introduction" class="material-symbols-outlined d-flex align-content-center" title="thư giới thiệu"
                  @click="$emit('renewIntro', item.PartyMember?._id, item)">
                  send
                </span>
              </button>&nbsp;

              <button  type="button" class="format-btn" data-toggle="modal"
              :class="{ 'your-info-button-class': hasLatestOpinion(item) === 'your-blue-button-class',
            'your-green-button-class': hasLatestOpinion(item) === 'your-green-button-class',
            'your-default-button-class': hasLatestOpinion(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion', item._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'recommendations'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
               
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
                <span  v-if="itemType == 'accept'" id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                
                  @click="$emit('renewOpinion',  item.PartyMember?._id, item)">
                  Demography
                </span>
              </button>&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" 
              :class="{ 'your-info-button-class': hasLatestComment(item) === 'your-blue-button-class',
            'your-yellow-button-class': hasLatestComment(item) === 'your-yellow-button-class',
            'your-default-button-class': hasLatestComment(item) === 'your-default-button-class' }">
                <span v-if="itemType == 'members'"  id="assessment" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                  @click="$emit('renewAssess', item._id, item)">
                  Comment
                </span>
                <span v-if="itemType == 'recommendations'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
                <span v-if="itemType == 'accept'" id="assessment" class="material-symbols-outlined d-flex align-content-center" title="Bình luận"
                    @click="$emit('renewAssess', item.PartyMember?._id, item)">
                    Comment
                </span>
              </button>
            </div>
          </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div v-if="itemType!='info'">
      <p v-if="sortedItems.length == 0" class="text-center mt-2">
      Không có dữ liệu.
      </p>
    </div>
  </div>
</template>

<script>
import CommentServices from "../../services/comment.service";
import PartyMember from "../../services/partymember.service";
import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { partymemberModel, recommedationModel,opinionModel, CommentOfPartyMember } from "../../assets/js/models"
export default {
  setup() {
    const data = reactive({
      partymember: partymemberModel,
      loggedInUserHamletId: null,
      loggedInUserWardId: null,
    });

    onBeforeMount(async () => {
      await initializeData();
    });

    async function initializeData() {
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.partymember = await http_getOne(PartyMember, _idPartyMember);
      data.loggedInUserHamletId = data.partymember.Hamlet._id;
      data.loggedInUserWardId = data.partymember.Hamlet.Ward._id;
    }

    return {
      data,
      initializeData,
    };
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    recommendation: { type: Object, default: {} },
    comment: {
      type: Object, default:{}
    },
    opinion: {
      type: Object, default:{}
    },
    itemType: {
      type: String
    },
    info: {
      type: Object, default:{}
    },
    
    fields: {
      type: Array,
      default: [],
    },
    labels: {
      type: Array,
      default: [],
    },
    startRow: {
      type: Number,
      default: 1,
    },
    selectAll: {
      type: Array,
      default: [],
    },
    activeAction: {
      type: Boolean,
      default: true,
    },
    showActionList: {
      type: Array,
      default: [true, true, true],
    },
  },
  computed: {
    shouldShowTable() {
      return (
        this.activeAction &&
        this.sortedItems.some((item) => item.PartyMember?.Hamlet?._id === this.data.loggedInUserHamletId)
      );
    },
    filteredItems() {
      const loggedInUserHamletId = this.data.loggedInUserHamletId;
  const loggedInUserWardId = this.data.loggedInUserWardId;

  return this.sortedItems.filter(item => 
    item.PartyMember?.Hamlet?._id === loggedInUserHamletId ||
    item.PartyMember?.Hamlet?.Ward._id === loggedInUserWardId
  );
    },
    sortedItems() {
      return this.items.slice().sort((a, b) => {
        const statusOrder = {
          'created': 1,
          'confirmed': 2,
          'accepted': 3,
          'undefined': 4
        };

        const statusA = a.recommendation?.recommendationStatus || 'undefined';
        const statusB = b.recommendation?.recommendationStatus || 'undefined';

        return statusOrder[statusA] - statusOrder[statusB];
      });
    },
  },
  methods: {
    displayedIndex(item, index) {
      const visibleItems = this.filteredItems;
      const visibleIndex = visibleItems.indexOf(item);
        if (visibleIndex !== -1) {
          return this.startRow + visibleIndex;
        }
        return index + 1; 
      },

    hasLatestOpinion(item){
      const latestOpinion = this.getLatestOpinion(item.opinion?.document);
      if(latestOpinion) {
        const hasBuildedBy = latestOpinion.BuildBy?.name !== '';
        const hasSentBy = latestOpinion.SentBy && latestOpinion.SentBy.name !== '';
        if(hasBuildedBy &&  hasSentBy){
          return 'your-blue-button-class'; 
        }
        else if(hasBuildedBy &&  !hasSentBy){
          return 'your-green-button-class';
        }
      }
      return 'your-default-button-class';
    },

    hasLatestComment(item) {
    const latestComment = this.getLatestComment(item.comment?.document);
    if (latestComment) {
      const hasCommentedBy = latestComment.CommentedBy?.name !== '';
      const hasSignedBy = latestComment.SignedBy && latestComment.SignedBy.name !== '';
      
      if (hasCommentedBy && hasSignedBy) {
        return 'your-blue-button-class'; // Use your class for the blue button
      } else if (hasCommentedBy && !hasSignedBy) {
        return 'your-yellow-button-class'; // Use your class for the yellow button
      }
    }
    return 'your-default-button-class'; // Use your class for the default button
  },

  hasLatestCommentInfo(commentDocument) {
    const latestComment = this.getLatestComment(commentDocument);
    if (latestComment) {
        const hasCommentedBy = latestComment.CommentedBy?.name !== '';
        const hasSignedBy = latestComment.SignedBy && latestComment.SignedBy.name !== '';

        if (hasCommentedBy && hasSignedBy) {
            return 'your-blue-button-class'; // Use your class for the blue button
        } else if (hasCommentedBy && !hasSignedBy) {
            return 'your-yellow-button-class'; // Use your class for the yellow button
        }
    }
    return 'your-default-button-class'; // Use your class for the default button
  },

  hasLatestOpinionInfo(opinionDocument) {
    const latestOpinion = this.getLatestOpinion(opinionDocument);
      if(latestOpinion) {
        const hasBuildedBy = latestOpinion.BuildBy?.name !== '';
        const hasSentBy = latestOpinion.SentBy && latestOpinion.SentBy.name !== '';
        if(hasBuildedBy &&  hasSentBy){
          return 'your-blue-button-class'; 
        }
        else if(hasBuildedBy &&  !hasSentBy){
          return 'your-yellow-button-class';
        }
      }
      return 'your-default-button-class'; // Use your class for the default button
  },

  getLatestOpinion(opinionDocument) {
    // Ensure the opinionDocument array is not empty
    if (opinionDocument && opinionDocument.length > 0) {
      // Sort the opinions based on timestamp in descending order
      const sortedOpinions = opinionDocument.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      // Return the latest opinion
      return sortedOpinions[0];
    }
    return null;
  },
    getLatestComment(commentDocument) {
      // Ensure the commentDocument array is not empty
      if (commentDocument && commentDocument.length > 0) {
        // Sort the comments based on timestamp in descending order
        const sortedComments = commentDocument.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        // Return the latest comment
        return sortedComments[0];
      }
      return null;
    },
  },
};

</script>
<style scoped>
.your-green-button-class {
  background-color: rgb(12, 150, 12);
  color: white;
  border: 1px solid black;
}
.your-yellow-button-class {
  background-color: rgb(228, 228, 40);
  color: rgb(14, 13, 13);
  border: 1px solid black;
}
.your-info-button-class{
  background-color: rgb(60, 128, 255);
  color: white;
  border: 1px solid black;
}

.my-table {
  width: 90%;
  border-collapse: collapse;
  margin: auto;
  /* Căn giữa bảng */
  text-transform: capitalize;

}

.border-table-all {
  border: 1px solid var(--gray);
}

.my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
  text-align: center;
}

.my-table th {
    font-weight: 900;
    font-size: 14px;
    background-color: #9d9ea0; /* Light gray background color for table header */
  }

  .my-table tbody tr:nth-child(odd) {
    background-color: #eceaea; /* Light gray background for odd rows */
  }

  .my-table tbody tr:nth-child(even) {
    background-color: transparent; /* No background for even rows */
  }

  .my-table tbody tr:hover {
    background-color: #e0e0e0; /* Hover background color for all rows */
  }
.my-table tbody tr:hover {
  background-color: #e0e0e0;
  /* Màu nền khi hover */
}

.my-table th,
.my-table td {
  border: 1px solid #ddd;
  /* Màu và độ rộng của đường kẻ */
  padding: 8px;
}

#view,
#edit,
#delete,
#opinion,
#introduction,
#assessment {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}

#view:hover {
  color: var(--blue);
}

#edit:hover {
  color: var(--yellow);
}

#delete:hover {
  color: var(--red);
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
  width: 100%;
}</style>