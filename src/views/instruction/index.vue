<script>
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

    </div>
    <div class="border-hr mb-3"></div>
    <h1>HƯỚNG DẪN</h1>
    <h4>Hướng dẫn thực hiện một số nội dung trong quy định số 213-QĐ/TW của bộ chính trị về trách nhiệm của đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú</h4>
    <div class="p">
        Thực hiện Quy định số 213-QĐ/TW, ngày 02/01/2020 của Bộ Chính trị về trách nhiệm của đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú (sau đây viết tắt là Quy định 213), Ban Tổ chức Trung ương hướng dẫn thực hiện một số nội dung trong Quy định 213 như sau:
    </div><br>
    <div class="p">
        <div style="font-weight: bold;">
            1. Đảng viên đang công tác, học tập trong điều kiện đặc thù giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú
        </div>
        <div class="nd">
            <p style="font-weight: bold;">1.1  Đảng viên giới thiệu nhưng được miễn sinh hoạt nơi cư trú</p>
            <p>– Đảng viên đang công tác trong Quân đội nhân dân và Công an nhân dân do điều kiện công tác xa nhà hoặc do yêu cầu, nhiệm vụ phải ở tập trung tại doanh trại, nhà công vụ ngoài giờ làm việc hằng ngày không thường xuyên về nơi cư trú.</p>
            <p>– Đảng viên công tác tại một số cơ quan, đơn vị trong nước, các loại hình doanh nghiệp nhưng thường xuyên đi làm việc xa nơi cư trú, lưu động; đảng viên là cán bộ điều động, luân chuyển ở nhà công vụ, tập thể cơ quan không thường xuyên về nơi cư trú.</p>
            <p>– Đảng viên là cán bộ, công chức, viên chức đi học tập trung 12 tháng trong năm; đảng viên là học sinh, sinh viên đi học xa nhà không thường xuyên về nơi cư trú.</p>
            <p>Các đảng viên nêu trên thực hiện trách nhiệm tại Khoản 1, Điều 1 và nhiệm vụ tại Khoản 1, 2, 5, 6, 7, Điều 2 Quy định 213. Không lấy ý kiến nhận xét định kỳ hằng năm; chỉ lấy ý kiến nhận xét khi cần thiết (thực hiện quy trình công tác cán bộ, khen thưởng, kỷ luật…).</p>
            <p style="font-weight: bold;">1.2 Đảng viên được miễn giới thiệu về tổ chức đảng nơi cư trú</p>
            <p>– Đảng viên công tác trong Quân đội nhân dân và Công an nhân dân thực hiện nhiệm vụ đặc biệt, phải giữ bí mật về nhân thân; đảng viên ở các đơn vị thường trực sẵn sàng chiến đấu.</p>
            <p>– Đảng viên đang công tác ở vùng sâu, vùng xa, nơi biên giới, hải đảo do yêu cầu nhiệm vụ hằng năm không thường xuyên về nơi cư trú.</p>
            <p>– Đảng viên đang công tác tại các cơ quan ngoại giao, văn phòng đại diện, đơn vị kinh tế ở ngoài nước; đảng viên tham gia lực lượng gìn giữ hòa bình của Liên Hợp Quốc; đảng viên ra ngoài nước lao động, làm việc, học tập 12 tháng trong năm.</p>
            <p>– Đảng viên đang công tác nhưng mắc bệnh phải điều trị hoặc dưỡng bệnh 12 tháng liên tục trong năm.</p>
            <p>Các đảng viên nêu trên thực hiện trách nhiệm tại Khoản 1, 2, 6, Điều 2 Quy định 213.</p>
            <p style="font-weight: bold;">1.3 Thẩm quyền xem xét, quyết định</p>
            <p>– Đảng ủy cơ sở xem xét, quyết định từng đảng viên thuộc Khoản 1.1 hoặc Khoản 1.2, Điểm 1 Hướng dẫn này trên cơ sở đề nghị của chi bộ nơi đảng viên đang công tác, học tập.</p>
            <p>– Chi bộ cơ sở xem xét, quyết định từng đảng viên thuộc Khoản 1.1 hoặc Khoản 1.2 Hướng dẫn này.</p>
        </div>
        <div style="font-weight: bold;">
            2. Mẫu giấy giới thiệu, phiếu xin ý kiến
        </div>
        <div class="nd">
            <p style="font-weight: bold;">2.1. Mẫu giấy giới thiệu</p>
            <p>Thực hiện thống nhất mẫu giấy giới thiệu với đảng viên đang công tác thường xuyên giữ mối liên hệ với tổ chức đảng và nhân dân nơi cư trú theo mẫu 1-213; riêng đảng viên nêu tại Khoản 1.1, Điểm 1 Hướng dẫn này thực hiện theo mẫu 2-213 <a href="https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/bieu-mau/32123/mau-giay-gioi-thieu-dang-vien-ve-giu-moi-lien-he-o-noi-cu-tru">Tham khảo Mẫu 2-213 ở đây</a></p>
            <p style="font-weight: bold;">2.2. Mẫu phiếu xin ý kiến</p>
            <p>Đảng viên không thuộc đối tượng nêu tại Khoản 1.1, 1.2, Điểm 1 Hướng dẫn này thực hiện theo mẫu 3-213. Đảng viên thuộc đối tượng nêu tại Khoản 1.1, Điểm 1 Hướng dẫn này thực hiện theo mẫu 4-213 <a href="https://thuvienphapluat.vn/lao-dong-tien-luong/mau-213-giay-nhan-xet-dang-vien-noi-cu-tru-moi-nhat-duoc-quy-dinh-ra-sao-4951.html">Tham khảo mẫu 3-213 ở đây</a>, <a href="https://thuvienphapluat.vn/lao-dong-tien-luong/mau-213-giay-nhan-xet-dang-vien-noi-cu-tru-moi-nhat-duoc-quy-dinh-ra-sao-4951.html">Tham khảo mẫu 4-213 ở đây</a></p>
        </div>
        <div style="margin-bottom: 25px;">Trong quá trình thực hiện nếu có vướng mắc, các cấp ủy, tổ chức đảng phản ánh kịp thời về Ban Tổ chức Trung ương.</div>

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
.nd{
    padding-left: 15px;
}
.p{
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
    margin-left: 25px;
    margin-right: 20px;
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
