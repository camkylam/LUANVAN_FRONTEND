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
  },
  setup(props, ntx) {
    const data = reactive({
        a: true,
        items_new: props.items,
    });
    return {
        data,
    }
  },
};
</script>

<template>
  <table
    class="my-table mb-2"
    :class="[borderTableAll ? 'border-table-all' : '']"
  >
    <thead>
      <tr>
        <th></th>
        <th>Id</th>
        <th v-for="(value, index) in fields">{{ value }}</th>
        <th v-if="activeAction == true">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items">
        <td><input :checked="item.delete" v-model="data.items_new[index].delete" type="checkbox" name="" id="" /></td>
        <td>{{ index + 1 }}</td>
        <td v-for="(label, index1) in labels">{{ item[label] }}</td>
        <td v-if="activeAction == true">
          <span id="view" class="material-symbols-outlined"> visibility </span>
          <span id="edit" class="material-symbols-outlined mx-2"> edit </span>
          <span id="delete" class="material-symbols-outlined"> delete </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
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
  font-size: 13px;
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
</style>
