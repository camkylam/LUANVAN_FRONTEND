<script>
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import Select from "../../components/form/select.vue";
import PartyMember from "../../services/partymember.service";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Position from "../../services/position.service";
import Role from "../../services/role.service";
import Account from "../../services/account.service";
import SelectOption from "../../components/box/select_cdu.vue";
import CtyServices from "../../services/cty_province.service";
import districtssServices from "../../services/district.service";
import wardsServices from "../../services/ward.service";
import mailService from "../../services/mail.service";
import Swal from "sweetalert2";

import { alert_success, alert_error, alert_delete, alert_warning, alert_info, alert_delete_wide, alert_input_text, alert_mail } from "../../assets/js/common.alert";
import { http_getAll, http_create } from "../../assets/js/common.http";

export default {
  components: {
    Select,
    SelectOption,
    Select_Advanced,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    watch(
      () => props.resetData,
      async (newValue, oldValue) => {
        await refresh_add();
      },
      { immediate: true }
      //có props
    );
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
        {
          _id: 3,
          name: "Tài khoản",
        },
      ],
      activeStep: 1,
      item: {
        name: "",
        birthday: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        code: "",
        dateJoin: "",
        dateOfficial: "",
        password: "",
      },
      modelPos: "",
      modelValue: "",
      modelDep: "",
      modelWard: "",
      roles: [],
      modelRole: "",
    });

    const create = async () => {
      const dataMail = reactive({
        title: "Thông tin tài khoản hệ thống quản lý đảng viên sinh hoạt nơi cư trú trường CNTT và TT",
        content: `<h2>Trân trọng gửi đến Quý Ông/Bà ${data.item.name},</h2>
                  <ul>
                    <li><strong>Tài khoản:</strong> ${data.item.user_name}</li>
                    <li><strong>Mật khẩu:</strong> ${data.item.password}</li>
                  </ul>
                  <p>Trân trọng,</p>
                  <p>Admin</p>`,
        mail: data.item.email,
      });
      // console.log(data.item.dateJoin);
      data.item.wardId = selectedOptionWard.value;
      data.item.postionId = selectedOptionPosition.value;
      //console.log(data.item);

      data.item.checkUser = true;
      const account = await http_create(Account, data.item);
      // console.log("hihi", data.item)
      if (account.user_name == true) {
        const result = await http_create(PartyMember, data.item);
        // console.log("hihihi", data.item)
        data.item.checkUser = false;

        if (!result.error) {
          data.item.PartyMemberId = result.document._id;
          const account = await http_create(Account, data.item);
          alert_success(
            `Thêm đảng viên`,
            `Đảng viên "${result.document.name}" đã được tạo thành công.`
          );
          await mailService.sendmail(dataMail);
          ctx.emit("create");

          data.item = {
            name: "",
            birthday: "",
            phone: "",
            email: "",
            address: "",
            gender: "",
            code: "",
            dateJoin: "",
            dateOfficial: "",
          };
          data.modelValue = "";
          data.modelDep = "";
          data.modelWard = "";
          data.modelPos = "";
          data.modelRole = "";
          data.item.password = setAccount();
          await refresh();
        } else if (result.error) {
          alert_error(`Thêm đảng viên`, `${result.msg}`);
        }
      } else if (account.user_name == false) {
        alert_error(`Thêm đảng viên`, `${account.msg}`);
      }
    };
    // console.log(data.item)

    const setAccount = () => {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";

      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    };
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
    let selectedOptionPosition = ref("Chức vụ");
    watch(selectedOptionPosition, async (newValue, oldValue) => {
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
            data.modelPos = document.document.name;
            positions.position.push({ _id: "other", name: "khác" });
            ctx.emit("newPosition", positions.position);
            selectedOptionPosition.value = document.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionPosition.value = 0;
      }
    });
    //CtyS
    const ctys = reactive({ cty: [] });
    let selectedOptionCty = ref("0");
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
          const { value: CtyName } = await Swal.fire({
            title: "Thêm mới tỉnh, thành phố",
            input: "text",
            inputLabel: "Tên tỉnh, thành phố",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên tỉnh, thành phố không được bỏ trống";
              }
            },
          });

          if (CtyName) {
            const document = await CtyServices.create({ name: CtyName });
            if (document.error) {
              alert_warning(`Đã tồn tại tỉnh, thành phố `, `${CtyName}`);
              return false;
            }
            alert_success(`Đã thêm tỉnh, thành phố`, `${CtyName}`);
            await refresh("cty");
            data.modelValue = document.document.name;
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
    let selectedOptionDistrict = ref("Quận, huyện");
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
            const document = await districtssServices.create({
              ctyProvinceId: formValues.selectedOption,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại quận, huyện `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm quận, huyện`, `${formValues.inputValue}`);
            data.modelDep = document.document.name;
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
    let selectedOptionWard = ref("Xã, phường");
    watch(selectedOptionWard, async (newValue, oldValue) => {
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm xã, phường mới",
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
            // console.log(data.item.gender);
            if (document.error) {
              alert_warning(`Đã tồn tại  `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm `, `${formValues.inputValue}`);

            await refresh_add();
            wards.ward.push({ _id: "other", name: "khác" });

            ctx.emit("newWard", wards.ward);
            selectedOptionWard.value = document.document._id;
            data.modelWard = document.document.name;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
        selectedOptionWard.value = 0;
      }
      wards.ward = await wardsServices.findAllWardsOfADep(
        selectedOptionDistrict.value
      );
      wards.ward.push({ _id: "other", name: "khác" });
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
      const result = await alert_delete("Bạn muốn xóa chức vụ", value.name);

      if (result) {
        const a = await Position.delete(value._id);

        alert_success("Bạn đã xóa tỉnh, thành phố", value.name);
        await refresh_add();
        ctx.emit("newPosition", positions.position);
      }
    };
    const onDeleteCty = async (value) => {
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await CtyServices.delete(value._id);
        alert_success("Bạn đã xóa tỉnh, thành phố", value.name);
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
    const closeModal = async () => {
      showModal.value = false;
      ctx.emit("refresh", false);
    };

    onMounted(async () => {
      await refresh_add();
      data.item.password = setAccount();
      data.roles = await http_getAll(Role);
    });
    return {
      data,
      create,
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
  <div class="modal" id="model-form-wizard">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Thêm thông tin Đảng viên mới
          </h4>
          <button type="button" class="close" data-dismiss="modal" @click="(activeStep = 1), closeModal">
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
                  <label for="code">Mã số Đảng viên(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="code" name="code" v-model="data.item.code" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="name">Họ và tên(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="data.item.name" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="birthday">Ngày sinh(<span style="color: red">*</span>):</label>
                  <input type="date" class="form-control" id="birthday" name="birthday" v-model="data.item.birthday"
                    required />
                </div>

                <div class="form-group flex-grow-1">
                  <label for="address">Địa chỉ(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="address" name="address" v-model="data.item.address"
                    required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="phone">Số điện thoại(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="phone" name="phone" v-model="data.item.phone" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="email">Email(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="email" name="email" v-model="data.item.email" required />

                </div>
                <div class="form-group flex-grow-1">
                  <label for="gender">Giới tính(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="gender" name="gender" v-model="data.item.gender" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="dateJoin">Ngày vào Đảng(<span style="color: red">*</span>):</label>
                  <input type="date" class="form-control" id="dateJoin" name="dateJoin" v-model="data.item.dateJoin"
                    required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="dateOfficial">Ngày vào Đảng chính thức</label>
                  <input type="date" class="form-control" id="dateOfficial" name="dateOfficial"
                    v-model="data.item.dateOfficial" required />
                </div>
              </form>
              <!-- page 2 -->
              <form v-if="data.activeStep == 2" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="">Chức vụ(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="positions.position" :modelValue="data.modelPos"
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
                        " @delete="(value) => onDeletePosition(value)" @chose="(value, value1) => (
    (selectedOptionPosition = value),
    (data.modelPos = value1.name)
  )
    " />
                  </div>
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Tỉnh, thành phố(<span style="color: red">*</span>):</label>
                  <div class="form-group w-100">
                    <Select_Advanced required :options="ctys.cty" :modelValue="data.modelValue"
                      style="width: 100%; height: 40px" @searchSelect="async (value) => (
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
    (data.modelValue = value1.name)
  )
    " />
                  </div>
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Quận, huyện(<span style="color: red">*</span>):</label>
                  <Select_Advanced required :options="districts.district" :modelValue="data.modelDep"
                    style="width: 100%; height: 40px" @searchSelect="async (value) => (
                      await refresh_add(),
                      (districts.district = districts.district.filter(
                        (value1, index) => {
                          return (
                            value1.name.includes(value) || value.length == 0
                          );
                        }
                      ))
                    )
                      " @delete="(value) => onDeleteDep(value)" @chose="(value, value1) => (
    (selectedOptionDistrict = value),
    (data.modelDep = value1.name)
  )
    " />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="">Xã, phường(<span style="color: red">*</span>):</label>
                  <Select_Advanced :options="wards.ward" :modelValue="data.modelWard" style="width: 100%; height: 40px"
                    @searchSelect="async (value) => (
                      await refresh_add(),
                      (wards.ward = wards.ward.filter((value1, index) => {
                        return (
                          value1.name.includes(value) || value.length == 0
                        );
                      }))
                    )
                      " @delete="(value) => onDeleteWard(value)" @chose="(value, value1) => (
    (selectedOptionWard = value),
    value,
    (data.modelWard = value1.name)
  )
    " />
                </div>
              </form>
              <!-- page3 -->
              <form v-if="data.activeStep == 3" action="" class="was-validated" style="width: 100%">
                <div class="form-group flex-grow-1">
                  <label for="name">Tên tài khoản(<span style="color: red">*</span>):</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="data.item.user_name" required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="birthday">Mật khẩu(<span style="color: red">*</span>):</label>
                  <input type="password" class="form-control" id="birthday" name="birthday" v-model="data.item.password"
                    required />
                </div>
                <div class="form-group flex-grow-1">
                  <label for="avatar">Vai trò(<span style="color: red">*</span>):</label>
                  <Select_Advanced required :options="data.roles" :modelValue="data.modelRole" style="height: 40px"
                    @searchSelect="async (value) => (
                      await refresh_add(),
                      (positions.position = positions.position.filter(
                        (value1, index) => {
                          return (
                            value1.name.includes(value) || value.length == 0
                          );
                        }
                      ))
                    )
                      " @chose="(value, value1) => (
    (data.item.roleId = value),
    (data.modelRole = value1.name)
  )
    " />
                </div>
                <b-button type="submit" class="btn btn-primary px-3 py-2" style="font-size: 14px" @click="create"
                  id="add">
                  <span>Thêm</span>
                </b-button>
              </form>
              <div class="d-flex justify-content-end mt-3">
                <span v-if="data.activeStep > 1 &&
                  data.activeStep <= data.stepList.length
                  " class="btn-prev d-flex align-items-center px-3 py-1 mr-3"
                  @click="data.activeStep = data.activeStep - 1"><span
                    class="material-symbols-outlined d-flex align-items-center">
                    navigate_before </span>Trang trước</span>
                <span v-if="data.activeStep >= 1 &&
                  data.activeStep < data.stepList.length
                  " class="btn-next d-flex align-items-center px-3 py-1"
                  @click="data.activeStep = data.activeStep + 1">Trang tiếp theo
                  <span class="material-symbols-outlined d-flex align-items-center">
                    navigate_next
                  </span>
                </span>
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
