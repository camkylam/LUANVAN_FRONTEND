<template>
    <div>
      <table class="my-table table-container">
        <thead>
          <tr>
            <th colspan="3" class="header-row">Nêu gương về phẩm chất chính trị, đạo đức, lối sống và phát huy vai trò tiền phong, gương mẫu của người cán bộ, đảng viên trước nhân dân nơi cư trú</th>
          </tr>
          <tr>
            <!-- Chuyển tất cả các tên tiêu chí sang chữ thường -->
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value.toLowerCase() }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="size-16">{{ countNeuguongtot }}</td>
            <td class="size-16">{{ countNeuguong }}</td>
            <td class="size-16">{{ countChuaneuguong }}</td>
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
      fields: {
        type: Array,
        // Chuyển tất cả các tên tiêu chí sang chữ thường
        default: ["nêu gương tốt", "nêu gương", "chưa nêu gương"],
      },
    },
    data() {
      return {
        countNeuguongtot: 0,
        countNeuguong: 0,
        countChuaneuguong: 0,
      };
    },
    watch: {
      EvaluationTrue: {
        handler(newVal) {
          this.updateCounts(newVal);
        },
        deep: true,
      },
    },
    mounted() {
      this.updateCounts(this.EvaluationTrue);
    },
    methods: {
      updateCounts(evaluationTrue) {
        // Log dữ liệu để kiểm tra
        console.log('Evaluation True:', evaluationTrue);
  
        // Reset các biến đếm
        this.countNeuguongtot = 0;
        this.countNeuguong = 0;
        this.countChuaneuguong = 0;
  
        // Duyệt qua mỗi phần tử trong evaluationTrue
        evaluationTrue.forEach(item => {
          // Duyệt qua mỗi criterionEvaluationCounts
          item.criterionEvaluationCounts.forEach(criterion => {
            // Lấy tên và số lượng từ criterion
            const { name, count } = criterion;
  
            // Cập nhật biến đếm tương ứng
            switch (name.toLowerCase()) {
              case 'nêu gương tốt':
                this.countNeuguongtot += count;
                break;
              case 'nêu gương':
                this.countNeuguong += count;
                break;
              case 'chưa nêu gương':
                this.countChuaneuguong += count;
                break;
              default:
                break;
            }
          });
        });
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
  