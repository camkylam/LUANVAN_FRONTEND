<script>
import { onMounted, onUnmounted, defineProps, ref} from "vue";
import Recommentdation from "../../services/recommendation.service";
import { alert_success, alert_error, alert_delete, alert_warning } from "../../assets/js/common.alert";
import { http_getAll, http_create, http_getOne, http_update } from "../../assets/js/common.http";
import { formatDate } from "../../assets/js/common";
import { reactive } from "vue";
import { isCreateRecommendation, isComfirmRecommendation, isAcceptRecommendation } from "../../use/getSessionItem";
import mailService from "../../services/mail.service";
import accountService from "../../services/account.service";

export default {
  props: {
    item: { type: Object, default: {} },
  },
  setup(props, ctx) {
    const data = reactive({
      item: {},
    });

  const create = async () => {
      const roleId = "5f3d3360-417e-41c9-8aa9-d10e290e60a7";
      const roleEmails = await accountService.getEmailByRole({roleId});
      const dataMail = reactive({
        title: "Xác nhận thư giới thiệu cho đảng viên",
        content: `<p><span style="text-transform: capitalize;">Trân </span> trọng kính chào ông/bà có vai trò đảng ủy, chi ủy trường công nghệ thông tin và truyền thông</p>
                  <p><span style="text-transform: capitalize;">Kính</span> mời ông/bà vào hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường công nghệ thông tin và truyền thông 
                    để xác nhận thư giới cho đảng viên <span style="text-transform: capitalize;">${props.item.name}</span></p>
                  <p><span style="text-transform: capitalize;">Mong</span> ông/ bà thực hiện xác nhận sớm</p>
                  <p><span style="text-transform: capitalize;">Chân</span> thành cảm ơn ông/bà</p>
                  <p><span style="text-transform: capitalize;">Trân</span> trọng,</p>
                  <p>Admin</p>`,
        mail: roleEmails.join(', '), // Gán danh sách email vào đây
      });
      const _idPartyMember = sessionStorage.getItem("partymemberId");
      data.item.partymemberId = props.item._id,
        data.item.createdBy = _idPartyMember,
        data.item.hamletId = props.item.Hamlet._id,
        data.item.exemption = props.item.exemption

      const recommendation = await http_create(Recommentdation, data.item);

      if (!recommendation.error) {
        data.isSent = true;
        alert_success(
          `Thêm thư giới thiệu đảng viên về nơi cư trú`,
          `Thư giới thiệu đã được tạo thành công.`,
          `${recommendation.msg}`
        );
        await new Promise(resolve => setTimeout(resolve, 1500)); // Đợi 1 giây (thay đổi thời gian cần thiết)
        window.location.reload();
        await mailService.sendmail(dataMail);
        ctx.emit("create");

       
      } else {
        alert_error(`Thêm thư giới thiệu không thành công`, `${recommendation.msg}`);
      }
  }
    return {
      data,
      create,
      currentDate: '',
      isCreateRecommendation,
      isComfirmRecommendation,
      isAcceptRecommendation
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
            Đơn giới thiệu Đảng viên về sinh hoạt tại nơi cư trú
          </h4>
          <button type="button" class="close" data-dismiss="modal" @click="closeModal">
            &times;
          </button>
        </div>
        <!-- v-if="recommendation._id != ''" -->

        <div class="model-body">
          <!-- <div v-if="!isActiveWork">
            <div style="font-size: 25px;">Chưa có thư giới thiệu cho đảng viên <span style="font-weight: bold; ">{{ item.name }}</span></div>
            <button class="btn btn-warning ml-3 mr-3" data-toggle="modal"  @click="handleActiveWork()" style="margin-bottom: 25px;">Tạo thư giới thiệu</button>
          </div> -->
          <div >
            <div class="d-flex">
              <div class="d-flex flex-column" style="height: 100%">
                        <p>ĐẢNG BỘ TRƯỜNG ĐẠI HỌC CẦN THƠ</p>
                        <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ</p>
                        <p>TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                    </div>
                    <div class="d-flex flex-grow-1 flex-column  justify-content-center" style="margin-left: 50px;">
                        <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
                        <p>
                            <span>Cần Thơ, {{ currentDate }}
                            </span>
                        </p>
                    </div>
                </div>
                <h3 >GIẤY GIỚI THIỆU </h3> 
                
                <div>
                    <p>Kính gửi: Đảng ủy xã/phường <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.Ward.name }}</span><input> </p>
                </div>
                <div>
                    <p>Thực hiện quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của Bộ chính trị về trách nhiệm của Đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
                </div>
                <div>
                    <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                    <div class="d-flex">
                        <p>Giới thiệu đồng chí: <span style="font-weight: bold; text-transform: capitalize;">{{ item.name }}</span><input type="text"></p>
                        <div>
                            <p>Giới tính: <span style="font-weight: bold; text-transform: capitalize;">{{ item.gender }}</span></p>   
                        </div>
                    </div>
                    <p>Sinh ngày: <span style="font-weight: bold;">{{ item.birthday }}</span></p>
                    <p>Kết nạp Đảng vào ngày: <span style="font-weight: bold;" >{{ item.dateJoin }}</span></p>
                    <p>Công nhận Đảng viên chính thức ngày: <span style="font-weight: bold;">{{ item.dateOfficial}}</span></p>
                    <p>Đang sinh hoạt tại  <span>{{ item.PartyCell.name }}</span> Trường Công nghệ thông tin và truyền thông, Đại học Cần Thơ</p>
                    <p>Hiện cư trú tại: khu vực/ấp: <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.name }}</span>, xã/phường: <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.Ward.name }}</span>, quận/huyện: <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.Ward.District.name }}</span>, tỉnh/thành phố: <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.Ward.District.Cty_Province.name }}</span></p>
                    <p v-if="item.exemption=='true'" style="font-weight: bold;">Thuộc đối tượng Giới thiệu nhưng được miễn sinh hoạt nơi cư trú</p>
                    <p> Đề nghị các đồng chí tiếp nhận và tạo điều kiện cho đảng viên <span style="font-weight: bold; text-transform: capitalize;">{{ item.name }}</span> hoàn thành nhiệm vụ</p>
                </div>
                <div class="d-flex" style="margin-bottom: 50px;">
                    <div class="d-flex flex-column">
                        <p style="font-weight: bold;">ĐẢNG ỦY (CHI ỦY) NƠI CƯ TRÚ</p>
                        <p>Tiếp nhận ngày</p>
                        <p>Đã giới thiệu về sinh hoạt tại chi bộ <span style="font-weight: bold; text-transform: capitalize;">{{ item.Hamlet.name }}</span></p>
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
                        <button class="btn btn-success ml-3 mr-3"
                        data-toggle="modal"
                        @click="accept"
                        id="accept"
                        :disabled="isAcceptRecommendation() ? false : true"
                        >Xác nhận</button>
                    </div>
                    <div class="d-flex flex-grow-1 flex-column step-content " style="margin-left: 250px;">
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY) CƠ SỞ </p>
                        <p>Bí thư (phó bí thư)</p>
                       
                        <button 
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        @click="update"
                        id="update"
                        :disabled="isComfirmRecommendation() ? false : true"
                        >Xác nhận</button>
                    </div>
                </div>
                <div style="margin-left: 350px; margin-bottom: 35px;" >
                    <button
                        type="submit"
                        class="btn btn-warning ml-3 mr-3"
                        data-toggle="modal"
                        @click="create"
                        id="add"
                        :disabled="isCreateRecommendation() ? false : true"
                    >
                    <span class="mx-2" style="color: white">Gửi</span>
                    </button>
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