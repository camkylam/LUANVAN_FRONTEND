<script>
import { onMounted, onUnmounted, defineProps, ref } from "vue";
import Recommentdation from "../../services/recommendation.service";
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create, http_getOne, http_update } from "../../assets/js/common.http";

import { reactive } from "vue";
import { isCreateRecommendation, isComfirmRecommendation, isAcceptRecommendation } from "../../use/getSessionItem";
import { partymemberModel, recommedationModel, recommenwardsModel, opinionModel, RecommendationByIdModel } from "../../assets/js/models";
import PartyMember from "../../services/partymember.service";
import mailService from "../../services/mail.service";
import accountService from "../../services/account.service";
import { formatDate, searchData, updateItems, updateRows, setNumberOfPages, setPagination } from "../../assets/js/common";
export default {
  props: {
    item: { type: Object, default: {} },
    recommendation: { type: Object, default: {} },
    recommendationById: { type: Object, default: {} },
  },
  setup(props, ctx) {
    const data = reactive({
      item: {},
      isSent: false,
      isIntroductionSent: false,
      MemberEmail: partymemberModel
    });

    const create = async () => {
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.partymemberId = props.item._id
      data.item.createdBy = _idPartyMember
      data.item.hamletId = props.item.Hamlet._id
      data.item.exemption = props.item.exemption

      const recommendation = await http_create(Recommentdation, data.item);

      if (!recommendation.error) {
        data.isSent = true;
        alert_success(
          `Thêm thư giới thiệu đảng viên về nơi cư trú`,
          `Thư giới thiệu đã được tạo thành công.`,
          `${recommendation.msg}`
        );
        
      } else {
        alert_error(`Thêm thư giới thiệu không thành công`, `${recommendation.msg}`);
      }
    }
    const update = async () => {
      const roleId = "601b19c4-381f-4e44-98b7-e44f09f4f405"
      const wardId = props.recommendationById.document.Detailed_Recommendation.Hamlet.Ward._id
      const roleEmails = await accountService.getEmailFromRoleAndWard({roleId, wardId})
      // console.log(roleEmails)
      const dataMail = reactive({
        title: "Xác nhận thư giới thiệu cho Đảng viên mới về sinh hoạt tại chi bộ",
        content: `<p><span style="text-transform: capitalize;">Trân</span> trọng kính chào quý ông/bà</p>
                  <p><span style="text-transform: capitalize;">Kính </span> mời quý ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
                  nghệ thông tin và truyền thông xem thông tin đảng viên và 
                  xác nhận thư giới thiệu cho đảng viên <span style="text-transform: capitalize;"><b>${props.recommendationById.document.PartyMember.name}</b></span> về sinh hoạt tại nơi cư trú</p>
                  <p><span style="text-transform: capitalize;">Mong</span> quý ông/bà có thể sớm thực hiện</p>
                  <p><span style="text-transform: capitalize;">Chân</span> thành cảm ơn quý ông/bà</p>
                  <p><span style="text-transform: capitalize;">Chúc</span> quý ông/bà nhiều sức khỏe</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmails.join(', '), // Gán danh sách email vào đây
      });
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.confirmedBy = _idPartyMember
      // console.log(data.item.confirmedBy)
      data.item.recommendationId =  props.recommendationById.document._id
      // console.log()
      const result = await Recommentdation.update(data.item)
        // console.log(data.item)
          if (!result.error) {
            alert_success(
              `Đã xác nhận thành công thư giới thiệu`,
            );
            await mailService.sendmail(dataMail);
          ctx.emit("update");
            await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
            window.location.reload();
          } 

          else {
            alert_error(`Xác nhận thư giới thiệu không thành công`, `${result.msg}`);
        }
    }

    const accept = async () => {
      const roleIdHamlet = "28d7a8f7-c869-4258-88c7-d68c9bf4df9b";
      const hamletId = props.recommendationById.document.Detailed_Recommendation.Hamlet._id
      const roleEmails = await accountService.getEmailByRoleHamlet({roleIdHamlet, hamletId});
      // console.log(roleEmails)
      // Tạo đối tượng dataMail sau khi có danh sách email
      const dataMail = reactive({
        title: "Thông báo Đảng viên mới về sinh hoạt tại chi bộ",
        content: `<p><span style="text-transform: capitalize;">Trân</span> trọng kính chào ông/bà</p>
                  <p><span style="text-transform: capitalize;">Kính</span> mời ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công 
                  nghệ thông tin và truyền thông xem thông tin đảng viên <span style="text-transform: capitalize;"><b>${props.recommendationById.document.PartyMember.name}</b></span>, 
                  vừa mới được chuyển đến sinh hoạt tại chi bộ</p>
                  <p><span style="text-transform: capitalize;">Chân</span> thành cảm ơn ông/bà</p>
                  <p><span style="text-transform: capitalize;">Chúc</span> quý ông/bà nhiều sức khỏe</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmails.join(', '), // Gán danh sách email vào đây
      });

      const memberId = props.recommendationById.document.PartyMember._id
      const memberemail = await PartyMember.getOneFromBody({memberId})

      data.MemberEmail = memberemail.email
      // console.log("Đảng viên",data.MemberEmail)
      const dataMailMember = reactive({
        title: "Thông báo sinh hoạt đảng tại nơi cư trú",
        content: `<p><span style="text-transform: capitalize;">Trân</span> trọng kính chào anh/chị</p>
                  <p><span style="text-transform: capitalize;">Thư</span> giới thiệu của anh/chị <span style="text-transform: capitalize;"><b>${props.recommendationById.document.PartyMember.name}</b></span> 
                    đã được duyệt để có thể về sinh hoạt tại địa phương </p>
                  <p><span style="text-transform: capitalize;">Chúc</span> anh/chị nhiều sức khỏe</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: data.MemberEmail, // Gán danh sách email vào đây
      })
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.recommendationId =  props.recommendationById.document._id
      data.item.acceptedBy =  _idPartyMember
      data.item.hamletId = props.recommendationById.document.PartyMember.Hamlet._id
      const result = await Recommentdation.update(data.item)
        if (!result.error) {
          alert_success(
            `Đã chấp nhận đảng viên về sinh hoạt tại nơi cư trú`,
          );
          const dataMailPromise = mailService.sendmail(dataMail);
          const dataMailMemberPromise = mailService.sendmail(dataMailMember);
          try {
        await Promise.all([dataMailPromise, dataMailMemberPromise]);
        ctx.emit("accept");
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.reload();
        } catch (error) {
        alert_error(`Lỗi khi gửi email: ${error.message}`);
      }
          await new Promise(resolve => setTimeout(resolve, 1000)); // Đợi 1 giây (thay đổi thời gian cần thiết)
          window.location.reload();
        } else {
          alert_error(`Cập nhật thư giới thiệu không thành công`, `${result.msg}`);
        }
    }

    const isActiveWork = ref(false);
    const handleActiveWork = () => {
      isActiveWork.value = !isActiveWork.value;
    };

    return {
      data,
      create,
      update,
      accept,
      currentDate: '',
      isCreateRecommendation,
      isComfirmRecommendation,
      isAcceptRecommendation,
      handleActiveWork,
      isActiveWork
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
    },
    isAccepted() {
    return this.recommendationById.recommendationStatus === 'accepted';
    },
    isConfirmed() {
    return this.recommendationById.recommendationStatus === 'confirmed' || 
    this.recommendationById.recommendationStatus === 'accepted'
    },
  }

}

</script>
<template>
  <div class="modal introduction" id="model-introduction">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Đơn giới thiệu Đảng viên về sinh hoạt tại nơi cư trú
          </h4>
          <button type="button" class="close" data-dismiss="modal" @click="closeModal">
            &times;
          </button>
        </div>
        <!-----------Đã có thư giới thiệu--------->
        <div class="model-body" v-if="recommendation">
          <div class="d-flex">
            <div class="d-flex flex-column" style="height: 100%">
              <p>ĐẢNG BỘ TRƯỜNG ĐẠI HỌC CẦN THƠ</p>
              <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ</p>
              <p>TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
            </div>
            <div class="d-flex flex-grow-1 flex-column  justify-content-center" style="margin-left: 50px;">
              <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
              <p>
                <span>Cần Thơ, {{ recommendationById.document.createdAt }}
                </span>
              </p>
            </div>
          </div>
          <h3>GIẤY GIỚI THIỆU </h3>
          <div>
            <p>Kính gửi: Đảng ủy xã/phường <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.Detailed_Recommendation.Hamlet.Ward.name}}</span><input>
            </p>
          </div>
          <div>
            <p>Thực hiện quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của Bộ chính trị về trách nhiệm của
              Đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
          </div>
          <div>
            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
            <div class="d-flex">
              <p>Giới thiệu đồng chí: <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.PartyMember.name}}</span><input
                  type="text">
              </p>
              <div>
                <p>Giới tính: <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.PartyMember.gender }}</span></p>
              </div>
            </div>
            <p>Sinh ngày: <span style="font-weight: bold;">{{ recommendationById.document.PartyMember.birthday }}</span>
            </p>
            <p>Kết nạp Đảng vào ngày: <span style="font-weight: bold;">{{ recommendationById.document.PartyMember.dateJoin }}</span>
            </p>
            <p>Công nhận Đảng viên chính thức ngày: <span style="font-weight: bold;">
               {{ recommendationById.document.PartyMember.dateOfficial }}
              </span></p>
            <p>Đang sinh hoạt tại <span>{{ recommendationById.document.PartyMember.PartyCell.name }}</span> Trường Công nghệ thông tin
              và truyền thông, Đại
              học Cần Thơ</p>
            <p>Hiện cư trú tại: khu vực/ấp: <span style="font-weight: bold; text-transform: capitalize;">
                {{ recommendationById.document.PartyMember.Hamlet.name }}</span>,
              xã/phường: <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.PartyMember.Hamlet.Ward.name }}</span>,
              quận/huyện:
              <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.PartyMember.Hamlet.Ward.District.name }}</span>,
              tỉnh/thành phố:
              <span style="font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.PartyMember.Hamlet.Ward.District.Cty_Province?.name
              }}</span>
            </p>
            <p v-if="recommendationById.document.Detailed_Recommendation?.exemption == 'true' || recommendationById.Detailed_Recommendation?.exemption == 'True'"
              style="font-weight: bold;">Thuộc đối tượng Giới thiệu nhưng được miễn sinh hoạt nơi cư trú</p>
            <p> Đề nghị các đồng chí tiếp nhận và tạo điều kiện cho đảng viên <span style="font-weight: bold; text-transform: capitalize;">
                {{ recommendationById.document.PartyMember.name }}</span> hoàn thành nhiệm vụ</p>
          </div>
          <div class="d-flex" style="margin-bottom: 50px;">
            <div class="d-flex flex-column">
              <p style="font-weight: bold;">ĐẢNG ỦY (CHI ỦY) NƠI CƯ TRÚ</p>

              <p >
                Tiếp nhận ngày 
                <span v-if="recommendationById?.document?.acceptedAt && recommendationById.document.acceptedAt !== '01/01/1970'" style='font-weight: bold;'> {{ recommendationById.document.acceptedAt }}</span>
              </p>

              <p>Đã giới thiệu về sinh hoạt tại chi bộ
                <span style='font-weight: bold; text-transform: capitalize;'>{{ recommendationById.document.PartyMember.Hamlet.name }}</span>
              </p>
              <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
              <button class="btn btn-success ml-3 mr-3" data-toggle="modal" @click="accept" id="accept" 
              :disabled="isAcceptRecommendation() ? false : true" v-if="!isAccepted()">Xác nhận</button>
              <div v-if = "isAccepted()" >
                <button :disabled="isAccepted()" class="btn btn-success ml-3 mr-3" data-toggle="modal" @click="accept" id="accept" 
                  >Đã xác nhận</button><br>
                  <p class=" ml-3 mr-3" style="margin-top: 15px; font-weight: bold; text-transform: capitalize;">{{recommendationById.document.AcceptedBy?.name }}</p>
              </div>
              
            </div>
            <div class="d-flex flex-grow-1 flex-column step-content " style="margin-left: 250px;">
              <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY) CƠ SỞ </p>
              <p>Bí thư (phó bí thư)</p>

              <button class="btn btn-warning ml-3 mr-3" data-toggle="modal" @click="update" id="update"
                :disabled="isComfirmRecommendation() ? false : true" v-if = "!isConfirmed()">Xác nhận</button>
                <div v-if = "isConfirmed()">
                  <button class="btn btn-warning ml-3 mr-3" data-toggle="modal" @click="update" id="update"
                  :disabled="isConfirmed()">Đã xác nhận</button>
                  <p class=" ml-3 mr-3" style="margin-top: 15px; font-weight: bold; text-transform: capitalize;">{{ recommendationById.document.ConfirmedBy?.name }} </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.model-body {
  padding-left: 25px;
  padding-right: 25px;
  font-size: 17px;
  font-family: 'Times New Roman', Times, serif;
}

h3 {
  text-align: center;
  font-weight: bold;
}
</style>
//  