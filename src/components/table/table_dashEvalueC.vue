<template>
    <div>
      <table class="my-table table-container">
        <thead>
          <tr>
          <th colspan="3">thường xuyên giữ mối liên hệ với chi ủy, trưởng thôn, bản, 
            tổ trưởng tổ dân phố, ban công tác mặt trận nơi cư trú để nắm bắt tình hình nhân dân; 
            phản ánh những ý kiến của nhân dân tới cơ quan có thẩm quyền. tích cực tham gia góp ý kiến với 
            chi ủy, chi bộ, đảng ủy cơ sở nơi cư trú về các công việc chung của địa phương, nhất là 
            những vấn đề bức xúc ở thôn, bản, tổ dân phố.</th>
        </tr>
          <tr>
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="size-16">{{ countThuongxuyentichcuc }}</td>
            <td class="size-16">{{ countThuongxuyen }}</td>
            <td class="size-16">{{ countChuathuongxuyen }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      Evaluation: {
        type: Array,
        default: [],
      },
      fields: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        countThuongxuyentichcuc: 0,
        countThuongxuyen: 0,
        countChuathuongxuyen: 0,
      };
    },
    watch: {
      Evaluation: {
        handler(newVal) {
          this.updateCounts(newVal);
        },
        deep: true,
      },
    },
    mounted() {
      this.updateCounts(this.Evaluation);
    },
    methods: {
      updateCounts(evaluation) {
        this.countThuongxuyentichcuc = this.getCount('thường xuyên, tích cực', evaluation);
        this.countThuongxuyen = this.getCount('thường xuyên', evaluation);
        this.countChuathuongxuyen = this.getCount('chưa thường xuyên', evaluation);
      },
      getCount(category, evaluation) {
        return evaluation.reduce((count, item) => {
          return item.name === category ? count + item.count : count;
        }, 0);
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
  background-color: #c9d0da;  /* Light gray background color for table header */
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
  