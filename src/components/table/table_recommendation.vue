<template>
    <div>
      <table class="my-table table-container">
        <thead>
          <tr class="">
            <th><span class="size-16">Stt</span></th>
            <th v-for="(value, index) in fields" :key="index"> 
              <span class="size-16">{{ value }}</span>
            </th>
            <th>
              <span class="size-16" v-if="activeAction == true">Hành động</span>.
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recommen" :key="index">
            <td class="size-16">{{ startRow + index }}</td>
            <td class="size-16">{{ item.createdAt }}</td>
            <td class="size-16">{{ item.Detailed_Recommendation.Hamlet.name}}</td>
            <td class="size-16">{{ item.Detailed_Recommendation.Hamlet.Ward.name }}</td>
            <td class="size-16">{{ item.Detailed_Recommendation.Hamlet.Ward.District.name }}</td>
            <td class="size-16">{{ item.Detailed_Recommendation.Hamlet.Ward.District.Cty_Province.name }}</td>
            <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-introduction"
              :class="{ 'your-green-button-class':recommendation.recommendationStatus === 'created',
              'your-yellow-button-class': recommendation.recommendationStatus === 'confirmed',
              'your-info-button-class': recommendation.recommendationStatus === 'accepted'
             }"
              >
                <span id="introduction" class="material-symbols-outlined d-flex align-content-center"
                @click="$emit('getbyId', item._id, item)">
                  send
                </span>
              </button>&nbsp;

              <button  type="button" class="format-btn" data-toggle="modal">
                <span  id="opinion" class="material-symbols-outlined d-flex align-content-center" title="phiếu nhận xét"
                @click="$emit('goToFormOpinion', item)">
                  Demography
                </span>
               
              </button>&nbsp;
            </div>
          </td>
          </tr>
        </tbody>
      </table>
      <p v-if="recommen.length == 0" class="text-center mt-2" style="font-weight: bold;">
      Chưa có thư giới thiệu cho đảng viên.
    </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        recommen: {
        type: Array,
        default: [],
      },
      recommendation: { type: Object, default: {} },
      
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
  .your-green-button-class {
  background-color: rgb(46, 231, 46);
  color: white;
}
.your-yellow-button-class {
  background-color: rgb(243, 243, 89);
  color: rgb(14, 13, 13);
}
.your-info-button-class{
  background-color: rgb(88, 88, 241);
  color: white;
}

/* .my-table {
  width: 90%;
  border-collapse: collapse;
  margin: auto; /* Căn giữa bảng */
  /* text-transform: capitalize; */

/* }  */

.border-table-all {
  border: 1px solid var(--gray);
}

/* .my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
  text-align: center; 
} */

/* .my-table th {
  font-weight: 900;
  font-size: 14px;
  
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
} */
/* .my-table tbody tr:hover {
    background-color: #e0e0e0; Màu nền khi hover
  }
  .my-table th,
  .my-table td {
    border: 1px solid #ddd; /* Màu và độ rộng của đường kẻ */
    /* padding: 8px; */
  /* }  */
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
.my-table {
    width: 100%;
    border-collapse: collapse;
    text-transform: capitalize;
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