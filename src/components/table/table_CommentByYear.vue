<template>
    <div>
      <!-- <button class="btn btn-warning ml-3 mr-3" data-toggle="modal" @click="exportToExcel" style="margin-bottom: 20px;">Xuất Excel</button><br> -->
      <table class="my-table table-container">
        <thead>
          <tr class="">
            <th><span class="size-16">Stt</span></th>
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value }}</span>
            </th>
          
            <th>
              <span class="size-16" v-if="activeAction == true">Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in commentYear" :key="index">
            <td class="size-16">{{ startRow + index }}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.name }}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.code }}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.gender }}</td>
            <td class="size-16">{{ (item?.Opinion?.Recommendation?.PartyMember?.exemption === 'true') ? 'Được miễn' : 'Không được miễn'}}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.Hamlet?.name }}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.name }}</td>
            <td class="size-16">{{  item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name }}</td>
            <td class="size-16">{{ item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name }}</td>
            <td class="">
              
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view"
              @click="$emit('view', item?.Opinion?.Recommendation?.PartyMember?._id , item)"
              >
                <span id="introduction" class="material-symbols-outlined d-flex align-content-center"
              >
                visibility
                </span>
              </button>&nbsp;
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-assessment">
                
                <span
                  id="opinion"
                  class="material-symbols-outlined d-flex align-content-center"
                  
                  @click="$emit('getbyId', item._id, item)"
                >
                Comment
                </span>

              </button>&nbsp;&nbsp;
            </div>
            
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

  <script>
  import ExcelJS from 'exceljs'; 
  export default {
    props: {
      col: {
        type: Array,
        default: [],
      },
      items: {
        type: Array,
        default: [],
      },
      commentYear: {
        type: Array,
        default: [],
      },
      valuecomment: {
        type: Array,
        default: [],
      },
      itemType: {
        type: String
      },
      fields: {
        type: Array,
        
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
//     data() {
//       return {
//         level: ["84e8a352-56d8-4247-8a8a-956d3b7c7935", "0629c91c-c13f-40ef-afde-e99f3371fc73", "c90e8d2c-ab32-4e66-bffc-902f915eedf2", "878be2a5-810d-4ba0-b6e8-b459d67ef194", "9466fa17-6ef9-4034-a98c-4c82e3f5f01f"],
//         level1: ["eb0e484d-ef38-4f8a-aed0-47cef657b034", "ed68e9c3-59e8-478e-9204-69bf88fecb37", "2bfee76e-e2ec-448c-92a8-6f3fd25c80b1", "7a05be1c-cd2f-484c-8215-229dc1f3dfa0", "6f71cc8f-48fb-49e4-99ce-5374eb808462"],
//         level2: ["39cd3dc1-b529-45c8-99b1-e032c4482a3a", "12ab111c-9bce-4f43-a599-937ef8875461", "40d13a9e-a0ce-425c-8b57-29de3f67d910", "ad93b6a7-cbc4-47f9-ab21-94296c85e563", "a5be77cd-afe5-447d-ad2e-f7ccf2846514"],
//       };
//     },
//     computed: {
//       levelCounts() {
//         return this.commentYear.map((item) => ({
//           levelCount: this.countOccurrences(item?.Criterion_Evaluations, this.level),
//           level1Count: this.countOccurrences(item?.Criterion_Evaluations, this.level1),
//           level2Count: this.countOccurrences(item?.Criterion_Evaluations, this.level2),
//         }));
//       },
//       tableHeaders() {
//         if (!Array.isArray(this.commentYear)) {
//           return [];
//         }
//         const uniqueHeaders = new Set();
//         this.commentYear.forEach((item) => {
//           if (item && Array.isArray(item.Criterion_Evaluations)) {
//             item.Criterion_Evaluations.forEach((result) => {
//               if (result.Criterion && result.Criterion.name) {
//                 uniqueHeaders.add(result.Criterion.name);
//               }
//             });
//           }
//         });
//         return Array.from(uniqueHeaders);
//       },
//     },
//     methods: {
//       countOccurrences(arr, values) {
//         if (!Array.isArray(arr)) {
//           return 0;
//         }
//         return arr.filter(result => values.includes(result._id)).length;
//       },
//       evaluatePerformance(arr) {
//         const countLevel = this.countOccurrences(arr, this.level);
//         const countLevel1 = this.countOccurrences(arr, this.level1);
//         const countLevel2 = this.countOccurrences(arr, this.level2);
  
//         if (countLevel >= 4 && countLevel2 === 0) {
//           return 'Tốt';
//         } else if (countLevel1 >= 4 && countLevel2 >= 1) {
//           return 'Khá';
//         } else {
//           return 'Chưa tốt';
//         }
//       },
//       async exportToExcel() {
//         this.downloadExcelFile();
//       },
//       async downloadExcelFile() {
//   try {
//     if (Array.isArray(this.commentYear)) {
//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet('Sheet1');
//       const headers = ['Stt', 'Tên Đảng viên', 'Ngày xin ý kiến', 'Khu vực, ấp', 'Xã, phường', 'Quận, huyện', 'Tỉnh, thành phố', ...this.tableHeaders, 'Nhận xét khác'];
//       worksheet.addRow(headers);
//       this.commentYear.forEach((item, index) => {
//         if (item && Array.isArray(item.Criterion_Evaluations)) {
//           const row = [
//             index + this.startRow,
//             item.Opinion?.Recommendation?.PartyMember?.name,
//             item.createdAt,
//             item.Opinion?.Recommendation?.PartyMember?.Hamlet?.name,
//             item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.name,
//             item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name,
//             item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name,
//             ...item.Criterion_Evaluations.map(result => result.name),
//             item.note,
//           ];
//           worksheet.addRow(row);
//         } else {
//           console.error(`Invalid item at index ${index} in commentYear:`, item);
//         }
//       });

//       const buffer = await workbook.xlsx.writeBuffer();
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       const fileName = 'exported_data.xlsx';

//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(link.href);
//     } else {
//       console.error('commentYear is not an array:', this.commentYear);
//     }
//   } catch (error) {
//     console.error('An error occurred during Excel export:', error);
//   }
// },

//       async exportRowToExcel(item) {
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Sheet1');

//         const headers = ['Tên Đảng viên', 'Ngày xin ý kiến', 'Khu vực, ấp', 'Xã, phường', 'Quận, huyện', 'Tỉnh, thành phố', ...this.tableHeaders, 'Nhận xét khác'];
//         worksheet.addRow(headers);

//         const row = [
//           item.Opinion?.Recommendation?.PartyMember?.name,
//           item.createdAt,
//           item.Opinion?.Recommendation?.PartyMember?.Hamlet?.name,
//           item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.name,
//           item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.name,
//           item.Opinion?.Recommendation?.PartyMember?.Hamlet?.Ward?.District?.Cty_Province?.name,
//           ...item.Criterion_Evaluations.map((result) => result.name),
//           item.note,
//         ];
//         worksheet.addRow(row);

//         const buffer = await workbook.xlsx.writeBuffer();
//         const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         const fileName = 'exported_data.xlsx';
  
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
  
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(link.href);
//       },
//     },
  };
  </script>
  
  <style scoped>
  .your-yellow-button-class {
    background-color: yellow;
    color: black;
  }
  
  .my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
  text-align: center;
  text-transform: capitalize;
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

  
  .border-table-all {
    border: 1px solid var(--gray);
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