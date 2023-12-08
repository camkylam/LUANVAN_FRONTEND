<script>
import { onMounted, onUnmounted, defineProps } from "vue";
import PartyMember from "../../services/partymember.service";

</script>
//Introduction
<template>
<div class="modal introduction" id="model-form-introduction">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" style="font-size: 18px">
                    Đơn giới thiệu Đảng viên về sinh hoạt tại nơi cư trú
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
                <div class="d-flex">
                    <div class="d-flex flex-column" style="height: 100%">
                        <p>ĐẢNG BỘ TRƯỜNG ĐẠI HỌC CẦN THƠ</p>
                        <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ</p>
                        <p>TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                    </div>
                    <div class="d-flex flex-grow-1 flex-column  justify-content-center" style="margin-left: 50px;">
                        <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
                        <p>Cần Thơ, <input type="date"></p>
                    </div>
                </div>
                <h3 >GIẤY GIỚI THIỆU</h3>
                <div>
                    <p>Kính gửi: Đảng ủy xã <input> </p>
                </div>
                <div>
                    <p>Thực hiện quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của Bộ chính trị về trách nhiệm của Đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
                </div>
                <div>
                    <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                    <div class="d-flex">
                        <p>Giới thiệu đồng chí: <input type="text"></p>
                        <div>
                            <input type="radio" id="one" value="One" v-model="picked">
                            <label for="one">Nam</label>
                            <input type="radio" id="one" value="One" v-model="picked">
                            <label for="one">Nữ</label><br>
                        </div>
                    </div>
                    <p>Sinh ngày:<input type="date"/></p>
                    <p>Kết nạp Đảng vào ngày: <input type="date"></p>
                    <p>Công nhận Đảng viên chính thức ngày: <input type="date"></p>
                    <p>Đang sinh hoạt tại Chi bộ sinh viên Trường Công nghệ thông tin và truyền thông, Đại học Cần Thơ</p>
                    <p>Hiện cư trú tại</p>
                    <input>
                    <input><input>
                    <p> Đề nghị các đồng chí tiếp nhận và tạo điều kiện cho đảng viên <input type="text"> hoàn thành nhiệm vụ</p>
                </div>
                <div class="d-flex" style="margin-bottom: 50px;">
                    <div class="d-flex flex-column">
                        <p style="font-weight: bold;">ĐẢNG ỦY (CHI ỦY) NƠI CƯ TRÚ</p>
                        <p>Tiếp nhận ngày</p>
                        <p>Đã giới thiệu về sinh hoạt tại chi bộ</p><input>
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
                        <button>Xác nhận</button>
                    </div>
                    <div class="d-flex flex-grow-1 flex-column step-content " style="margin-left: 250px;">
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY) CƠ SỞ </p>
                        <p>Bí thư (phó bí thư)</p>
                        <button>Xác nhận</button>
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
</style>