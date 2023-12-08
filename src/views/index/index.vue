<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { isReadDashboard } from "../../use/getSessionItem";

export default {
  components: {
  },
  setup() {
  },
};
</script>
<template>
  <div class="border-box content ml-2" >
    <div class="d-flex my-2 mx-3 menu justify-content-end" style="border: none">

    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link
        :to="{ name: 'Index' }"
        @click="activeMenu = 1"
        :class="[activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-17">Trang chủ</span>
      </router-link>
      <router-link
        :to="{ name: 'Instruction' }"
        @click="activeMenu = 2"
        :class="[activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
      >
        <span class="size-18">Hướng dẫn</span>
      </router-link>
    </div>

      <!-- BTN tổng quan chi tiêt -->
      
    </div>
    <div class="border-hr mb-3"></div>
    <h1>QUY ĐỊNH </h1>
    <h4>VỀ TRÁCH NHIỆM CỦA ĐẢNG VIÊN ĐANG CÔNG TÁC THƯỜNG XUYÊN GIỮ MỐI LIÊN HỆ VỚI TỔ CHỨC ĐẢNG VÀ NHÂN DÂN NƠI CƯ TRÚ</h4>
    <div>
        <div class="p">- Căn cứ Điều lệ Đảng;<br>
        - Căn cứ Quy chế làm việc của Ban Chấp hành Trung ương, Bộ Chính trị và Ban Bí thư khóa XII;<br>
        - Căn cứ các nghị quyết của Trung ương về xây dựng, chỉnh đốn Đảng, Nghị quyết số 26-NQ/TW, ngày 19/5/2018 của Ban Chấp hành Trung ương khóa XII về tập trung xây dựng đội ngũ cán bộ các cấp, nhất là cấp chiến lược, đủ phẩm chất, năng lực và uy tín, ngang tầm nhiệm vụ; các quy định của Ban Chấp hành Trung ương, Bộ Chính trị và Ban Bí thư về trách nhiệm nêu gương của cán bộ, đảng viên,<br>
        Bộ Chính trị quy định trách nhiệm của đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú như sau:<br><br>
        <p>Điều 1. Trách nhiệm của đảng viên đang công tác và của tổ chức cơ sở đảng</p>
        1. Đảng viên đang công tác ở các cơ quan, doanh nghiệp, đơn vị sự nghiệp, lực lượng vũ trang (gọi tắt là đảng viên đang công tác) vừa thực hiện quy định của Điều lệ Đảng về sinh hoạt đảng tại nơi làm việc, vừa có trách nhiệm thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú; gần gũi, gắn bó với nhân dân; khắc phục những biểu hiện sống xa dân, thiếu trách nhiệm trong các công việc của nhân dân nơi cư trú; củng cố mối quan hệ mật thiết giữa Đảng với nhân dân; nêu cao vai trò, trách nhiệm của người đảng viên trong xây dựng Đảng, xây dựng hệ thống chính trị cơ sở.<br>
        2. Tổ chức cơ sở đảng nơi đảng viên đang công tác và nơi đảng viên cư trú có trách nhiệm tạo điều kiện cho đảng viên đang công tác thực hiện trách nhiệm, nhiệm vụ nơi cư trú, đồng thời kiểm tra, giám sát, nhận xét, đánh giá việc thực hiện của đảng viên.<br><br>
        <p>Điều 2. Nhiệm vụ của đảng viên đang công tác ở nơi cư trú</p>
        
        1. Nêu gương về phẩm chất chính trị, đạo đức, lối sống và vai trò tiền phong, gương mẫu của người cán bộ, đảng viên trước nhân dân nơi cư trú.<br>
        2. Gương mẫu thực hiện nghĩa vụ công dân; tuyên truyền, vận động gia đình và nhân dân trên địa bàn dân cư thực hiện các chủ trương, đường lối của Đảng, chính sách, pháp luật của Nhà nước và các quy định của địa phương nơi cư trú.<br>
        3. Tham gia đầy đủ, nghiêm túc các cuộc họp định kỳ và tích cực tham gia các cuộc họp khác do cấp ủy nơi cư trú triệu tập. Tích cực tham gia góp ý kiến với chi ủy, chi bộ, đảng ủy cơ sở nơi cư trú về các công việc chung của địa phương, nhất là những vấn đề bức xúc ở thôn, bản, tổ dân phố.<br>
        4. Tham gia các cuộc họp của nhân dân nơi cư trú; thường xuyên giữ mối liên hệ với chi ủy, trưởng thôn, bản, tổ trưởng dân phố, ban công tác mặt trận nơi cư trú để nắm bắt tình hình nhân dân; phản ánh những ý kiến của nhân dân tới cơ quan có thẩm quyền.<br>
        5. Tuyên truyền, vận động nhân dân tham gia góp ý xây dựng Đảng, xây dựng chính quyền ở cơ sở, giám sát cán bộ, đảng viên trong việc tu dưỡng, rèn luyện đạo đức, lối sống và thực hiện trách nhiệm nêu gương.<br>
        6. Tham gia và vận động các thành viên trong gia đình tham gia các cuộc vận động, các phong trào thi đua do địa phương phát động. Vận động gia đình và nhân dân xây dựng mối quan hệ gắn bó đoàn kết, xây dựng đời sống văn hoá ở khu dân cư.<br>
        7. Báo cáo kết quả thực hiện các nhiệm vụ tại Điều 2 Quy định này với chi ủy nơi công tác vào dịp kiểm điểm, đánh giá đảng viên hằng năm. Kịp thời báo cáo với chi ủy nơi công tác và nơi cư trú khi chuyển sang nơi cư trú khác.<br><br>
       
        <p> Điều 3. Nhiệm vụ của cấp ủy cơ sở nơi đảng viên đang công tác</p>
        1. Chỉ đạo chi ủy, chi bộ trực thuộc lập danh sách đảng viên theo nơi cư trú và chủ động liên hệ với đảng ủy cơ sở và chi ủy, chi bộ nơi đảng viên cư trú để giới thiệu đảng viên về sinh hoạt, thường xuyên giữ mối liên hệ với chi ủy và nhân dân nơi cư trú theo đúng quy định.<br>
        Thông báo bằng văn bản với cấp ủy cơ sở nơi đảng viên cư trú được biết về những đảng viên của đơn vị mình thường xuyên đi công tác xa nơi cư trú, lưu động hoặc có công tác đặc biệt để phối hợp tạo điều kiện cho đảng viên thực hiện nhiệm vụ nơi cư trú khi đảng viên đó có điều kiện.<br>
        2. Kịp thời thông báo cho chi ủy, chi bộ, đảng ủy cơ sở nơi đảng viên cư trú biết về số đảng viên đã được giới thiệu về sinh hoạt nơi cư trú có sự thay đổi vị trí, chuyển công tác hoặc bị khai trừ, xoá tên khỏi danh sách đảng viên hoặc đã xin ra khỏi Đảng.<br>
        3. Chủ trì, phối hợp với cấp ủy cơ sở nơi đảng viên cư trú kiểm tra, giám sát đảng viên thực hiện nhiệm vụ nơi cư trú; biểu dương những đảng viên thực hiện tốt và nhắc nhở, phê bình hoặc xem xét xử lý theo quy định đối với những đảng viên chưa thực hiện nghiêm túc Quy định này.<br>
        4. Định kỳ hằng năm tổ chức lấy ý kiến nhận xét của chi ủy, chi bộ đối với đảng viên của mình thực hiện nhiệm vụ nơi cư trú. Cử đại diện cấp ủy gặp gỡ, trao đổi với cấp ủy nơi đảng viên cư trú để nắm tình hình và lấy ý kiến nhận xét trước khi bổ nhiệm, giới thiệu ứng cử hoặc khi đảng viên cho rằng việc nhận xét của nơi cư trú chưa khách quan.<br>
        5. Thông báo cho đảng viên biết về ý kiến nhận xét, đánh giá của cấp ủy nơi cư trú tại cuộc họp kiểm điểm, đánh giá cuối năm hoặc khi cần thiết.<br><br>
       
        <p> Điều 4. Nhiệm vụ của tổ chức đảng nơi đảng viên đang công tác cư trú</p>
        1. Đảng ủy xã, phường, thị trấn tiếp nhận và lập danh sách đảng viên đang công tác được giới thiệu về sinh hoạt, giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú ở địa phương mình; giới thiệu về cho các chi ủy, chi bộ thôn, bản, khối phố.<br>
        2. Chi bộ thôn, bản, khu dân cư tiếp nhận và lập danh sách đảng viên đang công tác tham gia sinh hoạt, giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú ở đơn vị mình và thông báo cho từng đảng viên biết để liên hệ trong việc thực hiện nhiệm vụ đảng viên nơi cư trú; đồng thời, tạo điều kiện cho đảng viên thực hiện nhiệm vụ.<br>
        3. Định kỳ 6 tháng hoặc khi cần thiết, đảng ủy xã, phường, thị trấn chỉ đạo chi ủy, chi bộ trực thuộc tổ chức họp đảng viên đang công tác cư trú trên địa bàn để thông báo tình hình, nhiệm vụ của địa phương hoặc chuyên đề cần tham khảo ý kiến đảng viên đang công tác để đảng viên nắm được thông tin, tham gia góp ý kiến.<br>
        4. Định kỳ hằng năm, chi ủy hoặc bí thư chi bộ (nơi không có chi ủy) họp với ban công tác mặt trận thôn, bản, khu dân cư để nhận xét từng đảng viên đang công tác thực hiện nhiệm vụ nơi cư trú trên địa bàn mình theo phiếu nhận xét và gửi về đảng ủy xã, phường, thị trấn. Đề xuất với đảng ủy xã, phường, thị trấn biểu dương, khen thưởng những đảng viên đang công tác có thành tích xuất sắc trong thực hiện nhiệm vụ đảng viên nơi cư trú. Kịp thời phản ánh với đảng ủy xã, phường, thị trấn và cấp ủy nơi đảng viên đang công tác khi đảng viên có hành vi vi phạm pháp luật; thiếu trách nhiệm nêu gương; vi phạm nghiêm trọng nội quy, quy định của địa phương hoặc chưa chấp hành tốt Quy định này.<br>
        5. Đảng ủy xã, phường, thị trấn xác nhận phiếu nhận xét của chi ủy, chi bộ nơi cư trú đối với đảng viên đang công tác và gửi cho đảng ủy cơ sở nơi đảng viên công tác. Biểu dương, khen thưởng hoặc đề nghị cấp ủy cơ sở nơi đảng viên công tác biểu dương, khen thưởng những đảng viên có thành tích xuất sắc trong thực hiện nhiệm vụ đảng viên nơi cư trú. Đề nghị cấp ủy cơ sở nơi đảng viên công tác xem xét xử lý theo quy định đối với những đảng viên chưa thực hiện tốt.<br>
        6. Khi có yêu cầu của cấp ủy nơi đảng viên công tác, đảng ủy xã, phường, thị trấn phối hợp kiểm tra, giám sát đối với đảng viên đang công tác thực hiện nhiệm vụ nơi cư trú.<br><br>
       
        <p> Điều 5. Tổ chức thực hiện</p>
        1. Các tỉnh ủy, thành ủy và đảng ủy trực thuộc Trung ương tổ chức quán triệt, triển khai thực hiện tốt Quy định này và hằng năm báo cáo Ban Bí thư.<br>
        2. Ban Tổ chức Trung ương chủ trì, phối hợp với Ban Dân vận Trung ương và các ban đảng liên quan theo dõi, kiểm tra, sơ kết, tổng kết việc thực hiện Quy định và báo cáo Ban Bí thư.<br>
        Ban Tổ chức Trung ương chủ trì, phối hợp với Ban Dân vận Trung ương, Quân ủy Trung ương, Đảng ủy Công an Trung ương hướng dẫn việc thực hiện đối với đảng viên đang công tác trong Quân đội nhân dân và Công an nhân dân.<br>
        3. Quy định này thay thế Quy định số 76-QĐ/TW, ngày 15/6/2000 của Bộ Chính trị khoá VIII về việc đảng viên đang công tác ở các cơ quan, doanh nghiệp, đơn vị sự nghiệp thường xuyên giữ mối liên hệ với chi ủy, đảng ủy cơ sở và gương mẫu thực hiện nghĩa vụ công dân nơi cư trú; có hiệu lực thi hành kể từ ngày ký và được phổ biến đến chi bộ để thực hiện.</div>
    </div>
  </div>
