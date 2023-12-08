<template>
  <div>
    <!-- <button @click="exportToExcel">Tổng hợp file Excel</button>
    <button @click="exportToPDF">Xuất file PDF</button> -->
    <table class="my-table table-container">
      <thead>
        <tr class="">
          <th><span class="size-16">Stt</span></th>
          <!-- Thêm tiêu đề của các cột -->
          <th v-for="(value, index) in fields" :key="index">
            <span class="size-16">{{ value }}</span>
          </th>
          <th>
            <span class="size-16" v-if="activeAction == true">Hành động</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in opinions" :key="index">
          <td class="size-16">{{ startRow + index }}</td>
          <td class="size-16">{{ item.createdAt }}</td>
          <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.name }}</td>
          <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name }}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-opinion">
                <span
                  id="opinion"
                  class="material-symbols-outlined d-flex align-content-center"
                  
                  @click="$emit('getbyId', item._id, item)"
                >
                  Demography
                </span>
              </button>&nbsp;
              
              <!-- <span
                id="delete"
                class="material-symbols-outlined"
                @click="$emit('delete', item._id, item)"
              >
                delete
              </span> -->
              <!-- <button @click="exportItemToExcel(item)">Xuất Excel</button>
              <button @click="exportItemToPDF(item)">Xuất PDF</button> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!opinions" class="text-center mt-2" style="font-weight: bold;">
      Chưa có phiếu xin ý kiến cho đảng viên.
    </p>

    <!-- Thêm div để chứa nội dung cần xuất PDF -->
    <div ref="pdfContent" style="display: none;">
      <table class="my-table">
        <thead>
          <tr>
            <th><span class="size-16">Stt</span></th>
            <!-- Thêm tiêu đề của các cột -->
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in opinions" :key="index">
            <td class="size-16">{{ startRow + index }}</td>
            <td class="size-16">{{ item.createdAt }}</td>
            <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.name }}</td>
            <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.name }}</td>
            <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
            <td class="size-16">{{ item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name }}</td>
            <!-- Thêm nội dung của các cột khác nếu cần -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

export default {
  methods: {
    // Hàm để xuất dữ liệu vào Excel
    exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Dữ Liệu');

      const columns = [
        { header: 'STT', key: 'index' },
        { header: 'Ngày xin ý kiến', key: 'createdAt' },
        { header: 'Khu vực, ấp', key: 'area' },
        { header: 'Xã, phường', key: 'ward' },
        { header: 'Quận, huyện', key: 'district' },
        { header: 'Tỉnh, thành phố', key: 'city' },
      ];

      worksheet.columns = columns;

      this.opinions.forEach((item, index) => {
        const row = {
          index: this.startRow + index,
          createdAt: item.createdAt,
          area: item.Recommendation?.PartyMember?.Hamlet?.name || '',
          ward: item.Recommendation?.PartyMember?.Hamlet?.Ward?.name || '',
          district: item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name || '',
          city: item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name || '',
        };
        worksheet.addRow(row);
      });

      this.downloadExcelFile(workbook, 'tong_hop.xlsx');
    },

    // Hàm để xuất dữ liệu vào Excel cho từng item
    exportItemToExcel(item) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Dữ Liệu');

      const columns = [
        { header: 'STT', key: 'index' },
        { header: 'Ngày xin ý kiến', key: 'createdAt' },
        { header: 'Khu vực, ấp', key: 'area' },
        { header: 'Xã, phường', key: 'ward' },
        { header: 'Quận, huyện', key: 'district' },
        { header: 'Tỉnh, thành phố', key: 'city' },
      ];

      worksheet.columns = columns;

      const row = {
        index: this.startRow,
        createdAt: item.createdAt,
        area: item.Recommendation?.PartyMember?.Hamlet?.name || '',
        ward: item.Recommendation?.PartyMember?.Hamlet?.Ward?.name || '',
        district: item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name || '',
        city: item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name || '',
      };
      worksheet.addRow(row);

      this.downloadExcelFile(workbook, 'item_' + item._id + '.xlsx');
    },

    downloadExcelFile(workbook, fileName) {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      });
    },

    // Hàm để xuất dữ liệu vào PDF
    exportToPDF() {
      const content = this.$refs.pdfContent;

      const pdfOptions = {
        margin: 10,
        filename: 'danh_sach.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().from(content).set(pdfOptions).outputPdf().then((pdf) => {
        this.downloadPdfFile(pdf, pdfOptions.filename);
      });
    },

    // Hàm để xuất dữ liệu vào PDF cho từng item
    // exportItemToPDF(item) {
    //   // Tạo một div để chứa nội dung cần xuất ra PDF
    //   const contentDiv = document.createElement('div');
    //   contentDiv.classList.add('my-table');

    //   // Thêm chữ "PHIẾU XIN Ý KIẾN"
    //   const titleDiv = document.createElement('div');
    //   titleDiv.innerText = 'PHIẾU XIN Ý KIẾN';
    //   titleDiv.style.textAlign = 'center';
    //   titleDiv.style.fontWeight = 'bold';
    //   contentDiv.appendChild(titleDiv);

    //   // Thêm tiêu đề của các cột
    //   const headerRow = document.createElement('div');
    //   headerRow.classList.add('my-table');
    //   this.fields.forEach((field) => {
    //     const span = document.createElement('span');
    //     span.classList.add('size-16');
    //     span.innerText = field;
    //     headerRow.appendChild(span);
    //   });
    //   contentDiv.appendChild(headerRow);

    //   // Thêm dòng dữ liệu cho item hiện tại
    //   const dataRow = document.createElement('div');
    //   dataRow.classList.add('my-table');
    //   Object.values(item).forEach((value) => {
    //     const span = document.createElement('span');
    //     span.classList.add('size-16');
    //     span.innerText = value;
    //     dataRow.appendChild(span);
    //   });
    //   contentDiv.appendChild(dataRow);

    //   // Tạo tùy chọn cho file PDF
    //   const pdfOptions = {
    //     margin: 10,
    //     filename: 'item_' + item._id + '.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //   };

    //   // Xuất file PDF từ nội dung được tạo
    //   html2pdf().from(contentDiv).set(pdfOptions).outputPdf().then((pdf) => {
    //     // Gọi hàm để download file PDF
    //     this.downloadPdfFile(pdf, pdfOptions.filename);
    //   });
    // },
    exportItemToPDF(item) {
      // Tạo một đối tượng jsPDF
      const pdf = new jsPDF();

      pdf.text(`Ngày xin ý kiến: ${item.createdAt}`, 10, 10);
pdf.text(`Khu vực, ấp: ${item.Recommendation?.PartyMember?.Hamlet?.name || ''}`, 10, 20);
pdf.text(`Xã, phường: ${item.Recommendation?.PartyMember?.Hamlet?.Ward?.name || ''}`, 10, 30);
pdf.text(`Quận, huyện: ${item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name || ''}`, 10, 40);
pdf.text(`Tỉnh, thành phố: ${item.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name || ''}`, 10, 50);

      // Lưu file PDF hoặc hiển thị nó ngay trên trình duyệt
      pdf.save(`item_${item._id}.pdf`);
    },
  
    // Hàm download file PDF
    downloadPdfFile(pdf, fileName) {
      const blob = new Blob([pdf], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    },
  },
  props: {
    opinions: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    startRow: {
      type: Number,
      default: 1,
    },
    selectAll: {
      type: Array,
      default: [],
    },
    activeAction: {
      type: Boolean,
      default: true,
    },
    showActionList: {
      type: Array,
      default: [true, true, true],
    },
  },
};
</script>




