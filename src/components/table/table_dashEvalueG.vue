<template>
    <div>
      <table class="my-table table-container">
        <thead>
            <tr>
          <th colspan="3">Thực Hiện Nghĩa Vụ Công Dân Nơi Cư Trú; Vận Động Các Thành Viên Trong Gia Đình Tham Gia Các Cuộc Vận Động, Các Phong Trào Thi Đua Do Địa Phương Phát Động; Xây Dựng Đời Sống Văn Hóa Ở Khu Dân Cư.</th>
        </tr>
          <tr>
            <!-- <th>Criteron ID</th>
            <th>Criteron Name</th> -->
            <th>Thực Hiện Tốt</th>
            <th>Thực Hiện</th>
            <th>Chưa Thực Hiện</th>
          </tr>
        </thead>
        <tbody>
          <!-- Tìm kiếm và hiển thị chỉ một dòng dựa trên criterionId -->
          <tr v-if="EvaluationTrue.length > 0">
            <td class="size-16">0</td>
            <td class="size-16">2</td>
            <!-- <td>{{ EvaluationTrue[0].criterionId }}</td>
            <td>{{ EvaluationTrue[0].criterionName }}</td> -->
            <!-- <td>{{ getCriterionCount(EvaluationTrue[0].criterionEvaluationCounts, 'thực hiện tốt') }}</td>
            <td>{{ getCriterionCount(EvaluationTrue[0].criterionEvaluationCounts, 'thực hiện') }}</td> -->
            <td>{{ getCriterionCount(EvaluationTrue[0].criterionEvaluationCounts, 'chưa thực hiện') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      EvaluationTrue: {
        type: Array,
        default: [],
      },
    },
    methods: {
      // Phương thức để lấy số lượng từ "criterionEvaluationCounts" dựa trên tên
      getCriterionCount(criterionEvaluationCounts, name) {
        const foundItem = criterionEvaluationCounts.find(criterion => criterion.name.toLowerCase() === name.toLowerCase());
        return foundItem ? foundItem.count : 0;
      },
    },
  };
  </script>
  
  <style scoped>
  .header-row {
    background-color: #f2f2f2; /* Điều chỉnh giá trị màu xám nhạt hơn tại đây */
  }

  .my-table {
  width: 100%;
  border-collapse: collapse;
  text-transform: capitalize;
  }
  .your-yellow-button-class {
  background-color: yellow;
  color: black;
  }
  
  .yellow-button {
  background-color: yellow;
  color: black;
  border: 1px solid black;
  }
  
  .blue-button {
  background-color: rgb(114, 114, 255);
  color: white;
  border: 1px solid black;
  }
  
  /* .my-table {
  width: 100%;
  border-collapse: collapse;
  text-transform: capitalize;
  } */
  .my-table th,
  .my-table td {
  border: 1px solid black;
  border-left: 0;
  border-right: 0;
  padding: 8px;
  text-align: center;
  }
  
  .my-table th {
  font-weight: 900;
  font-size: 14px;
  background-color: #c9d0da; /* Light gray background color for table header */
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
  border: 1px solid black;
  /* Màu và độ rộng của đường kẻ */
  padding: 8px;
  }
  
  
  .border-table-all {
  border: 1px solid var(--gray);
  }
  
  /* .my-table th,
  .my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
  }
  
  .my-table th {
  font-weight: 900;
  font-size: 14px;
  }
  
  .my-table tbody tr:nth-child(even) {
  font-size: 13px;
  }
  */
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
  