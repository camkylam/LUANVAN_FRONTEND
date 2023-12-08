<script>
import { onMounted, onUnmounted, defineProps, ref} from "vue";
import Recommentdation from "../../services/recommendation.service";
import PartyMember from "../../services/partymember.service"
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create, http_getOne, http_update } from "../../assets/js/common.http";
import { formatDate } from "../../assets/js/common";
import { reactive } from "vue";
import { isCreateRecommendation, isComfirmRecommendation, isAcceptRecommendation } from "../../use/getSessionItem";
import opinionService from "../../services/opinion.service";
import { isComfirmOpinion } from "../../use/getSessionItem";
import mailService from "../../services/mail.service";
import accountService from "../../services/account.service";

export default {
  props: {
    item: { type: Object, default: {} },
    recommendation: { type: Object, default: {} },
    opinions: {type: Array, default: []},
  },
  setup(props, ctx) {
    const data = reactive({
      item: {},
    });
    
    const create = async () => {
      const roleId = "5f3d3360-417e-41c9-8aa9-d10e290e60a7";
      const roleEmails = await accountService.getEmailByRole({roleId});
      // console.log(roleEmails)
      const dataMail = reactive({
        title: "Xác nhận phiếu xin ý kiến cho đảng viên",
        content: `<p><span style="text-transform: capitalize;">Trân </span> trọng kính chào ông/bà </p>
                  <p><span style="text-transform: capitalize;">Kính</span> mời ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công nghệ thông tin và truyền thông 
                    Xác nhận phiếu xin ý kiến cho đảng viên <span style="text-transform: capitalize;"><b>${props.item.name}</b></span></p>
                  <p><span style="text-transform: capitalize;">Kính</span> mong quý ông/bà thực hiện sớm</p>
                  <p><span style="text-transform: capitalize;">Chân</span> thành cảm ơn ông/bà</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmails.join(', '),
      });

      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.partymemberId = props.item._id,
      data.item.buildBy= _idPartyMember
      const recommendt = await Recommentdation.get(props.item._id);
      data.item.recommendationId = recommendt.document._id
      // console.log(data.item.sentBy)

      const opinion = await http_create(opinionService, data.item);
      // console.log(opinion)

      if (!opinion.error) {
        data.isSent = true;
        alert_success(
          `Gửi phiếu thành công phiếu xin ý kiến`,
          `${opinion.msg}`
        );
        await mailService.sendmail(dataMail);
        ctx.emit("create");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
      window.location.reload();
      } else {
        alert_error(`Phiếu xin ý kiến chưa được gửi`, `${opinion.msg}`);
      }
    }

    return {
      data,
      create,
      currentDate: '',
      isComfirmOpinion
    }
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
}
</script>
<template>
    <div class="modal introduction" id="model-add">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 18px">
                        Phiếu xin ý kiến về Đảng viên về sinh hoạt tại nơi cư trú
                    </h4>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        @click="closeModal"
                    >
                        &times;
                    </button>
                </div>
                <div class="model-body" :key="index">
                  <div >
                    <div class="d-flex">
                        <div class="col-6">
                            <p>ĐẢNG BỘ ĐẠI HỌC CẦN THƠ </p>
                            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                        </div>
                        <div class="justify-content-center" style="margin-left: 108px;">
                            <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
                            <p>Cần Thơ, {{ currentDate }}</p>
                        </div>
                    </div>
                    <h3>PHIẾU XIN Ý KIẾN</h3>
                    <h5>Chi ủy nơi cư trú</h5>
                    <div><p style="font-weight: bold; text-transform: capitalize;">Kính gửi: Đảng ủy Xã/phường {{ item.Hamlet.Ward.name }}<input></p></div>
                    <div>
                        <p>Thực hiện Quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của 
                        Bộ chính trị về trách nhiệm của Đảng viên đang công tác thường xuyên giữ mối 
                        liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
                    </div>
                    <div>
                        <p>Đảng ủy/chi bộ trường công nghệ thông tin và truyền thông trân trọng đề nghị 
                        Chi ủy nhận xét về Đảng viên <span style="font-weight: bold; text-transform: capitalize;">{{ item.name}} </span> tại nơi cư trú (theo mẫu gửi đính kèm)</p> 
                        
                    </div>
                    <div style="float:right; margin-bottom: 25px;">
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
                        <button
                        type="submit"
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        
                        :disabled="isComfirmOpinion() ? false : true"
                    >
                    <span class="mx-2" style="color: white">Xác nhận</span></button>
                    </div>
                  </div>
                  <div style="margin-left: 310px; margin-bottom: 40px;" >
                    <button
                        type="submit"
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        @click="create"
                        id="add"
                    >
                    <span class="mx-2" style="color: white">Gửi</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.model-body{
    padding-left: 25px;
    padding-right: 25px;
    font-size: 17px;
    font-family: 'Times New Roman', Times, serif;
}
h3{
    text-align: center;
    font-weight: bold;
}
h5{
    text-align: center;
    font-weight: bold;
}
</style>