</template>

<style scoped>
h1{
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
    color: red;
    font-weight: bold;
}
h4{
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
    font-weight: bold;
    
}
.p{
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
    margin-left: 25px;
    margin-right: 20px;
}
p{
    font-weight: bold;
}
* {
  box-sizing: border-box;
}

.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 0;
}

.border-hr {
  border-top: 1px solid var(--gray);
}
.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}
.active-menu {
    color: white; /* Set text color for the active menu item */
    background-color: green; /* Set background color for the active menu item */
    border: 1px solid green; /* Add border color for the active menu item */
  }

  /* Non-active menu style */
  .none-active-menu {
    color: black; /* Set text color for non-active menu items */
    background-color: white; /* Set default background color for non-active menu items */
    border: 1px solid var(--gray); /* Set default border color for non-active menu items */
  }

  /* Hover effect for all menu items */
  .menu a:hover {
    background-color: lightgreen; /* Set hover background color to light green */
  }
.menu a {
  border: 1px solid green;
  border-radius: 0px;
  padding: 8px 12px;
  font-size: 15px;
  
}
.active-menu {
  color: blue;
}
select {
  background-color: #f6f6f6;
  border: 1px solid #b8c2cc;
  font-size: 16px;
}

.pad {
  padding: 1px;
}
.select {
  width: 125px;
}
.search {
  width: 300px;
}
.content {
  margin-top: 0px;
}
@media screen and (max-width: 738px) {
  .select {
    width: 90px;
  }
  .search {
    width: 210px;
    margin-left: 2px !important ;
    margin-right: 2px;
  }
  .border-box {
    width: 890px;
    margin-left: 10px;
  }
}
@media screen and (max-width: 992px) {
  .select {
    width: 90px;
  }
  .search {
    width: 210px;
    margin-left: 10px !important ;
    margin-right: 10px;
  }
  .border-box {
    width: 100%;
    margin-left: 10px;
  }
}
</style>
