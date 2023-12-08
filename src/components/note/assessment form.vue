<script>
import {ref} from 'vue'
export default {
    name: "Assessment"
}
//assessment
</script>
<template>
    <div class="modal assessment" id="model-form-assessment">
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
                    <div class="d-flex">
                        <div class="d-flex col-6" style="height: 100%">
                            <div class="row">
                                <p>ĐẢNG BỘ <input class="nn" type= text></p>
                                <p>ĐẢNG ỦY (CHI ỦY) CƠ SỞ </p><br>
                                <input>
                            </div>
                        </div>
                        <div class="d-flex  ">
                            <div class="row justify-content-end">
                                <p>ĐẢNG CỘNG SẢN VIỆT NAM </p>
                                <p>Cần Thơ, <input type="date"></p>
                            </div> 
                        </div>
                    </div>
                    <h3>PHIẾU NHẬN XÉT</h3>
                    <div class="p">đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</div>
                    <div class="nd">
                        Chi ủy sau khi họp với ban công tác mặt trận thôn, bản, khu dân cư, tổ dân phố thống nhất nhận xét về đảng viên {{  }} như sau:
                    </div>
                    <div class="nd">
                        <p>1. Nêu gương về phẩm chất chính trị, đạo đức, lối sống và phát huy vai trò tiền phong, gương mẫu của người cán bộ, đảng viên trước nhân dân nơi cư trú.</p>
                        <div class="chon" id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Nêu gương tốt" v-model="checkedNames">
                            <label for="nêu gương tốt">Nêu gương tốt</label>
                            <input class="ch" type="checkbox" id="john" value="Nêu gương" v-model="checkedNames">
                            <label for="nêu gương">Nêu gương</label>
                            <input class="ch" type="checkbox" id="mike" value="Chưa nêu gương" v-model="checkedNames">
                            <label for="chưa nêu gương">Chưa nêu gương</label>
                        </div>
                        <p>2. Gương mẫu thực hiện nghĩa vụ công dân; tuyên truyền, vận động gia đình và nhân dân trên địa bàn dân cư thực hiện các chủ trương, đường lối của Đảng, chính sách, pháp luật của Nhà nước và các quy định của địa phương nơi cư trú. Tham gia và 
                        vận động gia đình tham gia các cuộc vận động, các phong trào thi đua do địa phương phát động
                        </p>
                        <div id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Gương mẫu đi đầu" v-model="checkedNames">
                            <label for="nêu gương tốt">Gương mẫu đi đầu</label>
                            <input class="ch" type="checkbox" id="john" value="Gương mẫu" v-model="checkedNames">
                            <label for="nêu gương">Gương mẫu</label>
                            <input class="ch" type="checkbox" id="mike" value="Chưa gương mẫu" v-model="checkedNames">
                            <label for="chưa nêu gương">Chưa gương mẫu</label>
                        </div>
                        <p>3. Tham gia đầy đủ, nghiêm túc các cuộc họp định kỳ và tích cực tham gia các cuộc họp khác do cấp ủy nơi cư trú triệu tập;
                        tham gia các cuộc họp của nhân dân nơi cư trú
                        </p>
                        <div id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Tham gia đầy đủ" v-model="checkedNames">
                            <label for="nêu gương tốt">Tham gia đầy đủ</label>
                            <input class="ch" type="checkbox" id="john" value="Tham gia chưa đầy đủ" v-model="checkedNames">
                            <label for="nêu gương">Tham gia chưa đầy đủ</label>
                            <input class="ch" type="checkbox" id="mike" value="Không tham gia" v-model="checkedNames">
                            <label for="chưa nêu gương">Không tham gia</label>
                        </div>
                        <p>4. Thường xuyên giữ mối liên hệ với chi ủy, trưởng thôn, bản, tổ trưởng tổ dân phố, ban công tác mặt trận nơi cư trú để nắm bắt tình hình nhân dân; 
                        phản ánh những ý kiến của nhân dân tới cơ quan có thẩm quyền. Tích cực tham gia góp ý kiến với chi ủy, chi bộ, đảng ủy cơ sở nơi cư trú về các công việc 
                        chung của địa phương, nhất là các vấn đề bức xúc ở thôn, bản, tổ dân phố
                        </p>
                        <div id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Thường xuyên, tích cực" v-model="checkedNames">
                            <label for="nêu gương tốt">Thường xuyên, tích cực</label>
                            <input class="ch" type="checkbox" id="john" value="Thường xuyên" v-model="checkedNames">
                            <label for="nêu gương">Thường xuyên</label>
                            <input class="ch" type="checkbox" id="mike" value="Chưa thường xuyên" v-model="checkedNames">
                            <label for="chưa nêu gương">Chưa thường xuyên</label>
                        </div>
                        <p>5. Tuyên truyền, vận động nhân dân tham gia góp ý xây dựng Đảng, xây dựng chính quyền cơ sở, giám sát cán bộ, đảng viên trong việc tu dưỡng, rèn luyện đạo đức
                        lối sống và thực hiện trách nhiệm nêu gương. Vận động gia đình và nhân dân xây dựng mối quan hệ gắn bó đoàn kết, xây dựng đời sống văn hóa ở khu dân cư
                        </p>
                        <div id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Rất tích cực" v-model="checkedNames">
                            <label for="nêu gương tốt">Rất tích cực</label>
                            <input class="ch" type="checkbox" id="john" value="Tích cực" v-model="checkedNames">
                            <label for="nêu gương">Tích cực</label>
                            <input class="ch" type="checkbox" id="mike" value="Chưa tích cực" v-model="checkedNames">
                            <label for="chưa nêu gương">Chưa tích cực</label>
                        </div>
                        <p>6. Đề nghị cấp ủy cơ sỏ nơi Đảng viên công tác biểu dương hoặc xem xét xử lý theo quy định đối với đảng viên chưa thực hiện tốt</p>
                        <div id='example-3'>
                            <input class="ch" type="checkbox" id="jack" value="Biểu dương" v-model="checkedNames">
                            <label for="nêu gương tốt">Biểu dương</label>
                            <input class="ch" type="checkbox" id="john" value="Không đề nghị" v-model="checkedNames">
                            <label for="nêu gương">Không đề nghị</label>
                            <input class="ch" type="checkbox" id="mike" value="Xem xét xử lý" v-model="checkedNames">
                            <label for="chưa nêu gương">xem xét xử lý</label>
                        </div>
                        <p>7. Nhận xét khác <input></p>
                    </div>
                    <div class="d-flex xn" style="margin-bottom: 50px;">
                        <div class="d-flex col-6">
                            <div class="row" style="font-weight: bold;">
                                <p>XÁC NHẬN CỦA ĐẢNG ỦY XÃ, PHƯỜNG, THỊ TRẤN</p><br>
                                <button >Xác nhận</button>
                            </div> 
                        </div>
                        <div class="d-flex col-3 justify-content-end">
                            <div class="row justify-content-end" style="font-weight: bold; float:right;">
                                <p>T/M CHI BỘ</p>
                                <button>Xác nhận</button>
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