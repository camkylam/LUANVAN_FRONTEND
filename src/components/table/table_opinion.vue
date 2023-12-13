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
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-opinion" >
                <span
                id="opinion"
  class="material-symbols-outlined d-flex align-content-center"
  :class="{
    'blue-button-class': item.SentBy !== null && item.BuildBy !== null,
    'green-button-class': item.SentBy === null && item.BuildBy !== null,
  }" style="border: 1px solid black;"
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
  
  },
  props: {
    opinions: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: [],
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
   /* .blue-button-class {
    background-color: blue; 
    color: white; 
  }

  .green-button-class {
    background-color: green; 
    color: white; 
  } */

  .green-button-class {
  background-color: rgb(12, 150, 12);
  color: white;
  border: 1px solid black;
}
/* .your-yellow-button-class {
  background-color: rgb(228, 228, 40);
  color: rgb(14, 13, 13);
  border: 1px solid black;
} */
.blue-button-class{
  background-color: rgb(60, 128, 255);
  color: white;
  border: 1px solid black;
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