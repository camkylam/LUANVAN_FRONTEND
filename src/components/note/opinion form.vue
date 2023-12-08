<script></script>
//opinion 
<template>
    <div class="modal introduction" id="model-form-opinion">
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
                        <div class="col-6">
                            <p>ĐẢNG BỘ ĐẠI HỌC CẦN THƠ</p>
                            <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</p>
                        </div>
                        <div class="justify-content-center" style="margin-left: 108px;">
                            <p>ĐẢNG CỘNG SẢN VIỆT NAM</p>
                            <p>Cần Thơ, <input type="date"></p>
                        </div>
                    </div>
                    <h3>PHIẾU XIN Ý KIẾN</h3>
                    <h5>Chi ủy nơi cư trú</h5>
                    <div><p>Kính gửi: <input></p></div>
                    <div>
                        <p>Thực hiện Quy định số 213-QĐ/TW, ngày 02 tháng 01 năm 2020 của 
                        Bộ chính trị về trách nhiệm của Đảng viên đang công tác thường xuyên giữ mối 
                        liên hệ với tổ chức đảng và nhân dân nơi cư trú</p>
                    </div>
                    <div>
                        <p>Đảng ủy/chi bộ trường công nghệ thông tin và truyền thông trân trọng đề nghị 
                        Chi ủy nhận xét về Đảng viên <input> tại nơi cư trú (theo mẫu gửi đính kèm)</p>
                    </div>
                    <div style="float:right;;">
                        <p style="font-weight: bold;">T/M ĐẢNG ỦY (CHI ỦY)</p>
                        <button style="margin-left: 50px; margin-bottom: 40px;">Xác nhận</button>
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