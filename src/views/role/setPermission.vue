<script>
import Select from "../../components/form/select.vue";
import { reactive, computed, watch, ref, onBeforeMount, onMounted } from "vue";

import Permission from "../../services/permission.service";
import Position from "../../services/position.service";
import Role_Permission from "../../services/role_permission.service";
import Permission_Types from "../../services/permission_types.service";

import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_info, alert_delete_wide, alert_input_text, alert_mail } from "../../assets/js/common.alert";
import { formatDateTime, formatDate, formatDateTime_2 } from "../../assets/js/common.js";

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  components: {
    Select,
  },
  setup(props, ctx) {
    const data = reactive({
      positionList: [],
      permissionList: [],
      role_permissionList: [],
      permissionId: "",
      roleId: "",
      role_permissionId: "",
      pTList: [],
    });
    const create = async () => {
      try {
        let isSuccess = false;
        for (let value1 of data.pTList) {
          for (let value of value1.Permissions) {
            // console.log('Value', isStringFound(value._id));
            if (value.checked == true && !isStringFound(value._id)) {
              let result = await http_create(Role_Permission, {
                RoleId: props.item._id,
                PermissionId: value._id,
              });

              if (result.error == true) {
                alert_error(
                  `Tạo quyền`,
                  `Đã tồn tại quyền ${value.name} trong vai trò ${props.item.name}.`
                );
              } else {
                isSuccess = true;
                // value.checked = false;
              }
            } else if (value.checked == false) {
              if (isStringFound(value._id)) {
                await Role_Permission.update(data.role_permissionId, {
                  RoleId: data.roleId,
                  PermissionId: data.permissionId,
                });
                isSuccess = true;
                // value.checked = false;
              }
            }
          }
        }
        if (isSuccess) {
          alert_success(`Tạo quyền`, `Bạn đã tạo quyền thành công.`);
          ctx.emit("refresh");
          data.positionList = await http_getAll(Position);
          data.permissionList = await http_getAll(Permission);
          data.role_permissionList = await http_getAll(Role_Permission);
          data.pTList = await http_getAll(Permission_Types);
          data.pTList = data.pTList.documents;
        }

      } catch (error) {
        // console.log(error);
      }
    };

    const isStringFound = (_id) => {
      return data.role_permissionList.some((item) => {
        if (
          item.PermissionId.toString() == _id &&
          item.RoleId == props.item._id
        ) {
          data.permissionId = item.PermissionId;
          data.roleId = item.RoleId;
          data.role_permissionId = data.permissionId + data.roleId;
        }
        return (
          item.PermissionId.toString() == _id && item.RoleId == props.item._id
        );
      });
    };

    const refresh = async () => {
      data.positionList = await http_getAll(Position);
      data.permissionList = await http_getAll(Permission);
      data.role_permissionList = await http_getAll(Role_Permission);
      data.pTList = await http_getAll(Permission_Types);
      data.pTList = data.pTList.documents;
    };

    onBeforeMount(async () => {
      refresh();
    });
    onMounted(() => { });
    return {
      create,
      data,
      isStringFound,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-setPermission">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Tạo quyền thao tác vai trò
            <span style="color: blue">{{ item.name }}</span>
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="content1 mb-4" v-for="(value, index) in data.pTList">
            <div class="d-flex">
              <h1>{{ index + 1 }}. {{ value.name }}</h1>
            </div>
            <ul>
              <li v-for="(value1, index1) in value.Permissions">
                <h2>
                  <input type="checkbox" class="form-check-input flex align-items-center" value=""
                    :checked="isStringFound(value1._id) == true" @click="() => {
                        if (
                          value1.checked == undefined ||
                          value1.checked == 'undefined'
                        ) {
                          value1.checked = !isStringFound(value1._id);
                        } else {
                          value1.checked = !value1.checked;
                        }
                      }
                      " />&emsp;{{ value1.name }}
                  <!-- v-model="value1.checked" -->
                </h2>
              </li>
            </ul>
          </div>
          <form action="" class="">
            <button type="button" class="btn btn-primary px-3 py-2" style="font-size: 14px" @click="create" id="add">
              <span>Thiết lập</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pT {
  margin-left: -20px;
  margin-bottom: -6px;
  font-size: 18px;
}

.content {
  padding-left: 20px;
}

h1 {
  margin-top: 0;
  font-size: 20px;
  font-weight: bold;
}

h2 {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
  padding-left: 10px;
}

h3 {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
  padding-left: 20px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  list-style-type: none;
}

@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 180%;
    margin-left: -40%;
  }
}
</style>