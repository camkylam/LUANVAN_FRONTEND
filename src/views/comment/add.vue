<script>
import { ref, reactive } from 'vue';
import OpinionServices from "../../services/opinion.service";
import commentService from '../../services/comment.service';
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create, http_getOne, http_update } from "../../assets/js/common.http";
import { formatDate } from "../../assets/js/common";
import mailService from "../../services/mail.service";
import accountService from "../../services/account.service";
import { comfirmComment,signedComment } from "../../use/getSessionItem";
export default {
  name: "Assessment",
  props: {
    item: {
      type: Object,
      default: {},
    },
    criterion: {
      type: Array,
      default: [],
    },
    commentById: {
      type: Object,
      default: {},
    }
  },
  setup(props, ctx) {
    const selectedCriterion = reactive({});
    const data = reactive({
      item: {
        evaluations: [],
      },
    });

    const isAllCriterionSelected = () => {
      return Object.values(selectedCriterion).every(value => value !== '');
    };
    const note = ref("")
    const create = async () => {
      if (!isAllCriterionSelected()) {
        // console.log("Vui lòng chọn lần lượt hết các tiêu chí.");
        return;
      }
      const _idPartyMember = sessionStorage.getItem('partymemberId');
      data.item.partymemberId = props.item._id;
      data.item.commentedBy = _idPartyMember;
      data.item.note = note.value;
      // console.log(data.item.note);
    
      data.item.evaluations = Object.values(selectedCriterion).filter(value => value !== '');
      // console.log(data.item.evaluations);
    
      const opinion = await OpinionServices.getByPartymember(props.item._id);
      // console.log(opinion);
    
      if (opinion.document.length > 0) {
        const oldestItem = opinion.document[0];
        const oldestItemId = oldestItem._id;
        data.item.opinionId = oldestItemId;
        // console.log("ID của phần tử cũ nhất:", oldestItemId);
      } else {
        // console.log("Không có phần tử trong mảng.");
      }
      // console.log("ID của phần tử mới nhất:", data.item.opinionId);

      const roleId = "601b19c4-381f-4e44-98b7-e44f09f4f405"
      const wardId = props.item.Hamlet.Ward._id
      const roleEmails = await accountService.getEmailFromRoleAndWard({roleId, wardId})
      // console.log(roleEmails)
      const dataMail = reactive({
        title: "Xác nhận phiếu nhận xét cho đảng viên",
        content: `<p><span style="text-transform: capitalize;">Trân</span> trọng kính chào ông/bà</p>
                  <p><span style="text-transform: capitalize;">Kính</span> mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
                  nghệ thông tin và truyền thông xác nhận phiếu nhận xét của đảng viên <span style="text-transform: capitalize;"><b>${props.item.name}</b></span> </p>
                  <p><span style="text-transform: capitalize;">Mong</span> quý ông/bà thực hiện sớm</p>
                  <p><span style="text-transform: capitalize;">Chân</span> thành cảm ơn ông/bà</p>
                  <p><span style="text-transform: capitalize;">Chúc</span> quý ông/bà nhiều sức khỏe</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmails.join(', '), // Gán danh sách email vào đây
      });
    
      const comment = await commentService.create(data.item);
      if (!comment.error) {
        alert_success("Đã xác nhận thành công phiếu nhận xét");
        await mailService.sendmail(dataMail);
        ctx.emit("create");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
        window.location.reload();
      } else if (comment.error) {
        alert_delete("Lỗi!, xác nhận không thành công", `${comment.msg}`);
      }
      // console.log(comment);
    };
    


    return {
      selectedCriterion,
      note,
      create,
      currentDate: '',
      comfirmComment,
      signedComment
    };
  },
  mounted() {
    this.getCurrentDate();
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      this.currentDate = `${day}/${month}/${year}`;
    }
  }
};
</script>

<template>
    <div class="modal assessment" id="model-comment" >
        <div class="modal-dialog modal-lg"> 
            <div class="modal-content"> 
                <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 18px">
                        Phiếu nhận xét Đảng viên
                    </h4>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        @click="(activeStep = 1), closeModal"
                    >
                         &times;
                    </button>
                </div>
                <div class="model-body">
                    <p>Thông tin đảng viên</p>
                    <div class="d-flex justify-content-around row mx-3" >
                <div class="mt-3 col-6">
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Mã số Đảng viên: </span>
                    {{ item.code }}
                  </p>
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Họ tên: </span>
                    {{ item.name }}
                  </p>
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Ngày sinh: </span>
                    {{ item.birthday }}
                  </p>
                  <p>
                    <span style="font-size: 17px;">SĐT: </span>
                    {{ item.phone }}
                  </p>
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Giới tính: </span>
                    {{ item.gender }}
                  </p>
                </div>
                <div class="mt-3 col-6">
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Địa chỉ: </span>
                    {{ item.address }}
                  </p>
                  <p>
                    <span style="font-size: 17px; text-transform: capitalize;">Email: </span>
                    {{ item.email }}
                  </p>
                  <p>
                    <span style="font-size: 17px; ">Ngày kết nạp Đảng: </span>
                    {{ item.dateJoin }}
                  </p>
                  <p>
                    <span style="font-size: 17px;">Ngày vào Đảng chính thức: </span>
                    {{ item.dateOfficial }}
                  </p>
                </div>
              </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column" style="height: 100%">
                            <p style="text-transform: uppercase">ĐẢNG BỘ XÃ/PHƯỜNG <span style="font-weight: bold;">{{item.Hamlet.Ward.name  }}</span></p>
                            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ  <span style="font-weight: bold; text-transform: uppercase;">{{item.Hamlet.name }}</span></p> 
                        </div>
                    <div class="d-flex  flex-column " style="margin-left: 50px; float: right">
                        <p >ĐẢNG CỘNG SẢN VIỆT NAM </p>
                        <p style=" text-transform: capitalize;">{{ item.Hamlet.name }}, {{ currentDate }}</p>
                    </div>
                </div><br>
                    <h3>PHIẾU NHẬN XÉT</h3>
                    <div class="p">đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</div>
                    <div class="nd">
                        Chi ủy sau khi họp với ban công tác mặt trận thôn, bản, khu dân cư, tổ dân phố thống nhất nhận xét về đảng viên <span style=" text-transform: capitalize;">{{ item.name }} </span>  như sau:
                    </div>
                    <span class="nd" v-for="(item, index) in criterion" :key="index">
                        <p>{{ item.priority }}. {{ item.name }}</p>
                        <div class="chon" v-if="item.Criterion_Evaluations && item.Criterion_Evaluations.length > 0">
                        <span v-for="(criterionItem, radioIndex) in item.Criterion_Evaluations" :key="radioIndex">&nbsp;
                    <input
                        class="ch"
                        type="radio"
                        :id="'radio_' + index + '_' + radioIndex"
                        :name="'radio_' + index"
                        :value="criterionItem._id"
                        v-model="selectedCriterion[index]"
                        required
                    />&nbsp;
                        <label :for="'radio_' + index + '_' + radioIndex">{{ criterionItem.name }}</label>
                        <br />
                        
                    </span>
                        </div>
                        <div v-else style="margin-bottom: 15px;">
                          <span><input style="text-decoration-style: dotted; border-bottom: 1px dotted; margin-bottom: 15px; width: 220%; margin-top: -2px;" v-model="note" placeholder="Hãy thêm nhận xét khác vào đây..."/></span>
                        </div>
                    </span>
                    <div class="d-flex xn" style="margin-bottom: 50px;">
                        <div class="d-flex col-6">
                            <div class="row" style="font-weight: bold;">
                                <p>XÁC NHẬN CỦA ĐẢNG ỦY XÃ, PHƯỜNG, THỊ TRẤN</p><br>
                                <button class="btn btn-success ml-3 mr-3" :disabled="signedComment() ? false : true">Xác nhận</button>
                            </div> 
                        </div>
                        <div class="d-flex col-3 justify-content-end">
                            <div class="row justify-content-end" style="font-weight: bold; float:right;">
                                <p>T/M CHI BỘ</p>
                                <button class="btn btn-warning ml-3 mr-3"
                                type="submit"
                                data-toggle="modal"
                                @click="create"
                                id="add"
                                :disabled="comfirmComment() ? false : true"
                                >Xác nhận</button>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
p{
    font-size: 18px;
    font-family: 'Times New Roman', Times, serif;
}
h3{
    text-align: center;
    font-weight: bold;
}
.p{
    font-size: 18px;
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
    font-weight: bold;
}
.chon {
  display: flex;
}
.nd{
    font-size: 18px;
    font-family: 'Times New Roman', Times, serif;
    display: inline-block;
    margin-right: 10px; 
}

.ch{
    margin-left: 58px; 
}
.nn{
    text-decoration: underline;
}
.model-body{
    padding-left: 25px;
    padding-right: 25px;
}
.xn{
    padding-left: 100px;
}
</style>