<script>
import { onMounted, onUnmounted, defineProps, ref} from "vue";
import Recommentdation from "../../services/recommendation.service";
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create, http_getOne, http_update } from "../../assets/js/common.http";
import { reactive } from "vue";
import { isCreateRecommendation, isComfirmRecommendation, isAcceptRecommendation } from "../../use/getSessionItem";
import opinionService from "../../services/opinion.service";
import mailService from "../../services/mail.service";
import { isComfirmOpinion } from "../../use/getSessionItem";
import accountService from "../../services/account.service";

export default {
  props: {
    item: { type: Object, default: {} },
    recommendation: { type: Object, default: {} },
    opinions: {type: Array, default: []},
    opiniontById: { type: Object, default: {} },
  },
  setup(props, ctx) {
    const data = reactive({
      item: {},
      OpinionById: { type: Object, default: {} }
    });

    // const update = async () => {
    //   const roleId = "601b19c4-381f-4e44-98b7-e44f09f4f405"
    //   const wardId = props.opiniontById.Recommendation.PartyMember.Hamlet.Ward._id 
    //   const roleEmails = await accountService.getEmailFromRoleAndWard({roleId, wardId})
    //   console.log(roleEmails)
    //   const dataMail = reactive({
    //     title: "Phiếu xin ý kiến của đảng viên",
    //     content: `<h2>Trân trọng kính chào ông/bà</h2>
    //               <p>Kính mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
    //               nghệ thông tin và truyền thông xem thông tin phiếu xin ý kiến của đảng viên <b>${props.opiniontById.Recommendation.PartyMember.name}</b> về sinh hoạt tại nơi cư trú</p>
    //               <p>Chân thành cảm ơn ông/bà</p>
    //               <p>Chúc quý ông/bà nhiều sức khỏe</p>
    //               <p>Trân trọng,</p>
    //               <p>Admin</p>`,
    //     mail: roleEmails.join(', '), // Gán danh sách email vào đây
    //   });
    //   /***** */
    //   const roleIdHamlet = "28d7a8f7-c869-4258-88c7-d68c9bf4df9b";
    //   const hamletId = props.opiniontById.Recommendation.PartyMember.Hamlet._id
    //   const roleEmailHamlet = await accountService.getEmailByRoleHamlet({roleIdHamlet, hamletId});
    //   console.log(roleEmailHamlet)
    //   const dataMailHamlet = reactive({
    //     title: "Thư giới thiệu của đảng viên",
    //     content: `<h2>Trân trọng kính chào ông/bà</h2>
    //               <p>Kính mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
    //               nghệ thông tin và truyền thông xem thông tin phiếu xin ý kiến của đảng viên <b>${props.opiniontById.Recommendation.PartyMember.name}</b> về sinh hoạt tại nơi cư trú</p>
    //               <p>Chân thành cảm ơn ông/bà</p>
    //               <p>Chúc quý ông/bà nhiều sức khỏe</p>
    //               <p>Trân trọng,</p>
    //               <p>Admin</p>`,
    //     mail: roleEmailHamlet.join(', '),// Gán danh sách email vào đây
    //   });

    //   const _idPartyMember = sessionStorage.getItem("partymemberId");
    //   data.item.partymemberId = props.item._id,
    //   data.item.sentBy = _idPartyMember
    //   data.item.opinionId = props.opiniontById._id
    //   const opinion = await http_update(opinionService, data.item);
    //   console.log(opinion)
    //   if (!opinion.error) {
    //     data.isSent = true;
    //     alert_success(
    //       `Xác nhận thành công`,
    //       `${opinion.msg}`

    //     );

    //     const dataMailPromise = mailService.sendmail(dataMail);
    //     const dataMailHamletPromise = mailService.sendmail(dataMailHamlet);
    //     try {
    //     await Promise.all([dataMailPromise, dataMailHamletPromise]);
    //     ctx.emit("update");
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     window.location.reload();
    //     } catch (error) {
    //     alert_error(`Lỗi khi gửi email: ${error.message}`);
    //   }

    //   await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
    //   window.location.reload();
    //   } else {
    //     alert_error(`Phiếu xin ý kiến chưa được gửi`, `${opinion.msg}`);
    //   }
    // }
    const update = async () => {
      const roleIdHamlet = "28d7a8f7-c869-4258-88c7-d68c9bf4df9b";
      const hamletId = props.opiniontById.Recommendation.PartyMember.Hamlet._id
      const roleEmailHamlet = await accountService.getEmailByRoleHamlet({roleIdHamlet, hamletId});
      // console.log(roleEmailHamlet)
      const dataMailHamlet = reactive({
        title: "Thư giới thiệu của đảng viên",
        content: `<p>Trân trọng kính chào ông/bà</p>
                  <p>Kính mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
                  nghệ thông tin và truyền thông xem thông tin phiếu xin ý kiến của đảng viên <b>${props.opiniontById.Recommendation.PartyMember.name}</b> về sinh hoạt tại nơi cư trú</p>
                  <p>Chân thành cảm ơn ông/bà</p>
                  <p>Chúc quý ông/bà nhiều sức khỏe</p>
                  <p>Trân trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmailHamlet.join(', '),// Gán danh sách email vào đây
      });

      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.partymemberId = props.item._id,
      data.item.sentBy = _idPartyMember
      data.item.opinionId = props.opiniontById._id
      const opinion = await http_update(opinionService, data.item);
      // console.log(opinion)
      if (!opinion.error) {
        data.isSent = true;
        alert_success(
          `Đã Xác nhận thành công phiếu xin ý kiến`,
        );
        await mailService.sendmail(dataMailHamlet);
        ctx.emit("update");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
      window.location.reload();
      } else {
        alert_error(`Xác nhận phiếu xin ý kiến không thành công`, `${opinion.msg}`);
      }
    }

    return {
      data,
      update,
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
    <div class="modal introduction" id="model-opinion">
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
                <div class="model-body">
                  <div >
                    <div class="d-flex">
                        <div class="col-6">
                            <p>ĐẢNG BỘ ĐẠI HỌC CẦN THƠ </p>
                            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                        </div>
                        <div class="justify-content-center" style="margin-left: 108px;">
                            <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
                            <!-- <p>Cần Thơ, {{ opiniontById?.createdAt }}</p> -->
                            <p>Cần Thơ, 06/12/2023</p>
                        </div>
                    </div>
                    <h3>PHIẾU XIN Ý KIẾN</h3>
                    <h5>Chi ủy nơi cư trú</h5>
                    <div><p style="font-weight: bold; text-transform: capitalize;">Kính gửi: Đảng ủy Xã/phường {{ opiniontById.Recommendation?.PartyMember?.Hamlet?.Ward?.name }} <input></p></div>
                    <div>
                        <p>Thực hiện Quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của 
                        Bộ chính trị về trách nhiệm của Đảng viên đang công tác thường xuyên giữ mối 
                        liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
                    </div>
                    <div>
                        <p>Đảng ủy/chi bộ trường công nghệ thông tin và truyền thông trân trọng đề nghị 
                        Chi ủy nhận xét về Đảng viên <span style="font-weight: bold; text-transform: capitalize;">{{ opiniontById.Recommendation?.PartyMember?.name }}</span> tại nơi cư trú (theo mẫu gửi đính kèm)</p> 
                        
                    </div>
                    <div style="float:right; margin-bottom: 25px;">
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
                        <button
                        type="submit"
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        @click="update" id="update"
                        v-if="!opiniontById.SentBy?.name"
                    >
                    <span class="mx-2" style="color: white">Xác nhận</span></button>
                    <button
                        type="submit"
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        @click="update" id="update"
                        v-if="opiniontById.SentBy?.name"
                        :disabled="true"
                    >
                    <span class="mx-2" style="color: white">Đã xác nhận</span></button>
                   
                    <p class=" ml-3 mr-3" style="margin-top: 15px; font-weight: bold; text-transform: capitalize;">{{ opiniontById.SentBy?.name }}</p>
                    </div>
                    
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