<script>
import {ref, reactive, computed } from 'vue'
import Comment from "../../services/comment.service";
import { alert_success, alert_error, alert_delete, alert_warning, alert_delete_wide } from "../../assets/js/common.alert";
import { comfirmComment,signedComment } from "../../use/getSessionItem";
import accountService from '../../services/account.service';
import mailService from "../../services/mail.service";
export default {
    name: "Assessment",
    props: {
    item: {
      type: Object,
      default: {},
    },
    commentById: { type: Object, default: {} }
  },
    setup(props, ctx) {
    const data = reactive({
      item: {},
      lastPriority: null,
    });
    const sortedCriterionEvaluations = computed(() => {
      if (props.commentById.Criterion_Evaluations && props.commentById.Criterion_Evaluations.length > 0) {
        return props.commentById.Criterion_Evaluations.sort((a, b) => {
          return a.Criterion.priority - b.Criterion.priority;
        });
      }
      return [];
    });

    

    const signed = async () => {
      const _idPartyMember = sessionStorage.getItem('partymemberId');
      data.item.signedBy = _idPartyMember;
      data.item.commentId = props.commentById._id;

      const roleId="c11cb49c-fc67-4f79-84dc-d04ecb98bf8c";
      const partycellId=props.item.partycellId
      const roleEmail = await accountService.getEmailByRolePartyCell({roleId,partycellId })
      // console.log(roleEmail)
      const dataMail = reactive({
        title: "Thông tin phiếu nhận xét của đảng viên",
        content: `<h2>Trân trọng kính chào ông/bà</h2>
                  <p>Kính mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
                  nghệ thông tin và truyền thông xem thông tin phiếu nhận xét của đảng viên <b>${props.item.name}</b> </p>
                  <p>Chân thành cảm ơn ông/bà</p>
                  <p>Chúc quý ông/bà nhiều sức khỏe</p>
                  <p>Trân trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmail.join(', '),// Gán danh sách email vào đây
      });


      const signed = await Comment.update(data.item)
        if (!signed.error) {
          alert_success(
            `Đã duyệt phiếu nhận xét của đảng viên`,
          );
          await mailService.sendmail(dataMail);
          ctx.emit("signed");
          await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
      window.location.reload();
        } else {
          alert_error(`Duyện phiếu nhận xét không thành công`, `${signed.msg}`);
        }
    };
    

    return {
        sortedCriterionEvaluations,
        signed,
        comfirmComment,
        signedComment
    };
    
},
computed: {
    // Computed property to get the dynamic number based on the last priority
    getDynamicNumber() {
      return this.lastPriority ? parseInt(this.lastPriority) + 1 : null;
    },
  },

  watch: {
    // Watch for changes in sortedCriterionEvaluations and update lastPriority
    sortedCriterionEvaluations: {
      handler(newVal) {
        // Assuming you want the last priority from the last item in the sortedCriterionEvaluations array
        this.lastPriority = newVal[newVal.length - 1]?.Criterion?.priority || null;
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
  },
}
</script>
<template>
    <div class="modal assessment" id="model-assessment" >
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
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column" style="height: 100%">
                            <p style="text-transform: uppercase">ĐẢNG BỘ XÃ/PHƯỜNG <span style="font-weight: bold;">{{item.Hamlet?.Ward?.name  }}</span></p>
                            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ  <span style="font-weight: bold; text-transform: uppercase;">{{item.Hamlet?.name }}</span></p>
                        </div>
                    <div class="d-flex  flex-column " style="margin-left: 50px; float: right">
                        <p >ĐẢNG CỘNG SẢN VIỆT NAM </p>
                        <!----<p style=" text-transform: capitalize;" >{{ item.Hamlet?.name  }}, {{commentById.createdAt}}</p>-->
                        <p style=" text-transform: capitalize;" >{{ item.Hamlet?.name  }}, 06/12/2023</p>
                    </div>
                </div>
                    <h3>PHIẾU NHẬN XÉT</h3> 
                    <div class="p">đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</div>
                    <div class="nd">
                        Chi ủy sau khi họp với ban công tác mặt trận thôn, bản, khu dân cư, tổ dân phố thống nhất nhận xét về đảng viên <span style=" text-transform: capitalize;">{{ item.name }} </span> như sau:
                    </div>
                    <div class="nd" v-for="(commentItem, index) in sortedCriterionEvaluations" :key="index">
                        <p><span style="font-weight: bold;">{{ commentItem.Criterion?.priority }}</span>. {{ commentItem.Criterion?.name }}</p>
                        <div class="chon" id='example-3' style="padding-left: 65px;">
                            <span style="display: inline-flex; align-items: center;">
                            <div class="square-container">
                                <i class="fas fa-check icon-inside-square" style="color: green;"></i>
                            </div>
                            <label for="nêu gương tốt" style="font-weight: bold; margin-left: 8px;">{{commentItem.name}}</label>
                            </span>
                        </div>
                    </div>
                    <!-- <p > 4. Nhận xét khác:  <span style="font-weight: bold;">{{ commentById.note }}</span> </p> -->
                    <!-- <p >7. Nhận xét khác:  <span style="font-weight: bold;">{{ commentById.note }}</span> </p> -->
                    <p v-if="commentById.note">{{ getDynamicNumber }}. Nhận xét khác: <span style="font-weight: bold;">{{commentById.note}}</span></p>
                    <div class="d-flex xn" style="margin-bottom: 50px;">
                        <div class="d-flex col-6">
                            <div  class="row" style="font-weight: bold;">
                                <p>XÁC NHẬN CỦA ĐẢNG ỦY XÃ, PHƯỜNG, THỊ TRẤN</p>
                                <div v-if="commentById?.SignedBy?.name === null || commentById?.SignedBy?.name === undefined"> {{ commentById?.SignedBy?.name }}
                                    <button class="btn btn-success ml-3 mr-3" @click="signed" id="signed" :disabled="signedComment() ? false : true">Xác nhận</button>
                                </div>
                                <div v-else>
                                    <button class="btn btn-success ml-3 mr-3" @click="signed" id="signed" :disabled="true">Đã xác nhận</button><br>
                                <p class=" ml-3 mr-3" style=" margin-left: 15px; margin-top: 15px; font-weight: bold; text-transform: capitalize;">{{ commentById?.SignedBy?.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex col-3 justify-content-end">
                            <div class="row justify-content-end" style="font-weight: bold; float:right;">
                                <p>T/M CHI BỘ</p>
                                <button class="btn btn-warning ml-3 mr-3" disabled="true">Đã xác nhận</button>
                                <p class=" ml-3 mr-3" style=" margin-left: 15px; margin-top: 15px; font-weight: bold; text-transform: capitalize;">{{ commentById?.CommentedBy?.name }}</p>
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
.nd{
    font-size: 18px;
    font-family: 'Times New Roman', Times, serif;

}
.square-container {
  width: 20px; /* Độ rộng của ô vuông */
  height: 20px; /* Độ cao của ô vuông */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc; /* Đường viền của ô vuông */
  border-radius: 5px; /* Độ cong của các góc */
}

.icon-inside-square {
  font-size: 15px; /* Kích thước của icon */
}
.ch{
    margin-left: 58px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 15px;
  height: 15px;
    /* border: 2px solid blue;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: rgb(72, 72, 252); */
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