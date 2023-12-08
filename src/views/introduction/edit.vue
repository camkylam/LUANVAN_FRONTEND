<script>
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import Select from "../../components/form/select.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Position from "../../services/position.service";
import CtyServices from "../../services/cty_province.service";
import districtssServices from "../../services/district.service";
import wardsServices from "../../services/ward.service";
import Swal from "sweetalert2";
import { http_getAll, http_create, http_getOne, http_deleteOne, http_update } from "../../assets/js/common.http";
import { alert_success, alert_error, alert_delete, alert_warning, alert_info, alert_delete_wide, alert_input_text, alert_mail } from "../../assets/js/common.alert";

export default {
  components: {
    Select,
    // ***
    // SelectOption,
    Select_Advanced,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({
      stepList: [
        {
          _id: 1,
          name: "Thông tin",
        },
        {
          _id: 2,
          name: "Công việc",
        },
      ],
      activeStep: 1,
      item: { name: "", birthday: "", phone: "", email: "", address: "" },
    });
    // ****REFRESH
    const refresh = async (name) => {
      switch (name) {
        case "position": {
          positions.position = await http_getAll(Position);
          break;
        }
        case "cty": {
          ctys.cty = await http_getAll(CtyServices);
          break;
        }
        case "district": {
          districts.district = await http_getAll(districtssServices);
          break;
        }
        case "ward": {
          wards.ward = await http_getAll(wardsServices);
          break;
        }
      }
    };
    //POSITION
    const positions = reactive({ position: [] });
    const selectedOptionPosition = ref("Chức vụ");
    watch(selectedOptionPosition, async (newValue, oldValue) => {
      if (newValue == 0) return;
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: PositionName } = await Swal.fire({
            title: "Thêm mới chức vụ",
            input: "text",
            inputLabel: "Tên chức vụ",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên chức vụ không được bỏ trống";
              }
            },
          });

          if (PositionName) {
            const document = await Position.create({ name: PositionName });
            if (document.error) {
              alert_warning(`Đã tồn tại chức vụ `, `${PositionName}`);
              return false;
            }
            alert_success(`Đã thêm chức vụ`, `${PositionName}`);
            await refresh("position");
            props.item.Position.name = document.document.name;
            positions.position.push({ _id: "other", name: "khác" });
            ctx.emit("newPosition", positions.position);
            selectedOptionPosition.value = document.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionPosition.value = 0;
      }
      props.item.postionId = selectedOptionPosition.value;
    });
    //CtyS
    const ctys = reactive({ cty: [] });
    const selectedOptionCty = ref("");
    watch(selectedOptionCty, async (newValue, oldValue) => {
      districts.district = await districtssServices.findAllDepOfACty(
        newValue
      );
      wards.ward = [];
      for (let val of districts.district) {
        var newData = await wardsServices.findAllWardsOfADep(val._id);
        for (let value of newData) {
          wards.ward.push(value);
        }
      }
      districts.district.push({ _id: "other", name: "khác" });
      wards.ward.push({ _id: "other", name: "khác" });
      // Alert add cty
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: CenterName } = await Swal.fire({
            title: "Thêm mới Tỉnh, thành phố",
            input: "text",
            inputLabel: "Tên Tỉnh, thành phố",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên Tỉnh, thành phố không được bỏ trống";
              }
            },
          });

          if (CtyName) {
            const document = await CtyServices.create({ name: CtyName });
            if (document.error) {
              alert_warning(`Đã tồn tại Tỉnh, thành phố `, `${CtyName}`);
              return false;
            }
            alert_success(`Đã thêm Tỉnh, thành phố`, `${CtyName}`);
            await refresh("cty");
            props.item.Ward.District.Cty_Province.name =
              document.document.name;
            selectedOptionCty.value = document.document._id;
            ctys.cty.push({ _id: "other", name: "khác" });
            ctx.emit("newCty", ctys.cty);
          }
          return true;
        };
        showSweetAlert();
        selectedOptionCty.value = 0;
      }
    });

    //districtS
    const districts = reactive({ district: [] });
    const selectedOptionDistrict = ref("Quận, huyện");
    watch(selectedOptionDistrict, async (newValue, oldValue) => {
      wards.ward = await wardsServices.findAllWardsOfADep(newValue);
      wards.ward.push({ _id: "other", name: "khác" });

      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm quận, huyện mới",
            html: `
      <select id="my-select" class="swal2-input form-control  ml-3 mx-2" style="width:92%"  >
        <option value="">Tỉnh, thành phố</option>
        ${ctys.cty
                .map(
                  (option) =>
                    `<option value="${option._id}" ${option._id == selectedOptionCty.value ? "selected" : ""
                    }
               > ${option.name}</option>`
                )
                .join("")}
      </select>

      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên quận, huyện">
    `,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const selectedOption = document.getElementById("my-select").value;
              const inputValue = document.getElementById("my-input").value;
              if (!selectedOption || !inputValue) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOption,
                inputValue,
              };
            },
          });

          if (formValues) {
            // Xử lý giá trị selectedOption và giá trị inputValue
            // console.log("Selected Option:", formValues.selectedOption);
            // console.log("Input Value:", formValues.inputValue);
            const document = await districtssServices.create({
              ctyProvinceId: formValues.selectedOption,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại quận, huyện `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm quận, huyện`, `${formValues.inputValue}`);
            props.item.Ward.District.name = document.document.name;
            selectedOptionDistrict.value = document.document._id;
            await refresh("district");
            districts.district.push({ _id: "other", name: "khác" });
            ctx.emit("newDep", districts.district);
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionDistrict.value = 0;
      }
      districts.district = await districtssServices.findAllDepOfACty(
        selectedOptionCty.value
      );
      districts.district.push({ _id: "other", name: "khác" });
    });
    //WardS
    const wards = reactive({
      ward: [],
    });
    const selectedOptionWard = ref("Đơn vị");
    watch(selectedOptionWard, async (newValue, oldValue) => {
      if (newValue == "") return;
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm quận, huyện mới",
            html: `
      <select id="my-select-cty" class="swal2-input form-control  ml-3 mb-3 mx-2" style="width:92%">
        <option value="">Tỉnh, thành phố</option>
        ${ctys.cty
                .map(
                  (option) => `<option value="${option._id}"
            ${option._id == selectedOptionCty.value ? "selected" : ""}
            >${option.name}</option>`
                )
                .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input form-control  ml-3  mx-2" style="width:92%" >
        <option value="">Quận, huyện</option>

      </select>
      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên Xã, phường">
    `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const selectedOptionCty =
                document.getElementById("my-select-cty").value;
              const selectedOptionDep =
                document.getElementById("my-select-dep").value;

              const inputValue = document.getElementById("my-input").value;
              if (!selectedOptionCty || !inputValue || !selectedOptionDep) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOptionCty,
                selectedOptionDep,
                inputValue,
              };
            },
            didOpen: async () => {
              const cty = document.getElementById("my-select-cty");
              const dep = document.getElementById("my-select-dep");

              const Id = cty.value;
              districts.district =
                (await districtssServices.findAllDepOfACty(Id)) || [];

              dep.innerHTML = `
          <option value="">Quận, huyện</option>
          ${districts.district
                  .map(
                    (option) =>
                      `<option value="${option._id}"
                ${option._id == selectedOptionDistrict.value ? "selected" : ""
                      }

                >${option.name}</option>`
                  )
                  .join("")}
        `;
              cty.addEventListener("change", async () => {
                const Id = cty.value;
                districts.district =
                  (await districtssServices.findAllDepOfACty(Id)) || [];

                dep.innerHTML = `

          ${districts.district
                    .map(
                      (option) =>
                        `<option value="${option._id}"

                >${option.name}</option>`
                    )
                    .join("")}
        `;
              });
            },
          });

          if (formValues) {
            const document = await wardsServices.create({
              districtId: formValues.selectedOptionDep,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại  `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm `, `${formValues.inputValue}`);

            await refresh_add();
            wards.ward.push({ _id: "other", name: "khác" });

            ctx.emit("newWard", wards.ward);
            selectedOptionWard.value = document.document._id;
            props.Ward.name = document.document.name;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionWard.value = "";
      }
      wards.ward = await wardsServices.findAllWardsOfADep(
        selectedOptionDistrict.value
      );
      wards.ward.push({ _id: "other", name: "khác" });
      props.item.wardId = selectedOptionWard.value;
    });

    const refresh_add = async () => {
      positions.position = await Position.getAll();
      positions.position.push({ _id: "other", name: "khác" });
      ctys.cty = await CtyServices.getAll();
      ctys.cty.push({ _id: "other", name: "khác" });
      districts.district = await districtssServices.findAllDepOfACty(
        selectedOptionCty.value
      );
      districts.district.push({ _id: "other", name: "khác" });
      wards.ward = await wardsServices.findAllWardsOfADep(
        selectedOptionDistrict.value
      );
      wards.ward.push({ _id: "other", name: "khác" });
    };
    const onDeletePosition = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await Position.delete(value._id);
        alert_success("Bạn đã xóa Tỉnh, thành phố", value.name);
        await refresh_add();
        ctx.emit("newPosition", positions.position);
      }
    };
    const onDeleteCty = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await CtyServices.delete(value._id);
        alert_success("Bạn đã xóa Tỉnh, thành phố", value.name);
        await refresh_add();
        ctx.emit("newCty", ctys.cty);
      }
    };
    const onDeleteDep = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await districtssServices.deleteOne(value._id);
        alert_success("Bạn đã xóa", value.name);
        await refresh_add();
        ctx.emit("newDep", districts.district);
      }
    };
    const onDeleteWard = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await wardsServices.deleteOne(value._id);
        alert_success("Bạn đã xóa ", value.name);
        await refresh_add();
        ctx.emit("newWard", wards.ward);
      }
    };

    const showModal = ref(false);

    const closeModal = async () => {
      showModal.value = false;
      ctx.emit("refresh", false);
    };
    onMounted(async () => {
      await refresh_add();
    });
    return {
      data,
      positions,
      selectedOptionPosition,
      ctys,
      selectedOptionCty,
      districts,
      selectedOptionDistrict,
      wards,
      selectedOptionWard,
      refresh,
      refresh_add,
      onDeletePosition,
      onDeleteCty,
      onDeleteDep,
      onDeleteWard,

      closeModal,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-edit">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Sửa thông tin đảng viên
          </h4>
          <button type="button" class="close" data-dismiss="modal" @click="closeModal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="model-body">
          <div class="d-flex">
            <!-- steps -->
            <div class="d-flex flex-column" style="height: 100%">
              <div class="d-flex mt-3 mx-3" v-for="(value, index) in data.stepList" :key="index">
                <span @click="data.activeStep = index + 1" class="step-id px-3 py-2"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']">{{ value._id }}</span>
                <span class="d-flex align-items-center pl-3"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']">{{ value.name }}</span>
              </div>
            </div>
            <!-- form -->
            <div class="d-flex flex-grow-1 flex-column step-content px-3 my-3" style="width: 10000px">
              <!-- page 1 -->
              <form v-if="data.activeStep == 1" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="name">Họ và tên(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="item.name" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="birthday">Ngày sinh(<span style="color: red">*</span>):</label>
                  <input type="date" class="form-control" id="birthday" name="birthday" v-model="item.birthday"
                    required />
                </div>

                <div class="form-group flex-grow-1">
                  <label for="address">Địa chỉ(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="address" name="address" v-model="item.address" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="phone">Số điện thoại(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="phone" name="phone" v-model="item.phone" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Email(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="item.email" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Giới tính(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="item.gender" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Giới tính(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="item.dateJoin" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Giới tính(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="item.dateOfficial" required />
                </div>
              </form>
              <!-- page 2 -->
              <form v-if="data.activeStep == 2" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="">Chức vụ(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :modelValue="item.Position.name" :options="positions.position"
                      style="height: 40px" @searchSelect="async (value) => (
                        await refresh_add(),
                        (positions.position = positions.position.filter(
                          (value1, index) => {
                            return (
                              value1.name.includes(value) || value.length == 0
                            );
                          }
                        ))
                      )
                        " @delete="(value) => onDeletePosition(value)" @chose="(value, value1) => {
    selectedOptionPosition = value;
    item.Position.name = value1.name;
  }
    " />
                  </div>
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Tỉnh, thành phố(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="ctys.cty" :modelValue="item.Ward.District.Cty_Province.name"
                      style="height: 40px" @searchSelect="async (value) => (
                        await refresh_add(),
                        (ctys.cty = ctys.cty.filter(
                          (value1, index) => {
                            return (
                              value1.name.includes(value) || value.length == 0
                            );
                          }
                        ))
                      )
                        " @delete="(value) => onDeleteCty(value)" @chose="(value, value1) => (
    (selectedOptionCty = value),
    (item.Ward.District.Cty_Province.name =
      value1.name)
  )
    " />
                  </div>
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Quận, huyện(<span style="color: red">*</span>):</label>
                  <Select_Advanced required :options="districts.district" :modelValue="item.Ward.District.name"
                    style="height: 40px" @searchSelect="async (value) => (
                      await refresh_add(),
                      (districts.district = districts.district.filter(
                        (value1, index) => {
                          return (
                            value1.name.includes(value) || value.length == 0
                          );
                        }
                      ))
                    )
                      " @delete="(value) => onDeleteDep(value)" @chose="(value, value1) => {
    (selectedOptionDistrict = value),
      (item.Ward.District.name = value1.name);
  }
    " />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Xã, phường(<span style="color: red">*</span>):</label>
                  <Select_Advanced :options="wards.ward" :modelValue="item.Ward.name" style="height: 40px" @searchSelect="async (value) => (
                    await refresh_add(),
                    (wards.ward = wards.ward.filter((value1, index) => {
                      return (
                        value1.name.includes(value) || value.length == 0
                      );
                    }))
                  )
                    " @delete="(value) => onDeleteWard(value)" @chose="(value, value1) => {
    (selectedOptionWard = value),
      (item.Ward.name = value1.name);
  }
    " />
                </div>
                <button type="button" class="btn btn-warning px-3 py-2" style="font-size: 14px" id="edit"
                  data-dismiss="modal" @click="$emit('edit')">
                  <span>Cập nhật</span>
                </button>
              </form>
              <div class="d-flex justify-content-end mt-3">
                <span v-if="data.activeStep >= 1 &&
                  data.activeStep < data.stepList.length
                  " class="btn-next d-flex align-items-center px-3 py-1" @click="data.activeStep = 2">Trang tiếp theo
                  <span class="material-symbols-outlined d-flex align-items-center">
                    navigate_next
                  </span>
                </span>
                <span v-if="data.activeStep > 1 &&
                  data.activeStep <= data.stepList.length
                  " class="btn-prev d-flex align-items-center px-3 py-1" @click="data.activeStep = 1"><span
                    class="material-symbols-outlined d-flex align-items-center">
                    navigate_before </span>Trang trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-id {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.step-content {
  border-left: 1px solid var(--gray);
}

input {
  width: 100%;
}

.active-step {
  color: blue;
}

.btn-next {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-next:hover {
  background-color: green;
  color: white;
}

.btn-prev {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-prev:hover {
  background-color: red;
  color: white;
}

@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 200%;
    margin-left: -50%;
  }
}
</style>
