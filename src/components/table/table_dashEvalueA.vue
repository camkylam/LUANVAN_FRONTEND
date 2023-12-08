<template>
    <div>
      <table class="my-table table-container">
        <thead>
          <tr>
          <th colspan="3">gương mẫu thực hiện nghĩa cụ công dân; tuyên truyền, vận động gia đình và nhân dân trên địa bàn dân cư thực hiện các chủ trương, đường lối của đảng, chính sách, pháp luật của nhà nước và các quy định của địa phương nơi cư trú. tham gia và vận động gia đình tham gia các cuộc vận động, các phong trào thi đua do địa phương phát động. </th>
        </tr>
          <tr>
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="size-16">{{ countGươngMẫuĐiĐầu }}</td>
            <td class="size-16">{{ countGươngMẫu }}</td>
            <td class="size-16">{{ countChưaGươngMẫu }}</td>
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
        default: ["Name", "Age", "Payment"],
      },
    },
    data() {
      return {
        countGươngMẫuĐiĐầu: 0,
        countGươngMẫu: 0,
        countChưaGươngMẫu: 0,
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
        this.countGươngMẫuĐiĐầu = this.getCount('gương mẫu đi đầu', evaluation);
        this.countGươngMẫu = this.getCount('gương mẫu', evaluation);
        this.countChưaGươngMẫu = this.getCount('chưa gương mẫu', evaluation);
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
  /* background-color: #c7cace; */
  background-color: #c9d0da; 
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
  