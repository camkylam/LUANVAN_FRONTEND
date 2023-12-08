<template>
  <div>
    <table class="my-table table-container">
      <thead>
        <tr class="">
          <th>
          </th>
          <th v-for="(value, index) in fields" :key="index">
            <span class="size-16">{{ value }}</span>
          </th>
          <th>
            <span class="size-16" v-if="activeAction == true">Hành động</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          </td>
          <td class="size-16">{{ info.name }}</td>
          <td class="size-16">{{ info.phone }}</td>
          <td class="size-16">{{ info.email }}</td>
          <td class="size-16">{{ info.Position?.name }}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.name }}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.District?.name }}</td>
          <td class="size-16">{{ info.Hamlet?.Ward?.District?.Cty_Province?.name }}</td>
          <td class="">
            <div class="d-flex align-items-center" v-if="activeAction == true">
              <button type="button" class="format-btn" data-toggle="modal" data-target="#model-view">
                <span id="view" class="material-symbols-outlined d-flex align-content-center"
                  @click="$emit('view', info._id, info)">
                  visibility
                </span>
              </button>
              <button type="button" class="mx-2 format-btn" data-toggle="modal" data-target="#model-edit">
                <span id="edit" class="material-symbols-outlined d-flex align-content-center"
                  @click="$emit('edit', info, true)">
                  edit
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!info" class="text-center mt-2">
      Không tồn tại bản ghi.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    info: {},
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
  },
  setup(props, ntx) {
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
