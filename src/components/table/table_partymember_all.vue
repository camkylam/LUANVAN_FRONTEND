<template>
  <div>
   <button class="btn btn-info ml-3 mr-3" data-toggle="modal" @click="exportToExcel" style="margin-bottom: 20px;">Tổng hợp file Excel</button>
    <table class="my-table table-container">
      <thead>
        <tr class="">
          <th>
            <input type="checkbox" name="" id="" :checked="selectAll[0].checked == true" v-model="selectAll[0].checked"
              @click="$emit('selectAll', selectAll[0].checked)" class="d-flex align-items-center size-16" />
          </th>
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
        <tr class="" v-for="(item, index) in items" :key="index">
          <td>
            <input type="checkbox" :checked="item.checked == true" v-model="item.checked"
              @click="$emit('selectOne', item._id, item)" class="d-flex align-items-center" />
          </td>
          <td class="size-16">{{ startRow + index }}</td>

          <td class="size-16">{{ item.name }}</td>
          <td class="size-16">{{ item.code }}</td>
          <td class="size-16">{{ item.email }}</td>
          <td class="size-16">{{ item.gender }}</td>
          <!-- <td class="size-16">{{ item.dateJoin }}</td>
          <td class="size-16">{{ item.dateOfficial }}</td> -->
          <td class="size-16">{{ item.Position.name }}</td>
          <td class="size-16">{{ item.Hamlet.Ward.name }}</td>
          <td class="size-16">{{ item.Hamlet.Ward.District.name }}</td>
          <td class="size-16">{{ item.Hamlet.Ward.District.Cty_Province.name }}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view">
                <span id="view" class="material-symbols-outlined d-flex align-content-center"
                  @click="$emit('view', item._id, item)">
                  visibility
                </span>
              </button>
              <button v-if="showEdit" type="button" class="mx-2 format-btn" data-toggle="modal" data-target="#model-edit">
                <span id="edit" class="material-symbols-outlined d-flex align-content-center"
                  @click="$emit('edit', item, true)">
                  edit
                </span>
              </button>&nbsp;
              <span id="delete" class="material-symbols-outlined" @click="$emit('delete', item._id, item)">
                delete
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="items.length == 0" class="text-center mt-2">
      Không tồn tại bản ghi.
    </p>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
export default {
  props: {
    items: {
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
    showEdit: {
      type: Boolean,
      default: false,
    }
  },
 methods: {
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Dữ Liệu');

      const columns = [
        { header: 'STT', key: 'index' },
        { header: 'Ngày xin ý kiến', key: 'name' },
        { header: 'Khu vực, ấp', key: 'area' },
        { header: 'Xã, phường', key: 'ward' },
        { header: 'Quận, huyện', key: 'district' },
        { header: 'Tỉnh, thành phố', key: 'city' },
      ];

      worksheet.columns = columns;

      this.items.forEach((item, index) => {
        const row = {
          index: this.startRow + index,
          name: item.name,
          area: item.Hamlet.name || '',
          ward: item.Hamlet.Ward.name || '',
          district: item.Hamlet.Ward.District.name || '',
          city: item.Hamlet.Ward.District.Cty_Province.name || '',
        };
        worksheet.addRow(row);
      });

      this.downloadExcelFile(workbook, 'tong_hop.xlsx');
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
  
};
</script>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
  text-transform: capitalize;
}

.border-table-all {
  border: 1px solid var(--gray);
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
#delete {
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