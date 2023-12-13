<script>
import { reactive } from "vue";
export default {
  props: {
    items: {
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
    actionList: {
      type: Array,
      default: [],
    },
    activeAction: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
    showActionList: {
      type: Array,
      default: [true, true, true],
    },
    startRow: {
      type: Number,
      default: 1,
    },
    selectAll: {
      type: Array,
      default: [],
    },
  },
  setup(props, ntx) {
    const data = reactive({
      activeShow: -1,
    });
    return {
      data,
    };
  },
};
</script>

<template>
  <div>
    <table
      class="my-table mb-2"
      :class="[borderTableAll ? 'border-table-all' : '']"
    >
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              name=""
              id=""
              :checked="selectAll[0].checked == true"
              v-model="selectAll[0].checked"
              @click="$emit('selectAll', selectAll[0].checked)"
              class="d-flex align-items-center size-16"
            />
          </th>
          <th><span class="size-16">Stt</span></th>
          <th v-for="(value, index) in fields" :key="index">
            <span class="size-16">{{ value }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="size-16" v-for="(item, index) in items" :key="index">
          <td>
            <input type="checkbox" v-model="item.checked" name="" id="" />
          </td>
          <td class="size-16">{{ startRow + index }}</td>
          <td class="size-16" v-for="(label, index1) in labels" :key="index1">
            {{ item[label] }}
          </td>
          <td class="size-16">
            <button class="format-btn d-flex align-items-center">
              <span
                v-if="data.activeShow != index"
                @click="data.activeShow = index"
                class="material-symbols-outlined d-flex align-items-center"
              >
                arrow_right
              </span>
              <span
                v-if="data.activeShow == index"
                @click="data.activeShow = -1"
                class="material-symbols-outlined"
              >
                arrow_drop_down
              </span>
            </button>

            <div v-if="data.activeShow == index" class="">
              <p style="margin: 0;" v-for="(value, index) in item.permision" :key="index">
                {{ index+1 }}.  {{ value.name }}
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="items.length == 0" class="text-center mt-2">
      Không có thông tin.
    </p>
  </div>
</template>

<style scoped>
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
}

.my-table th {
  font-weight: 900;
  font-size: 14px;
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
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

.format-btn {
  background-color: var(--light);
  outline: none;
}
</style>