<style scoped>
  .your-blue-button-class {
    background-color: blue;
    color: white;
  }

  .your-yellow-button-class {
    background-color: yellow;
    color: black;
  }

  /* .my-table {
    width: 90%;
    border-collapse: collapse;
    margin: auto;
  }

  .my-table th,
  .my-table td {
    border: 1px solid #ddd;
    border-left: 0;
    border-right: 0;
    padding: 8px;
    text-align: center;
  }

  .my-table th {
    font-weight: 900;
    font-size: 14px;
  }

  .my-table tbody tr:nth-child(even) {
    font-size: 13px;
  }

  .my-table tbody tr:hover {
    background-color: #e0e0e0;
  } */

  /* .my-table th,
  .my-table td {
    border: 1px solid #ddd;
    padding: 8px;
  } */
  .my-table {
    width: 100%;
    border-collapse: collapse;
    text-transform: capitalize;
  }
  .my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
  text-align: center;
}

.my-table th {
    font-weight: 900;
    font-size: 14px;
    background-color: #9d9ea0; /* Light gray background color for table header */
  }

  .my-table tbody tr:nth-child(odd) {
    background-color: #eceaea; /* Light gray background for odd rows */
  }

  .my-table tbody tr:nth-child(even) {
    background-color: transparent; /* No background for even rows */
  }

  .my-table tbody tr:hover {
    background-color: #e0e0e0; /* Hover background color for all rows */
  }
.my-table tbody tr:hover {
  background-color: #e0e0e0;
  /* Màu nền khi hover */
}

.my-table th,
.my-table td {
  border: 1px solid #ddd;
  /* Màu và độ rộng của đường kẻ */
  padding: 8px;
}

  #view,
  #edit,
  #delete,
  #opinion,
  #introduction,
  #assessment {
    font-size: 18px;
    cursor: pointer;
    border: 1px solid var(--gray);
    border-radius: 4px;
    padding: 1px;
  }

  #view:hover {
    color: var(--blue);
  }

  #edit:hover {
    color: var(--yellow);
  }

  #delete:hover {
    color: var(--red);
  }

  .table-container {
    overflow-x: auto;
    max-width: 100%;
    width: 100%;
  }
</style>
<!-- :class="{ 'your-yellow-button-class': item.SentBy?._id !== '' }" -->