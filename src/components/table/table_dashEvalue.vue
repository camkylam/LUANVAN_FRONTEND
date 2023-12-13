<template>
    <div>
      <table class="my-table table-container">
       
        <thead>
          <tr>
          <th colspan="3">Nêu gương về phẩm chất chính trị, đạo đức, lối sống và phát huy vai trò tiền phong, gương mẫu của người cán bộ, đảng viên trước nhân dân nơi cư trú</th>
        </tr>
        <tr>
            <th v-for="(value, index) in fields" :key="index">
              <span class="size-16">{{ value }}</span>
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
        countNeuguongtot: 0,
        countNeuguong: 0,
        countChuaneuguong: 0,
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
        this.countNeuguongtot = this.getCount('nêu gương tốt', evaluation);
        this.countNeuguong = this.getCount('nêu gương', evaluation);
        this.countChuaneuguong = this.getCount('chưa nêu gương', evaluation);
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

  .my-table {
  width: 100%;
  border-collapse: collapse;
  text-transform: capitalize;
  }
  
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
  background-color: #c9d0da; 
  /* background-color: #bcc6d3; */
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
  